import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import type { GalleryItem } from '../data/gallery'
import { Img } from './Img'

interface Props {
  items: GalleryItem[]
  index: number | null
  onChange: (index: number | null) => void
}

export function Lightbox({ items, index, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const open = index !== null
  const item = open ? items[index] : null

  const step = useCallback(
    (delta: number) => {
      if (index === null) return
      onChange((index + delta + items.length) % items.length)
    },
    [index, items.length, onChange],
  )

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement as HTMLElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      lastFocus.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onChange, step])

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${items.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === e.currentTarget && onChange(null)}
          onKeyDown={(e) => {
            if (e.key !== 'Tab') return
            const focusable = e.currentTarget.querySelectorAll<HTMLElement>('button')
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault()
              last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault()
              first.focus()
            }
          }}
        >
          <button ref={closeRef} type="button" className="lightbox__close" onClick={() => onChange(null)} aria-label="Close">
            <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
              <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.figure
              key={item.image}
              className="lightbox__figure"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) step(1)
                else if (info.offset.x > 60) step(-1)
              }}
            >
              <Img name={item.image} alt={item.alt} sizes="100vw" eager className="lightbox__img" />
              <figcaption>
                {item.alt}
                <span className="lightbox__count">
                  {index + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous photo">
            <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true">
              <path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next photo">
            <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true">
              <path d="M7.5 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
