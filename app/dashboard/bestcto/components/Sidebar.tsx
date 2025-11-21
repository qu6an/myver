// src/app/dashboard/components/Sidebar.tsx
export default function Sidebar() {
  return (
    <aside className="w-64 hidden lg:flex flex-col bg-white border-r shadow-sm p-6">
      <h2 className="text-xl font-bold mb-8">🚗 BestCTO</h2>

      <nav className="space-y-4 text-gray-700">
        <a className="block hover:text-black transition" href="/dashboard">
          📊 Главная
        </a>

        <a className="block hover:text-black transition" href="/dashboard/bestcto">
          🏆 Рейтинг CTO
        </a>

        <a className="block hover:text-black transition" href="#">
          👥 Команда
        </a>

        <a className="block hover:text-black transition" href="#">
          ⚙️ Настройки
        </a>
      </nav>
    </aside>
  );
}
