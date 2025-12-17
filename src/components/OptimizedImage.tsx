import React from 'react'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  webpSrc?: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
  className?: string
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src,
  webpSrc,
  alt,
  width,
  height,
  loading = 'lazy',
  priority = false,
  className = '',
  ...props
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

