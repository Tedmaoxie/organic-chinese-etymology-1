
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { getMoleculeData } from '../utils/moleculeBuilder'
import type { MoleculeData } from '../utils/moleculeBuilder'

const props = defineProps<{
  groupId: string
}>()

const container = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let moleculeGroup: THREE.Group
let resizeObserver: ResizeObserver | null = null
let running = false
const mouse = new THREE.Vector2()

const createAtomMesh = (radius: number, color: number) => {
  const geometry = new THREE.SphereGeometry(radius, 32, 32)
  const material = new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.1,
    thickness: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  })
  return new THREE.Mesh(geometry, material)
}

const createBondMesh = (start: THREE.Vector3, end: THREE.Vector3, order: number) => {
  const direction = new THREE.Vector3().subVectors(end, start)
  const length = direction.length()
  const radius = 0.08
  // const geometry = new THREE.CylinderGeometry(radius, radius, length, 16)
  // const material = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.4, metalness: 0.6 })
  const group = new THREE.Group()
  const axis = new THREE.Vector3(0, 1, 0)
  const normalized = direction.clone().normalize()
  const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, normalized)
  const midpoint = start.clone().add(direction.multiplyScalar(0.5))
  const offsetBase = new THREE.Vector3(1, 0, 0)
  // Check if normalized is parallel to (1,0,0)
  if (Math.abs(normalized.x) > 0.9) {
      offsetBase.set(0, 1, 0)
  }
  offsetBase.cross(normalized).normalize().multiplyScalar(0.15) // Slightly larger separation

  const addBond = (offset: THREE.Vector3) => {
    // Create new geometry and material for each bond to avoid shared state issues
    // and ensure proper rendering
    const bondGeometry = new THREE.CylinderGeometry(radius, radius, length, 16)
    const bondMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x888888, 
        roughness: 0.4, 
        metalness: 0.6 
    })
    
    const cylinder = new THREE.Mesh(bondGeometry, bondMaterial)
    cylinder.quaternion.copy(quaternion)
    cylinder.position.copy(midpoint).add(offset)
    group.add(cylinder)
  }

  if (order === 1) {
    addBond(new THREE.Vector3(0, 0, 0))
  } else if (order === 2) {
    // Parallel double bond
    // We need to apply the offset in the local frame defined by offsetBase
    // Ensure offsetBase is perpendicular to bond direction
    addBond(offsetBase.clone())
    addBond(offsetBase.clone().multiplyScalar(-1))
  } else if (order === 3) {
    // Triple bond: one central, two parallel
    addBond(new THREE.Vector3(0, 0, 0))
    addBond(offsetBase.clone().multiplyScalar(1.6))
    addBond(offsetBase.clone().multiplyScalar(-1.6))
  }

  return group
}

const renderMolecule = (data: MoleculeData) => {
  if (!scene) return
  if (moleculeGroup) scene.remove(moleculeGroup)
  moleculeGroup = new THREE.Group()

  data.atoms.forEach((atom, index) => {
    const mesh = createAtomMesh(atom.radius, atom.color)
    mesh.position.set(atom.position[0], atom.position[1], atom.position[2])
    mesh.userData = { type: 'atom', index, element: atom.element }
    moleculeGroup.add(mesh)
  })

  data.bonds.forEach((bond) => {
    const start = new THREE.Vector3(bond.start[0], bond.start[1], bond.start[2])
    const end = new THREE.Vector3(bond.end[0], bond.end[1], bond.end[2])
    const mesh = createBondMesh(start, end, bond.order)
    moleculeGroup.add(mesh)
  })

  const box = new THREE.Box3().setFromObject(moleculeGroup)
  const center = box.getCenter(new THREE.Vector3())
  moleculeGroup.position.sub(center)
  scene.add(moleculeGroup)
}

const onResize = () => {
  if (document.hidden) return
  if (!container.value) return
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  if (width <= 0 || height <= 0) return
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

const tick = () => {
  if (!running) return
  controls.update()
  if (moleculeGroup) {
    moleculeGroup.rotation.y += 0.002
    const targetX = mouse.y * 0.2
    const targetZ = mouse.x * 0.2
    moleculeGroup.rotation.x += (targetX - moleculeGroup.rotation.x) * 0.05
    moleculeGroup.rotation.z += (targetZ - moleculeGroup.rotation.z) * 0.05
  }
  renderer.render(scene, camera)
}

const start = () => {
  // Allow running even if not focused, as long as visible
  if (running || document.hidden) return
  running = true
  renderer.setAnimationLoop(tick)
}

const stop = () => {
  running = false
  renderer.setAnimationLoop(null)
  if (resizeObserver) resizeObserver.disconnect()
}

const onVisibilityChange = () => {
  if (document.hidden) {
    stop()
    if (controls) controls.enabled = false
  } else {
    // Only restart if visible
    if (!document.hidden) {
        if (controls) controls.enabled = true
        if (resizeObserver && container.value) {
            resizeObserver.observe(container.value)
        }
        start()
    }
  }
}

// Removed onBlur/onFocus to prevent stopping when just losing focus (e.g. clicking another window)
// Minimizing still triggers visibilitychange -> hidden

const onMouseMove = (event: MouseEvent) => {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
}

watch(
  () => props.groupId,
  (newId) => {
    if (!newId) return
    const data = getMoleculeData(newId)
    if (data && scene) renderMolecule(data)
  }
)

onMounted(() => {
  if (!container.value) return

  scene = new THREE.Scene()
  const ambientLight = new THREE.AmbientLight(0x404040, 2)
  const dirLight = new THREE.DirectionalLight(0xffffff, 2)
  const rimLight = new THREE.SpotLight(0x00aaff, 5)
  dirLight.position.set(5, 5, 5)
  rimLight.position.set(-5, 5, -5)
  rimLight.lookAt(0, 0, 0)
  scene.add(ambientLight, dirLight, rimLight)

  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.set(0, 0, 8) // Moved camera further back (from 5 to 8) to fit larger molecules like Benzene

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  renderer.domElement.style.display = 'block'
  container.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  onResize()

  const data = getMoleculeData(props.groupId)
  if (data) renderMolecule(data)

  resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(container.value)
  container.value.addEventListener('mousemove', onMouseMove)

  document.addEventListener('visibilitychange', onVisibilityChange)
  start()
})

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  document.removeEventListener('visibilitychange', onVisibilityChange)
  container.value?.removeEventListener('mousemove', onMouseMove)
  controls?.dispose()
  renderer?.dispose()
})
</script>

<template>
  <div ref="container" class="molecule-viewer"></div>
</template>

<style scoped>
.molecule-viewer {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
