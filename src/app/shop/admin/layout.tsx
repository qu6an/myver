import type React from "react";
import Sidebar from "./components/Sidebar";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='flex gap-8'>
					{/* Sidebar */}
					<Sidebar />

					{/* Main Content */}
					<div className='flex-1'>{children}</div>
				</div>
			</div>
		</div>
	);
}
