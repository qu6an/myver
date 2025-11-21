import { Home } from "lucide-react";
import Link from "next/link";

export default function BreadCrumbs() {
	return (
		<div className='bg-white border-b'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3'>
				<nav className='flex items-center space-x-2 text-sm text-gray-600'>
					<Link href='/dashboard' className='hover:text-blue-600'>
						<Home className='h-4 w-4' />
					</Link>
					<span>/</span>
					<Link href='/shop' className='hover:text-blue-600'>
						Магазин
					</Link>
				</nav>
			</div>
		</div>
	);
}
