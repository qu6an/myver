"use client";
import { Button } from "@/components/ui/button";
import {
	BarChart3,
	Link,
	Package,
	Plus,
	Settings,
	ShoppingCart,
	Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const pathname = usePathname();

	const navigation = [
		{ name: "Обзор", href: "/shop/admin", icon: BarChart3 },
		{ name: "Товары", href: "/shop/admin/products", icon: Package },
		{ name: "Заказы", href: "/shop/admin/orders", icon: ShoppingCart },
		{ name: "Пользователи", href: "/shop/admin/users", icon: Users },
		{ name: "Настройки", href: "/shop/admin/settings", icon: Settings },
	];
	return (
		<div className='w-64 space-y-6'>
			<div className='bg-white rounded-lg shadow-sm p-6'>
				<h3 className='text-lg font-semibold text-gray-900 mb-4'>
					Управление
				</h3>
				<nav className='space-y-2'>
					{navigation.map((item) => {
						const Icon = item.icon;
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
									isActive
										? "bg-blue-50 text-blue-700"
										: "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
								}`}
							>
								<Icon className='h-5 w-5' />
								<span>{item.name}</span>
							</Link>
						);
					})}
				</nav>
			</div>

			{/* Quick Actions */}
			<div className='bg-white rounded-lg shadow-sm p-6'>
				<h3 className='text-lg font-semibold text-gray-900 mb-4'>
					Быстрые действия
				</h3>
				<div className='space-y-2'>
					<Button className='w-full justify-start' asChild>
						<Link href='/shop/admin/products/create'>
							<Plus className='h-4 w-4 mr-2' />
							Добавить товар
						</Link>
					</Button>
					<Button
						variant='outline'
						className='w-full justify-start bg-transparent'
						asChild
					>
						<Link href='/shop/admin/orders'>
							<ShoppingCart className='h-4 w-4 mr-2' />
							Просмотр заказов
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
