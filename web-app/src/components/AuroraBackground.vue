
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!container.value) return

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  const particlesGeometry = new THREE.BufferGeometry()
  const count = 2000
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00aaff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  })

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)

  let running = false

  const tick = () => {
    if (!running) return
    particles.rotation.y += 0.001
    particles.rotation.x += 0.0005
    renderer.render(scene, camera)
  }

  const start = () => {
    // If hidden, don't start. Note: we removed !document.hasFocus() because
    // it prevents animation when user is just watching without interacting.
    if (running || document.hidden) return
    running = true
    renderer.setAnimationLoop(tick)
  }

  const stop = () => {
    running = false
    renderer.setAnimationLoop(null)
    window.removeEventListener('resize', onResize)
  }

  const onVisibilityChange = () => {
    if (document.hidden) {
      stop()
      // Removed forceContextLoss as it might trigger wake-up
    } else {
      if (!document.hidden) {
        window.addEventListener('resize', onResize)
        start()
      }
    }
  }

  // Only stop on visibility change, not blur.
  // This allows dual-monitor users to see animation even if focus is on another window.
  // Minimizing still triggers visibilitychange -> hidden.
  // const onBlur = () => { stop() }
  // const onFocus = () => { start() }

  const onResize = () => {
    if (document.hidden) return
    if (window.innerWidth <= 0 || window.innerHeight <= 0) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  document.addEventListener('visibilitychange', onVisibilityChange)
  // window.addEventListener('blur', onBlur)
  window.addEventListener('resize', onResize)
  start()

  onBeforeUnmount(() => {
    stop()
    document.removeEventListener('visibilitychange', onVisibilityChange)
    // window.removeEventListener('blur', onBlur)
    window.removeEventListener('resize', onResize)
    renderer.dispose()
  })
})
</script>

<template>
  <div class="aurora-background">
    <div class="gradient-overlay"></div>
    <div ref="container" class="particle-container"></div>
  </div>
</template>

<style scoped lang="scss">
.aurora-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #050a15; // Fallback
  overflow: hidden;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, #0a1f3d 0%, #050a15 100%);
  opacity: 0.8;
  mix-blend-mode: overlay;
}

.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; // Allow clicks through
}
</style>
