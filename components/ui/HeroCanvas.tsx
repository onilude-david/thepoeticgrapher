'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from '@/lib/gsap'

// ─── GLSL ────────────────────────────────────────────────────────────────────

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec2  vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Slow breathing wave — makes the plane feel like a living surface
    pos.z += sin(pos.x * 2.1 + uTime * 0.55) * 0.016
           + sin(pos.y * 1.8 + uTime * 0.40) * 0.011;

    // Mouse push — portrait surface bows toward viewer at cursor position
    vec2  toMouse = vUv - uMouse;
    float mdist   = length(toMouse);
    pos.z += exp(-mdist * mdist * 5.5) * 0.22;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const FRAG = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float     uTime;
  uniform float     uAlpha;
  uniform float     uColorize; // 1.0 = full color, 0.0 = B&W
  uniform float     uReveal;   // 0.0 = hidden, 1.0 = fully revealed (scan top→bottom)
  uniform vec2      uMouse;
  varying vec2      vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    // Barrel lens distortion
    vec2  cc  = vUv - 0.5;
    float d   = dot(cc, cc);
    vec2  uv  = vUv + cc * d * 0.045;

    // Mouse ripple — radiating distortion ring from cursor
    vec2  toMouse   = vUv - uMouse;
    float distMouse = length(toMouse);
    float ripple    = sin(distMouse * 20.0 - uTime * 4.2) * 0.007;
    float ripFade   = exp(-distMouse * 5.2);
    uv += normalize(toMouse + vec2(0.001)) * ripple * ripFade;
    uv  = clamp(uv, 0.001, 0.999);

    vec4 col = texture2D(uTexture, uv);

    // Grayscale + cinematic S-curve
    float g = dot(col.rgb, vec3(0.299, 0.587, 0.114));
    g = clamp(g * 1.03 * 0.92, 0.0, 1.0);
    g = g * g * (3.0 - 2.0 * g);
    g = mix(g * 0.95, g, smoothstep(0.2, 0.8, g));

    // Film grain (2-layer: coarse + fine)
    float grain  = hash(vUv + fract(uTime * 0.0013)) * 2.0 - 1.0;
    float grain2 = hash(vUv * 2.7 + fract(uTime * 0.0019)) * 2.0 - 1.0;
    g += grain * 0.028 + grain2 * 0.012;
    g  = clamp(g, 0.0, 1.0);

    // Vignette
    float v  = 1.0 - dot(cc * 1.4, cc * 1.4);
    v  = clamp(pow(v, 1.3), 0.0, 1.0);
    float vg = 0.55 + v * 0.45;
    g *= vg;

    // Color version (for reveal transition)
    vec3 colorRGB = col.rgb * vg;
    colorRGB = clamp(colorRGB + vec3(grain * 0.012), 0.0, 1.0);

    // Mix B&W and color based on uColorize
    vec3 finalRGB = mix(vec3(g), colorRGB, uColorize);

    // Scan reveal: vUv.y=1 is top, vUv.y=0 is bottom
    // Scan line descends as uReveal goes 0→1
    float scanPos = 1.0 - uReveal;
    float scanned = smoothstep(scanPos - 0.04, scanPos + 0.04, vUv.y);

    // Warm glow at the developing front edge
    float distToScan = abs(vUv.y - scanPos);
    float scanGlow = exp(-distToScan * 26.0) * 0.5 * (1.0 - clamp(uReveal * 1.2, 0.0, 1.0));
    finalRGB += vec3(scanGlow * 1.1, scanGlow * 0.85, scanGlow * 0.55);

    gl_FragColor = vec4(finalRGB, uAlpha * scanned);
  }
