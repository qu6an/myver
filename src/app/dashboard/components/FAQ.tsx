import React, { useState } from 'react'

const faqs = [
  { q: 'Сколько стоит подключение?', a: 'Базовые функции полностью бесплатны. Премиум-функции доступны от 2990₽/месяц.' },
  { q: 'Как быстро можно начать работу?', a: 'Регистрация занимает 2 минуты. После подтверждения email вы сразу получаете доступ.' },
]

export default function FAQ(){
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-extrabold text-center mb-8">Частые вопросы</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((f,i) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              <button className="w-full text-left p-4 flex justify-between items-center" onClick={() => setOpen(open===i?null:i)}>
                <span className="font-semibold">{f.q}</span>
                <span>{open===i?'-':'+'}</span>
              </button>
              <div className={`p-4 ${open===i ? 'block' : 'hidden'}`}>
                <p className="text-slate-600">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
