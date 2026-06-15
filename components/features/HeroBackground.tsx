'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 3

    // Grid of points
    const gridSize = 30
    const spacing = 0.25
    const positions: number[] = []
    const colors: number[] = []

    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
      for (let y = -gridSize / 2; y < gridSize / 2; y++) {
        positions.push(x * spacing, y * spacing, 0)
        const t = Math.random()
        // Blue to violet gradient
        colors.push(
          0.1 + t * 0.3,  // R
          0.2 + t * 0.1,  // G
          0.6 + t * 0.3   // B
        )
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let mouseX = 0
    let mouseY = 0
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 0.3
    }
    window.addEventListener('mousemove', handleMouse)

    const handleResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    let animId: number
    const clock = new THREE.Clock()
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      points.rotation.z = t * 0.015
      camera.position.x += (mouseX - camera.position.x) * 0.02
      camera.position.y += (mouseY - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      // Animate opacity with subtle wave
      const posArr = geometry.attributes.position.array as Float32Array
      for (let i = 2; i < posArr.length; i += 3) {
        posArr[i] = Math.sin(t * 0.5 + i * 0.1) * 0.15
      }
      geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
