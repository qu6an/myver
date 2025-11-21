import React
import { useModal } from './ModalProvider' from 'react'

export default function Offer(){
  const modal = useModal();
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="bg-white/80 border rounded-xl p-8 md:p-12 grid md:grid-cols-[1fr_360px] gap-8">
          <div>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand to-brand-light text-white px-4 py-2 rounded-full mb-4">
              <i className="fa-solid fa-bolt"></i>
              ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ
            </div>
            <h3 className="text-2xl font-extrabold mb-2">Бесплатный доступ к экосистеме знаний АВТОКОМ</h3>
            <p className="text-slate-600">Узнайте секреты управления автосервисом, которые помогут удвоить прибыль уже в этом месяце</p>

            <div className="grid gap-4 mt-6">
              <div className="flex items-start gap-3 p-4 bg-white/70 border rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-brand flex items-center justify-center text-white"><i className="fa-solid fa-unlock"></i></div>
                <div>
                  <h4 className="font-semibold">Полный доступ к структуре знаний</h4>
                  <p className="text-slate-600">Изучите систему обучения — от основ до продвинутых тем.</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="sticky top-24">
            <div className="bg-white p-6 border rounded-xl shadow">
              <div className="text-sm uppercase text-slate-500 mb-2">3 дня</div>
              <h4 className="text-xl font-bold mb-4">Бесплатного гостевого доступа</h4>
              <div className="mb-4">
                <div className="text-slate-500 line-through">4 990₽</div>
                <div className="text-3xl font-extrabold text-brand">0₽</div>
                <div className="text-sm text-slate-500">первые 3 дня</div>
              </div>
              <button className="btn-primary w-full">Получить бесплатный доступ</button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
