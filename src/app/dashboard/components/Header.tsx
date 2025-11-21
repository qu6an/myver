import React\nimport { useModal } from './ModalProvider' from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const modal = useModal();
  return (
    <motion.header
      id="header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-slate-200"
    >
      <div className="container-custom flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <img src="https://autocom.parts/i/logo.svg" alt="АВТОКОМ" className="h-10" />
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900">Преимущества</a>
            <a href="#projects" className="text-slate-600 hover:text-slate-900">Проекты</a>
            <a href="#dashboard" className="text-slate-600 hover:text-slate-900">Дашборд</a>
          </nav>
        </div>

        <div className="flex gap-3 items-center">
          <button className="px-4 py-2 rounded-xl border" onClick={() => { const m = modal; if (m) m.show(<div>Форма входа ещё не реализована</div>, 'Вход'); }}>Войти</button>
          <button className="btn-primary" onClick={() => { const m = modal; if (m) m.show(<div>Регистрация ещё не реализована</div>, 'Регистрация'); }}>Создать аккаунт</button>
        </div>
      </div>
    </motion.header>
  )
}
