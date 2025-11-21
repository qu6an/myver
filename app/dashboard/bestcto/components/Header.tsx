import React from 'react'

export default function Header({ user }: { user: string }) {
  return (
    <header className="bg-white rounded-2xl p-4 shadow flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Добро пожаловать, {user}!</h1>
        <p className="text-sm text-slate-500">Мониторинг вашего прогресса в конкурсе АВТОСЕРВИС ГОДА</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center bg-green-50 text-green-600 px-3 py-2 rounded-full font-semibold">Активный участник</div>
        <div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-3 py-2 rounded-full font-semibold gap-2"><i className="fa fa-award"/> Номинация: Лучший механик</div>
      </div>
    </header>
  )
}
