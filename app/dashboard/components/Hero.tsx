import React\nimport { useModal } from './ModalProvider' from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const modal = useModal();
  return (
    <section className="hero-bg">
      <div className="container-custom grid md:grid-cols-[1fr_360px] gap-12 items-start">
        <div>
          <motion.div initial={{ x:-30, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.6 }} className="inline-flex items-center gap-3 bg-white/70 px-4 py-2 rounded-full border">
            <i className="fa-solid fa-car-side"></i>
            <span className="font-semibold text-sm">Для автосервисов • Мотивация • Аналитика</span>
          </motion.div>

          <motion.h1 initial={{ y:30, opacity:0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once:true }} transition={{ duration:0.7 }} className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">
            Управляйте автосервисом и участвуйте в проектах АВТОКОМ
          </motion.h1>

          <motion.p className="mt-4 text-lg text-slate-600" initial={{ y:20, opacity:0 }} whileInView={{ y:0, opacity:1 }} transition={{ delay:0.1 }}>
            Платформа управления автосервисом с геймификацией, аналитикой, обучением и мотивацией персонала.
          </motion.p>

          <motion.div className="mt-6 flex flex-wrap gap-4" initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ delay:0.2 }}>
            <button className="btn-primary" onClick={() => { const m = modal; if (m) m.show(<div>Форма регистрации</div>, 'Регистрация'); }}>Создать аккаунт — бесплатно</button>
            <button className="px-4 py-2 rounded-xl border" onClick={() => { const m = modal; if (m) m.show(<div>Демо-дашборд (заглушка)</div>, 'Демо'); }}>Посмотреть демо-дашборд</button>
          </motion.div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <StatCard value="+35%" label="Рост вовлечённости" />
            <StatCard value="-25%" label="Снижение издержек" />
            <StatCard value="8000+" label="Автосервисов в сети" />
          </div>
        </div>

        <div>
          <div className="bg-white/80 border rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold text-center mb-4">Вход в систему</h3>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label }: { value: string, label: string }) {
  const modal = useModal();
  return (
    <motion.div className="bg-white/70 border rounded-xl p-4 text-center" initial={{ y:20, opacity:0 }} whileInView={{ y:0, opacity:1 }}>
      <div className="text-2xl font-extrabold text-brand">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </motion.div>
  )
}

function LoginForm() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    const email = data.get('email') as string
    const password = data.get('password') as string
    if(!email || !password) { (function(){ const m = modal; if (m) m.show(<div>Пожалуйста, заполните все поля</div>, 'Ошибка'); })(); return }
     (function(){ const m = modal; if (m) m.show(<div>Успешный вход для <strong>{email}</strong></div>, 'Успех'); })()
  }

  const modal = useModal();
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-600">Email</label>
        <input name="email" type="email" className="w-full mt-2 p-3 rounded-xl border" placeholder="your@email.com" />
      </div>
      <div>
        <label className="block text-sm text-slate-600">Пароль</label>
        <input name="password" type="password" className="w-full mt-2 p-3 rounded-xl border" placeholder="••••••••" />
      </div>
      <button type="submit" className="btn-primary w-full">Войти</button>
      <div className="text-center text-sm text-slate-500">
        Нет аккаунта? <button type="button" className="text-brand underline" onClick={() => { const m = modal; if (m) m.show(<div>Форма регистрации</div>, 'Регистрация'); }}>Зарегистрироваться</button>
      </div>
    </form>
  )
}
