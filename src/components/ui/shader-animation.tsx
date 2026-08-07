"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ShaderAnimationProps {
  className?: string
}

export function ShaderAnimation({ className = "w-full h-full" }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: Record<string, THREE.IUniform>
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader tuned for high-contrast violet/cyan/emerald theme match
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.04;
        float lineWidth = 0.0025;

        vec3 intensity = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i = 0; i < 5; i++){
            intensity[j] += lineWidth * float(i * i) / abs(fract(t - 0.015 * float(j) + float(i) * 0.012) * 4.5 - length(uv) + mod(uv.x + uv.y, 0.22));
          }
        }

        // Color palette: Violet (#7c3aed), Cyan (#38bdf8), Emerald (#34d399)
        vec3 violet = vec3(0.486, 0.227, 0.929);
        vec3 cyan   = vec3(0.220, 0.741, 0.973);
        vec3 emerald = vec3(0.204, 0.827, 0.600);

        float blendFactor = sin(t + length(uv) * 2.0) * 0.5 + 0.5;
        vec3 themeColor = mix(violet, mix(cyan, emerald, blendFactor), sin(uv.x * 2.0) * 0.5 + 0.5);

        vec3 finalColor = themeColor * (intensity.r + intensity.g + intensity.b) * 0.85;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms: Record<string, THREE.IUniform> = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    container.appendChild(renderer.domElement)

    // Synchronized Resize logic using ResizeObserver
    const updateSize = () => {
      if (!container || !renderer.domElement) return
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height, false)
      renderer.domElement.style.width = "100%"
      renderer.domElement.style.height = "100%"
      
      const res = uniforms.resolution.value as THREE.Vector2
      if (res) {
        res.set(width * renderer.getPixelRatio(), height * renderer.getPixelRatio())
      }
    }

    updateSize()

    const resizeObserver = new ResizeObserver(() => {
      updateSize()
    })
    resizeObserver.observe(container)

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.04
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    // Start animation
    animate()

    // Cleanup function
    return () => {
      resizeObserver.disconnect()

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          if (container.contains(sceneRef.current.renderer.domElement)) {
            container.removeChild(sceneRef.current.renderer.domElement)
          }
        }

        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
      style={{
        background: "transparent",
        overflow: "hidden",
      }}
    />
  )
}

export default ShaderAnimation
