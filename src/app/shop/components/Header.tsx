"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Badge,
	Bell,
	Car,
	Heart,
	Link,
	Menu,
	Search,
	ShoppingCart,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
	const [cartItems] = useState(3);
	const [wishlistItems] = useState(5);
	return (
		<header className='bg-white shadow-sm border-b sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo and Navigation */}
					<div className='flex items-center space-x-8'>
						<Link
							href='/dashboard'
							className='flex items-center space-x-3'
						>
							<div className='bg-blue-600 p-2 rounded-lg'>
								<Car className='h-6 w-6 text-white' />
							</div>
							<div>
								<h1 className='text-xl font-bold text-gray-900'>
									EVERYCAR
								</h1>
								<p className='text-xs text-gray-500'>Магазин</p>
							</div>
						</Link>

						{/* Navigation Menu */}
						<nav className='hidden md:flex items-center space-x-6'>
							<Link
								href='/shop'
								className='text-gray-700 hover:text-blue-600 font-medium'
							>
								Главная
							</Link>
							<Link
								href='/shop/catalog'
								className='text-gray-700 hover:text-blue-600'
							>
								Каталог
							</Link>
							<Link
								href='/shop/catalog?category=courses'
								className='text-gray-700 hover:text-blue-600'
							>
								Курсы
							</Link>
							<Link
								href='/shop/catalog?category=events'
								className='text-gray-700 hover:text-blue-600'
							>
								Мероприятия
							</Link>
							<Link
								href='/shop/catalog?category=certifications'
								className='text-gray-700 hover:text-blue-600'
							>
								Сертификации
							</Link>
							<Link
								href='/shop/admin/products'
								className='text-gray-700 hover:text-blue-600'
							>
								Администрирование
							</Link>
						</nav>
					</div>

					{/* Right Side Actions */}
					<div className='flex items-center space-x-4'>
						{/* Search */}
						<Button
							variant='ghost'
							size='sm'
							className='hidden md:flex'
						>
							<Search className='h-4 w-4' />
						</Button>

						{/* Wishlist */}
						<Button
							variant='ghost'
							size='sm'
							className='relative'
							asChild
						>
							<Link href='/shop/wishlist'>
								<Heart className='h-4 w-4' />
								{wishlistItems > 0 && (
									<Badge className='absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center'>
										{wishlistItems}
									</Badge>
								)}
							</Link>
						</Button>

						{/* Cart */}
						<Button
							variant='ghost'
							size='sm'
							className='relative'
							asChild
						>
							<Link href='/shop/cart'>
								<ShoppingCart className='h-4 w-4' />
								{cartItems > 0 && (
									<Badge className='absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center'>
										{cartItems}
									</Badge>
								)}
							</Link>
						</Button>

						{/* Notifications */}
						<Button variant='ghost' size='sm'>
							<Bell className='h-4 w-4' />
						</Button>

						{/* User Menu */}
						<div className='flex items-center space-x-3'>
							<Avatar className='h-8 w-8'>
								<AvatarImage
									src='/diverse-user-avatars.png'
									alt='User'
								/>
								<AvatarFallback>ИП</AvatarFallback>
							</Avatar>
							<div className='hidden md:block'>
								<p className='text-sm font-medium text-gray-900'>
									Иван Петров
								</p>
								<p className='text-xs text-gray-500'>
									1,250 баллов
								</p>
							</div>
						</div>

						{/* Mobile Menu */}
						<Button variant='ghost' size='sm' className='md:hidden'>
							<Menu className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div className='md:hidden border-t bg-white px-4 py-2'>
				<nav className='flex items-center space-x-6 overflow-x-auto'>
					<Link
						href='/shop'
						className='text-gray-700 hover:text-blue-600 whitespace-nowrap'
					>
						Главная
					</Link>
					<Link
						href='/shop/catalog'
						className='text-gray-700 hover:text-blue-600 whitespace-nowrap'
					>
						Каталог
					</Link>
					<Link
						href='/shop/catalog?category=courses'
						className='text-gray-700 hover:text-blue-600 whitespace-nowrap'
					>
						Курсы
					</Link>
					<Link
						href='/shop/catalog?category=events'
						className='text-gray-700 hover:text-blue-600 whitespace-nowrap'
					>
						Мероприятия
					</Link>
					<Link
						href='/shop/admin/products'
						className='text-gray-700 hover:text-blue-600 whitespace-nowrap'
					>
						Админ
					</Link>
				</nav>
			</div>
		</header>
	);
}
