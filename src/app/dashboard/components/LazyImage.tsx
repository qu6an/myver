import React, { useEffect, useRef, useState } from 'react'

export default function LazyImage({ src, alt, className='', placeholder }: { src: string, alt?: string, className?: string, placeholder?: string }) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(()=>{
    const el = imgRef.current
    if (!el) return
    if ('loading' in HTMLImageElement.prototype) {
      // browser supports native lazy loading, just set flag
      setInView(true)
      return
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      })
    })
    io.observe(el)
    return ()=> io.disconnect()
  }, [])
  return (
    <img
      ref={imgRef}
      src={inView ? src : placeholder || ''}
      data-src={src}
      alt={alt || ''}
      className={className}
      loading="lazy"
    />
  )
}
