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
  uniform float     uWarmth;
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
    g = clamp(g * 1.06 * 0.94, 0.0, 1.0);
    g = g * g * (3.0 - 2.0 * g);
    g = mix(g * 0.95, g, smoothstep(0.2, 0.8, g));

    // Film grain (2-layer: coarse + fine)
    float grain  = hash(vUv + fract(uTime * 0.0013)) * 2.0 - 1.0;
    float grain2 = hash(vUv * 2.7 + fract(uTime * 0.0019)) * 2.0 - 1.0;
    g += grain * 0.02 + grain2 * 0.008;
    g  = clamp(g, 0.0, 1.0);

    // Vignette
    float v  = 1.0 - dot(cc * 1.4, cc * 1.4);
    v  = clamp(pow(v, 1.3), 0.0, 1.0);
    float vg = 0.55 + v * 0.45;
    g *= vg;

    // Color version (for reveal transition)
    vec3 colorRGB = col.rgb * vg;
    colorRGB = clamp(colorRGB + vec3(grain * 0.012), 0.0, 1.0);

    // Let the red curtain and flowers keep a controlled poetic warmth.
    float redSignal = smoothstep(0.04, 0.34, col.r - max(col.g, col.b));
    vec3 warmRGB = mix(vec3(g), colorRGB, redSignal * uWarmth);

    // Mix B&W and color based on uColorize, with a warm retained base.
    vec3 finalRGB = mix(warmRGB, colorRGB, uColorize);

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
  const apertureRef    = useRef<THREE.Group | null>(null)
  const beamRefs       = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[]>([])
  const flashRef       = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null>(null)
  const uniformsRef    = useRef<{
    uTexture:  { value: THREE.Texture | null }
    uTime:     { value: number }
    uAlpha:    { value: number }
    uColorize: { value: number }
    uReveal:   { value: number }
    uWarmth:   { value: number }
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
      uWarmth:   { value: 0.42 },
      uMouse:    { value: new THREE.Vector2(0.5, 0.5) },
    }
    uniformsRef.current = uniforms

    new THREE.TextureLoader().load('/images/Portraits/IMG_9777-2.jpeg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      uniforms.uTexture.value = tex
      ghostUniforms.uTexture.value = tex
    })

    // ── Portrait plane ────────────────────────────────────────────────────
    const planeGeo = new THREE.PlaneGeometry(3.05, 4.08, 64, 80)
    const planeMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader:   VERT,
      fragmentShader: FRAG,
      transparent: true,
    })
    const planeMesh = new THREE.Mesh(planeGeo, planeMat)
    planeMesh.position.set(1.9, 0.04, -2)
    scene.add(planeMesh)
    planeMeshRef.current = planeMesh

    const portraitFrameMat = new THREE.MeshBasicMaterial({
      color: 0xc8af78,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const portraitFrame = new THREE.Mesh(new THREE.PlaneGeometry(3.18, 4.21), portraitFrameMat)
    portraitFrame.position.set(1.9, 0.04, -0.012)
    scene.add(portraitFrame)

    const frameCutout = new THREE.Mesh(
      new THREE.PlaneGeometry(3.08, 4.11),
      new THREE.MeshBasicMaterial({ color: 0x080808, transparent: true, opacity: 0, depthWrite: false })
    )
    frameCutout.position.set(1.9, 0.04, -0.006)
    scene.add(frameCutout)

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

    // ── Cinematic aperture system ─────────────────────────────────────────
    const aperture = new THREE.Group()
    aperture.position.set(1.9, 0.04, -0.18)
    aperture.scale.setScalar(0.55)
    apertureRef.current = aperture
    scene.add(aperture)

    const apertureMat = new THREE.MeshBasicMaterial({
      color: 0xc8af78,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const apertureRing = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.01, 8, 128), apertureMat)
    aperture.add(apertureRing)

    const bladeMat = new THREE.MeshBasicMaterial({
      color: 0xc8af78,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const bladeGeo = new THREE.PlaneGeometry(1.2, 0.045)
    for (let i = 0; i < 10; i++) {
      const blade = new THREE.Mesh(bladeGeo, bladeMat)
      const angle = (i / 10) * Math.PI * 2
      blade.position.set(Math.cos(angle) * 1.45, Math.sin(angle) * 1.45, 0)
      blade.rotation.z = angle + Math.PI / 2
      aperture.add(blade)
    }

    // ── Light beams crossing the studio ───────────────────────────────────
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xc8af78,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const beamGeo = new THREE.PlaneGeometry(5.2, 0.34)
    beamRefs.current = []
    for (let i = 0; i < 4; i++) {
      const beam = new THREE.Mesh(beamGeo, beamMat.clone())
      beam.position.set(-1.1 + i * 0.78, 1.1 - i * 0.42, -0.6 - i * 0.24)
      beam.rotation.z = -0.38
      beam.rotation.y = -0.22
      scene.add(beam)
      beamRefs.current.push(beam)
    }

    const flashMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const flashMesh = new THREE.Mesh(new THREE.PlaneGeometry(14, 9), flashMat)
    flashMesh.position.set(0, 0, 3.4)
    scene.add(flashMesh)
    flashRef.current = flashMesh

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
    const startTime = performance.now()

    function tick() {
      raf = requestAnimationFrame(tick)
      const t = (performance.now() - startTime) / 1000

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

      if (apertureRef.current) {
        apertureRef.current.rotation.z += 0.0018
        apertureRef.current.rotation.y = Math.sin(t * 0.2) * 0.04
      }

      beamRefs.current.forEach((beam, i) => {
        beam.position.x += Math.sin(t * 0.42 + i) * 0.0008
        beam.material.opacity = 0.02 + Math.sin(t * 0.75 + i * 0.8) * 0.01
      })

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
      portraitFrame.geometry.dispose()
      portraitFrameMat.dispose()
      frameCutout.geometry.dispose()
      frameCutout.material.dispose()
      ghostGeo.dispose()
      ghostMat.dispose()
      ptGeo.dispose()
      ptMat.dispose()
      aperture.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
      beamRefs.current.forEach((beam) => {
        beam.geometry.dispose()
        beam.material.dispose()
      })
      beamRefs.current = []
      flashMesh.geometry.dispose()
      flashMat.dispose()
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
    const aperture   = apertureRef.current
    const beams      = beamRefs.current
    const flash      = flashRef.current
    const uniforms   = uniformsRef.current
    const ghostAlpha = ghostAlphaRef.current
    if (!ptMat || !mesh || !ghost || !aperture || !flash || !uniforms) return

    const tl = gsap.timeline({ delay: 0.1 })
    const portraitFrame = mesh.parent?.children.find(
      (child): child is THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> =>
        child instanceof THREE.Mesh &&
        child.geometry instanceof THREE.PlaneGeometry &&
        child.material instanceof THREE.MeshBasicMaterial &&
        child.material.color.getHex() === 0xc8af78 &&
        child.position.x === 1.9
    )

    const apertureMaterials = aperture.children
      .filter((child): child is THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> => child instanceof THREE.Mesh)
      .map((child) => child.material)

    // 1. Studio powers on: aperture, light sweep, and particle depth.
    tl.fromTo(
      aperture.scale,
      { x: 0.35, y: 0.35, z: 0.35 },
      { x: 1, y: 1, z: 1, duration: 1.2, ease: 'power4.out' }
    )
    tl.to(aperture.rotation, { z: Math.PI * 1.2, duration: 1.35, ease: 'power4.out' }, '<')
    tl.to(apertureMaterials, { opacity: 0.22, duration: 0.9, stagger: 0.025, ease: 'power2.out' }, '<')
    tl.to(beams.map((beam) => beam.material), { opacity: 0.065, duration: 1.1, stagger: 0.08, ease: 'power2.out' }, '<+=0.1')
    tl.to(ptMat, { opacity: 0.38, size: 0.018, duration: 1.3, ease: 'power2.out' }, '<')

    // 2. Camera flash, then the portrait develops top-to-bottom.
    tl.to(flash.material, { opacity: 0.32, duration: 0.08, ease: 'power1.out' }, '-=0.35')
    tl.to(flash.material, { opacity: 0, duration: 0.55, ease: 'power2.out' })
    tl.to(uniforms.uReveal, { value: 1.0, duration: 1.9, ease: 'power3.inOut' }, '-=0.48')
    tl.to(mesh.position, { z: 0.08, duration: 2.25, ease: 'power4.out' }, '<')
    tl.fromTo(mesh.rotation, { y: -0.22, x: 0.08 }, { y: 0, x: 0, duration: 2.0, ease: 'power4.out' }, '<')
    if (portraitFrame) {
      tl.to(portraitFrame.material, { opacity: 0.18, duration: 1.1, ease: 'power2.out' }, '<+=0.25')
    }

    // 3. Color drains to B&W while the aperture settles into a halo.
    tl.to(uniforms.uColorize, { value: 0, duration: 2.6, ease: 'power2.inOut' }, '+=0.05')
    tl.to(uniforms.uWarmth, { value: 0.58, duration: 2.0, ease: 'sine.inOut' }, '<')
    tl.to(apertureMaterials, { opacity: 0.08, duration: 1.4, ease: 'power2.inOut' }, '<')
    tl.to(aperture.scale, { x: 1.18, y: 1.18, z: 1.18, duration: 1.5, ease: 'sine.inOut' }, '<')

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
