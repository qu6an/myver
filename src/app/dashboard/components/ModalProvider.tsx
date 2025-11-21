import React, { createContext, useContext, useState, ReactNode } from 'react'
import Modal from './ui/Modal'

type ModalState = {
  show: (content: ReactNode, title?: string) => void
  hide: () => void
}

const ModalContext = createContext<ModalState | null>(null)

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState<string | undefined>()
  const [content, setContent] = useState<ReactNode | null>(null)

  const show = (c: ReactNode, t?: string) => {
    setContent(c)
    setTitle(t)
    setOpen(true)
  }
  const hide = () => {
    setOpen(false)
    setContent(null)
    setTitle(undefined)
  }

React.useEffect(()=> {
  // expose a simple imperative handle for quick migration from alert()
  (window as any).__modalHandle__ = {
    show: (c: React.ReactNode, t?: string) => { setContent(c); setTitle(t); setOpen(true) },
    hide: () => { setOpen(false); setContent(null); setTitle(undefined) }
  }
}, [])

return (

    <ModalContext.Provider value={{ show, hide }}>
      {children}
      <Modal open={open} onClose={hide} title={title}>
        {content}
      </Modal>
    </ModalContext.Provider>
  )
}
