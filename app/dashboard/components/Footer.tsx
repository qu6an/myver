import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-slate-50 py-12">
      <div className="container-custom text-slate-600">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <img src="https://autocom.parts/i/logo.svg" alt="logo" className="h-8 mb-2"/>
            <div className="text-sm">E-mail: info@autocom.parts</div>
          </div>
          <div>
            <div className="font-semibold mb-2">Документы</div>
            <div className="space-y-2 text-sm">
              <a className="block">Политика конфиденциальности</a>
              <a className="block">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-slate-500 mt-8">© 2025 АВТОКОМ — Платформа управления автосервисом. Все права защищены.</div>
      </div>
    </footer>
  )
}
