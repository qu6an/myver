// src/app/dashboard/components/Topbar.tsx
export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-4 lg:px-6 py-4 bg-white border-b shadow-sm">
      <h1 className="text-xl font-semibold">Автосервис года</h1>

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}
