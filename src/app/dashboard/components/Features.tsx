import React from 'react'
export default function Features(){
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Почему выбирают АВТОКОМ</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card icon="fa-solid fa-gamepad" title="Геймификация и мотивация" desc="Викторины, задания, система баллов и наград повышают вовлечённость команды на 35%." />
          <Card icon="fa-solid fa-chart-line" title="Прозрачная аналитика" desc="Полный контроль над закупками, клиентами и KPI." />
          <Card icon="fa-solid fa-users" title="Участие в проектах" desc="Доступ к эксклюзивным проектам, бонусам и партнёрским условиям." />
        </div>
      </div>
    </section>
  )
}

function Card({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <article className="bg-white/80 border rounded-xl p-6">
      <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-3">
        <i className={icon}></i>
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </article>
  )
}
