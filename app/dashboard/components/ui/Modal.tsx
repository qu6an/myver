import React, { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const modalRootId = 'modal-root'

function ensureModalRoot() {
  let root = document.getElementById(modalRootId)
  if (!root) {
    root = document.createElement('div')
    root.id = modalRootId
    document.body.appendChild(root)
  }
  return root
}

export default function Modal({ open, onClose, children, title }: { open: boolean, onClose: ()=>void, children?: ReactNode, title?: string }) {
  useEffect(()=> {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div initial={{ y:20, scale:0.98 }} animate={{ y:0, scale:1 }} exit={{ y:10, scale:0.98 }} transition={{ type:'spring', stiffness: 300 }} className="relative bg-white rounded-xl shadow-soft max-w-lg w-full p-6 z-10">
            {title && <div className="text-lg font-semibold mb-3">{title}</div>}
            <div>{children}</div>
            <div className="mt-4 text-right">
              <button onClick={onClose} className="px-4 py-2 rounded-xl border">Закрыть</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    ensureModalRoot()
  )
}
