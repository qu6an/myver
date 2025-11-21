import React\nimport { useModal } from './ModalProvider' from 'react'

export default function Experience(){
  const modal = useModal();
  return (
    <section id="real-experience" className="py-20 bg-slate-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Реальный опыт автосервисов</h2>
        <p className="text-center text-slate-600 mb-8">Посмотрите, как автосервисы используют платформу для роста</p>

        <div className="grid md:grid-cols-2 gap-6">
          <article className="bg-white/80 border rounded-xl p-4">
            <div className="h-40 rounded-lg mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
              <button onClick={() => { const m = modal; if (m) m.show(<div className='aspect-video bg-black flex items-center justify-center text-white'>Видеоплеер (заглушка)</div>, 'Видео'); }} className="bg-white/80 px-4 py-2 rounded">Play</button>
            </div>
            <h3 className="font-semibold">Как мы снизили издержки на 25% за 3 месяца</h3>
            <p className="text-slate-600">Владелец сети СТО делится опытом использования аналитики закупок и мотивации персонала.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