`

const GHOST_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const GHOST_FRAG = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float     uAlpha;
  varying vec2      vUv;

  void main() {
    vec2  cc = vUv - 0.5;
    float d  = dot(cc, cc);
    vec2  uv = clamp(vUv + cc * d * 0.035, 0.001, 0.999);

    vec4  col = texture2D(uTexture, uv);
    float g   = dot(col.rgb, vec3(0.299, 0.587, 0.114));
    g = clamp(g * 0.85, 0.0, 1.0);
    g = g * g * (3.0 - 2.0 * g);

    float v = 1.0 - dot(cc * 1.6, cc * 1.6);
    v = clamp(pow(v, 1.5), 0.0, 1.0);
    g *= 0.4 + v * 0.6;

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

  const particleMatRef = useRef<THREE.PointsMaterial | null>(null)
  const planeMeshRef   = useRef<THREE.Mesh | null>(null)
  const ghostMeshRef   = useRef<THREE.Mesh | null>(null)
  const uniformsRef    = useRef<{
    uTexture:  { value: THREE.Texture | null }
    uTime:     { value: number }
    uAlpha:    { value: number }
    uColorize: { value: number }
    uReveal:   { value: number }
    uMouse:    { value: THREE.Vector2 }
  } | null>(null)
  const ghostAlphaRef = useRef<{ value: number }>({ value: 0 })

  useEffect(() => {
    if (initialized.current || !canvasRef.current) return
    initialized.current = true

    const canvas = canvasRef.current
    const W = window.innerWidth
    const H = window.innerHeight

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H, false)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    // ── Scene & camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x080808)

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.set(0, 0, 5)

    // ── Uniforms ──────────────────────────────────────────────────────────
    const uniforms = {
      uTexture:  { value: null as THREE.Texture | null },
      uTime:     { value: 0 },
      uAlpha:    { value: 1 },
      uColorize: { value: 1.0 },
      uReveal:   { value: 0.0 },
      uMouse:    { value: new THREE.Vector2(0.5, 0.5) },
    }
    uniformsRef.current = uniforms

    new THREE.TextureLoader().load('/images/Portraits/IMG_9777-2.jpeg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      uniforms.uTexture.value = tex
      ghostUniforms.uTexture.value = tex
    })

    // ── Portrait plane ────────────────────────────────────────────────────
    const planeGeo = new THREE.PlaneGeometry(2.9, 3.9, 48, 64)
    const planeMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader:   VERT,
      fragmentShader: FRAG,
      transparent: true,
    })
    const planeMesh = new THREE.Mesh(planeGeo, planeMat)
    planeMesh.position.set(1.8, 0.1, -2)
    scene.add(planeMesh)
    planeMeshRef.current = planeMesh

    // ── Studio floor grid ─────────────────────────────────────────────────
    const floorGrid = new THREE.GridHelper(30, 20, 0x1c1c1c, 0x141414)
    floorGrid.position.set(0, -3.6, -1)
    floorGrid.rotation.x = Math.PI * 0.06
    scene.add(floorGrid)

    const wallGrid = new THREE.GridHelper(26, 14, 0x161616, 0x111111)
    wallGrid.position.set(0, 0, -8)
    wallGrid.rotation.x = Math.PI / 2
    scene.add(wallGrid)

    // ── Aperture rings ────────────────────────────────────────────────────
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x2e2e2e })
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.007, 8, 80), ringMat1)
    ring1.position.set(-2.8, 1.4, -1.8)
    scene.add(ring1)

    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x252525 })
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.006, 8, 60), ringMat2)
    ring2.position.set(3.8, -0.9, -1.2)
    scene.add(ring2)

    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x1e1e1e })
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.005, 8, 100), ringMat3)
    ring3.position.set(0.5, 2.5, -5)
    scene.add(ring3)

    // ── Ghost plane ───────────────────────────────────────────────────────
    const ghostAlpha = { value: 0 }
    ghostAlphaRef.current = ghostAlpha

    const ghostUniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uAlpha:   ghostAlpha,
    }
    const ghostGeo = new THREE.PlaneGeometry(2.9, 3.9, 1, 1)
    const ghostMat = new THREE.ShaderMaterial({
      uniforms:       ghostUniforms,
      vertexShader:   GHOST_VERT,
      fragmentShader: GHOST_FRAG,
      transparent: true,
    })
    const ghostMesh = new THREE.Mesh(ghostGeo, ghostMat)
    ghostMesh.position.set(2.1, -0.1, -3.8)
    ghostMesh.scale.set(1.04, 1.04, 1)
    scene.add(ghostMesh)
    ghostMeshRef.current = ghostMesh

    // ── Particles ─────────────────────────────────────────────────────────
    const COUNT = 600
    const pos   = new Float32Array(COUNT * 3)
    type V3 = { x: number; y: number; z: number }
    const vel: V3[] = []

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 0.5
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

    // ── Mouse tracking ────────────────────────────────────────────────────
    const mouse    = { x: 0, y: 0 }
    const camLag   = { x: 0, y: 0 }
    const planeLag = { x: 0, y: 0 }

    function onMove(e: MouseEvent) {
      mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)

    // ── Resize ────────────────────────────────────────────────────────────
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

      camLag.x += (mouse.x * 0.45 - camLag.x) * 0.025
      camLag.y += (mouse.y * 0.22 - camLag.y) * 0.025
      camera.position.x = camLag.x
      camera.position.y = camLag.y
      camera.lookAt(scene.position)

      ring1.rotation.y += 0.0042
      ring1.rotation.x += 0.0018
      ring2.rotation.y -= 0.0035
      ring2.rotation.z += 0.0022
      ring3.rotation.x += 0.001
      ring3.rotation.z -= 0.0008
      floorGrid.rotation.y += 0.0003

      planeLag.x += (mouse.x * 0.07 - planeLag.x) * 0.04
      planeLag.y += (mouse.y * 0.05 - planeLag.y) * 0.04
      planeMesh.rotation.y =  planeLag.x + Math.sin(t * 0.22) * 0.015
      planeMesh.rotation.x = -planeLag.y + Math.sin(t * 0.16) * 0.010
      planeMesh.position.y = 0.1 + Math.sin(t * 0.38) * 0.055

      ghostMesh.rotation.y = planeLag.x * 0.6
      ghostMesh.rotation.x = -planeLag.y * 0.6
      ghostMesh.position.y = -0.1 + Math.sin(t * 0.38 + 0.8) * 0.04

      uniforms.uMouse.value.set(mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5)

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
      ghostGeo.dispose()
      ghostMat.dispose()
      ptGeo.dispose()
      ptMat.dispose()
      ;(ring1.geometry as THREE.BufferGeometry).dispose()
      ringMat1.dispose()
      ;(ring2.geometry as THREE.BufferGeometry).dispose()
      ringMat2.dispose()
      ;(ring3.geometry as THREE.BufferGeometry).dispose()
      ringMat3.dispose()
      ;(floorGrid.geometry as THREE.BufferGeometry).dispose()
      ;(wallGrid.geometry as THREE.BufferGeometry).dispose()
      renderer.dispose()
      initialized.current = false
    }
  }, [])

  // ── Intro sequence (darkroom reveal) ─────────────────────────────────────
  useEffect(() => {
    if (!ready) return
    const ptMat      = particleMatRef.current
    const mesh       = planeMeshRef.current
    const ghost      = ghostMeshRef.current
    const uniforms   = uniformsRef.current
    const ghostAlpha = ghostAlphaRef.current
    if (!ptMat || !mesh || !ghost || !uniforms) return

    const tl = gsap.timeline({ delay: 0.1 })

    // 1. Particles drift in
    tl.to(ptMat, { opacity: 0.28, duration: 1.4, ease: 'power2.out' })

    // 2. Scan reveal — portrait develops top→bottom in full color
    tl.to(uniforms.uReveal, { value: 1.0, duration: 1.8, ease: 'power2.inOut' }, '-=0.8')
    tl.to(mesh.position, { z: 0, duration: 2.2, ease: 'power3.out' }, '<')

    // 3. Color drains to B&W — cinematic desaturation
    tl.to(uniforms.uColorize, { value: 0, duration: 2.6, ease: 'power2.inOut' }, '+=0.2')

    // 4. Ghost plane slides in
    tl.to(ghost.position, { z: -0.55, duration: 2.2, ease: 'power3.out' }, '-=2.2')
    tl.to(ghostAlpha, { value: 0.22, duration: 1.4, ease: 'power2.inOut' }, '<+=0.3')
  }, [ready])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
