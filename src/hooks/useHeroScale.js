import { useState, useEffect } from 'react'

/**
 * Custom hook to calculate scale factor for entire page
 * Design is optimized for 67% zoom on 1920px screen
 * We want to maintain the same visual appearance at 100% zoom on all screens
 * 
 * Strategy: Calculate scale based on viewport width
 * - Design width: 1920px
 * - Target appearance: 67% zoom = 1286.4px effective width
 * - Scale = viewportWidth / 1920 * 0.67
 *   OR: Scale = 0.67 (fixed) and adjust container width
 */
export const useHeroScale = () => {
  const [scale, setScale] = useState(0.67)

  useEffect(() => {
    const calculateScale = () => {
      const viewportWidth = window.innerWidth
      // Use fixed 0.67 scale to match 67% zoom appearance
      // The container will be sized to fit the viewport
      setScale(0.67)
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    return () => window.removeEventListener('resize', calculateScale)
  }, [])

  return scale
}

