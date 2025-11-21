import Sidebar from '@/components/Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
