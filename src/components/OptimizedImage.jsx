import React from 'react'

const OptimizedImage = ({ 
  src,           // Original PNG path (e.g., "/images/chariot.png.png")
  webpSrc,       // Optional: custom WebP path (auto-generated if not provided)
  alt,           // Alt text for accessibility
  width,         // Image width (for layout stability)
  height,        // Image height (for layout stability)
  loading = 'lazy',  // 'lazy' or 'eager' (lazy by default)
  priority = false,  // true for critical images (sets fetchPriority="high")
  className = '',    // CSS classes
  ...props       // Any other img attributes
}) => {
  // Auto-generate WebP path from PNG path
  // "/images/chariot.png.png" → "/images/chariot.png.webp"
  const baseName = src.replace(/\.(png|jpg|jpeg)$/i, '')
  const webp = webpSrc || `${baseName}.webp`
  const fallback = src

  return (
    <picture>
      {/* Modern browsers will use WebP */}
      <source srcSet={webp} type="image/webp" />
      
      {/* Fallback PNG for older browsers */}
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
        {...props}
      />
    </picture>
  )
}

export default OptimizedImage

