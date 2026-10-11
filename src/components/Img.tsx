import type { CSSProperties } from 'react'
import { imageMeta, type ImageName } from '../data/images'

const base = import.meta.env.BASE_URL

export function imageUrl(name: ImageName, width?: number) {
  return `${base}images/${width ? `${name}-${width}` : name}.webp`
}

interface Props {
  name: ImageName
  alt: string
  sizes?: string
  eager?: boolean
  className?: string
  style?: CSSProperties
}

/** Responsive, intrinsically sized <img> so the browser reserves space before it loads. */
export function Img({ name, alt, sizes = '100vw', eager = false, className, style }: Props) {
  const meta = imageMeta[name]
  const srcSet = [...meta.variants.map((w) => `${imageUrl(name, w)} ${w}w`), `${imageUrl(name)} ${meta.width}w`].join(', ')
  return (
    <img
      className={className}
      style={style}
      src={imageUrl(name)}
      srcSet={srcSet}
      sizes={sizes}
      width={meta.width}
      height={meta.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
    />
  )
}
