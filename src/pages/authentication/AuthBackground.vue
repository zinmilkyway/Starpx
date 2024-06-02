<template>
  <div ref="starfield" class="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three'

const starfield = ref<HTMLDivElement | null>(null)

const initThreeJS = () => {
  // Basic setup
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer()
  scene.background = new THREE.Color(0x070f2b)
  renderer.setSize(window.innerWidth, window.innerHeight)

  if (starfield.value) {
    starfield.value.appendChild(renderer.domElement)
  }

  const createCircularTexture = () => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')
    if (context) {
      context.beginPath()
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      context.fillStyle = 'white'
      context.fill()
    }

    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true

    return texture
  }

  const texture = createCircularTexture()

  // Create stars
  const starGeometry = new THREE.BufferGeometry()
  const starMaterial = new THREE.PointsMaterial({
    color: 0x9290c3,
    size: 2,
    map: texture,
    alphaTest: 0.5,
    transparent: true
  })
  const starVertices: number[] = []

  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000)
    const y = THREE.MathUtils.randFloatSpread(2000)
    const z = THREE.MathUtils.randFloatSpread(2000)

    starVertices.push(x, y, z)
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)

  camera.position.z = 1

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate)

    stars.rotation.x += 0.00002
    stars.rotation.y += 0.00002

    renderer.render(scene, camera)
  }

  animate()

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

onMounted(() => {
  initThreeJS()
})
</script>
