'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from '@/lib/gsap'

// ─── GLSL ────────────────────────────────────────────────────────────────────

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float     uTime;
  uniform float     uAlpha;
  varying vec2      vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    // Barrel lens distortion
    vec2  cc  = vUv - 0.5;
    float d   = dot(cc, cc);
    vec2  uv  = vUv + cc * d * 0.045;
    uv = clamp(uv, 0.001, 0.999);

    vec4 col = texture2D(uTexture, uv);

    // Grayscale — match img-bw: grayscale + contrast 1.03 + brightness 0.92
    float g = dot(col.rgb, vec3(0.299, 0.587, 0.114));
    g = clamp(g * 1.03 * 0.92, 0.0, 1.0);

    // Contrast curve (cinematic S)
    g = g * g * (3.0 - 2.0 * g);
    g = mix(g * 0.95, g, smoothstep(0.2, 0.8, g));

    // Film grain (2-layer: coarse + fine)
    float grain  = hash(vUv + fract(uTime * 0.0013)) * 2.0 - 1.0;
    float grain2 = hash(vUv * 2.7 + fract(uTime * 0.0019)) * 2.0 - 1.0;
    g += grain * 0.028 + grain2 * 0.012;
    g  = clamp(g, 0.0, 1.0);

    // Vignette
    float v = 1.0 - dot(cc * 1.4, cc * 1.4);
    v = clamp(pow(v, 1.3), 0.0, 1.0);
    g *= 0.55 + v * 0.45;

    gl_FragColor = vec4(vec3(g), uAlpha);
  }
`

// ─── Component ───────────────────────────────────────────────────────────────

interface HeroCanvasProps {
  ready: boolean
}

export function HeroCanvas({ ready }: HeroCanvasProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const initialized  = useRef(false)

  // Three.js object refs (so the intro useEffect can access them)
  const particleMatRef = useRef<THREE.PointsMaterial | null>(null)
  const planeMeshRef   = useRef<THREE.Mesh | null>(null)
  const uniformsRef    = useRef<{
    uTexture: { value: THREE.Texture | null }
    uTime:    { value: number }
    uAlpha:   { value: number }
  } | null>(null)

  // ── Scene init ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (initialized.current || !canvasRef.current) return
    initialized.current = true

    const canvas = canvasRef.current
    // Use window dimensions — reliable at any paint stage
    const W = window.innerWidth
    const H = window.innerHeight

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H, false)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    // ── Scene & camera ────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    scene.background = new THREE.Color(0x080808)

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.set(0, 0, 5)

    // ── Portrait plane ────────────────────────────────────────────────────
    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uTime:    { value: 0 },
      uAlpha:   { value: 0 },
    }
    uniformsRef.current = uniforms

    const planeGeo = new THREE.PlaneGeometry(2.9, 3.9, 1, 1)
    const planeMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      side: THREE.FrontSide,
    })
    const planeMesh = new THREE.Mesh(planeGeo, planeMat)
    // Start deep, to the right of center
    planeMesh.position.set(1.8, 0.1, -3)
    scene.add(planeMesh)
    planeMeshRef.current = planeMesh

    new THREE.TextureLoader().load('/images/Portraits/IMG_9777-2.jpeg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      uniforms.uTexture.value = tex
    })

    // ── Particles ─────────────────────────────────────────────────────────
    const COUNT = 540
    const pos   = new Float32Array(COUNT * 3)
    type V3     = { x: number; y: number; z: number }
    const vel: V3[] = []

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 14
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 5 - 0.5
      pos[i * 3]     = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      vel.push({
        x: (Math.random() - 0.5) * 0.0018,
        y: (Math.random() - 0.5) * 0.0014,
        z: (Math.random() - 0.5) * 0.001,
      })
    }

    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))

    const ptMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.014,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
    const particles = new THREE.Points(ptGeo, ptMat)
    scene.add(particles)
    particleMatRef.current = ptMat

    // ── Mouse → camera drift ──────────────────────────────────────────────
    const mouse  = { x: 0, y: 0 }
    const camLag = { x: 0, y: 0 }

    function onMove(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)

    // ── Resize — ResizeObserver fires even on first layout ────────────────
    const ro = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    })
    ro.observe(canvas)

    // ── Render loop ───────────────────────────────────────────────────────
    let raf = 0
    const clock = new THREE.Clock()

    function tick() {
      raf = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      // Smooth camera drift (mouse parallax in 3D)
      camLag.x += (mouse.x * 0.45 - camLag.x) * 0.025
      camLag.y += (mouse.y * 0.22 - camLag.y) * 0.025
      camera.position.x = camLag.x
      camera.position.y = camLag.y
      camera.lookAt(scene.position)

      // Drift particles
      const attr = ptGeo.attributes.position as THREE.BufferAttribute
      const buf  = attr.array as Float32Array
      for (let i = 0; i < COUNT; i++) {
        buf[i * 3]     += vel[i].x
        buf[i * 3 + 1] += vel[i].y
        buf[i * 3 + 2] += vel[i].z
        if (buf[i * 3]     >  7) buf[i * 3]     = -7
        if (buf[i * 3]     < -7) buf[i * 3]     =  7
        if (buf[i * 3 + 1] >  5) buf[i * 3 + 1] = -5
        if (buf[i * 3 + 1] < -5) buf[i * 3 + 1] =  5
      }
      attr.needsUpdate = true

      uniforms.uTime.value = t
      renderer.render(scene, camera)
    }
    tick()

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      planeGeo.dispose()
      planeMat.dispose()
      ptGeo.dispose()
      ptMat.dispose()
      renderer.dispose()
      initialized.current = false
    }
  }, [])

  // ── Intro sequence (fires once ready is true) ───────────────────────────
  useEffect(() => {
    if (!ready) return
    const ptMat    = particleMatRef.current
    const mesh     = planeMeshRef.current
    const uniforms = uniformsRef.current
    if (!ptMat || !mesh || !uniforms) return

    const tl = gsap.timeline({ delay: 0.15 })

    // Particles drift in
    tl.to(ptMat, {
      opacity: 0.28,
      duration: 1.4,
      ease: 'power2.out',
    })

    // Image plane rises from depth + fades in
    tl.to(mesh.position, {
      z: 0,
      duration: 2.0,
      ease: 'power3.out',
    }, '-=0.6')

    tl.to(uniforms.uAlpha, {
      value: 1,
      duration: 1.6,
      ease: 'power2.inOut',
    }, '<')
  }, [ready])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      aria-hidden="true"
    />
  )
}
