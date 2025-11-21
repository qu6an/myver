import React from 'react'

export default function Dashboard(){
  return (
    <section id="dashboard" className="py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-extrabold mb-4">Дашборд — единая точка контроля</h2>
        <p className="text-slate-600 mb-6">Вся аналитика, проекты и мотивация команды в одном интерфейсе</p>

        <div className="bg-white/80 border rounded-xl p-6 grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="font-semibold">Сводная статистика</h4>
            <p className="text-slate-600">По проектам и статусам участия.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Баллы и достижения</h4>
            <p className="text-slate-600">Ранги сотрудников и рейтинги.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
