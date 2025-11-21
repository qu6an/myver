import { SearchProvider } from "../../contexts/SearchContext";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex h-screen'>
			<aside className='w-max bg-gray-800 text-white'>
				<Sidebar />
			</aside>
			<SearchProvider>
				<main className='flex-1 p-6 overflow-y-auto'>{children}</main>
			</SearchProvider>
		</div>
	);
}
