import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-6 text-sm text-slate-500">
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="font-bold">АВТОСЕРВИС ГОДА</div>
            <div className="mt-2 text-xs text-slate-400">О проекте, контакты, правила</div>
          </div>
          <div>
            <div className="font-semibold">Ссылки</div>
            <ul className="mt-2 text-xs text-slate-400 space-y-1">
              <li>Правила</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Контакты</div>
            <div className="mt-2 text-xs text-slate-400">support@example.com</div>
          </div>
          <div>
            <div className="font-semibold">Партнёры</div>
            <div className="mt-2 text-xs text-slate-400">LYNXauto, BOSCH</div>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-slate-400">© 2025 Autocom. Все права защищены.</div>
      </div>
    </footer>
  )
}
