"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    ArrowRight,
    Award,
    BookOpen,
    Calendar,
    Filter,
    Heart,
    Package,
    Search,
    ShoppingCart,
    Star,
    TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function ShopContent() {
	const featuredProducts = [
		{
			id: 1,
			title: "Диагностика двигателя: Полный курс",
			description:
				"Комплексный курс по диагностике современных двигателей",
			price: 4990,
			originalPrice: 6990,
			category: "Онлайн-курс",
			rating: 4.8,
			reviews: 156,
			image: "/car-engine-diagnostics.png",
			badge: "Хит продаж",
			instructor: "Алексей Морозов",
		},
		{
			id: 2,
			title: "Электронные системы автомобиля",
			description: "Изучение современных электронных систем управления",
			price: 3490,
			category: "Онлайн-курс",
			rating: 4.9,
			reviews: 89,
			image: "/car-electronics-systems.png",
			badge: "Новинка",
			instructor: "Мария Петрова",
		},
		{
			id: 3,
			title: "Воркшоп: Гибридные двигатели",
			description:
				"Практический семинар по обслуживанию гибридных систем",
			price: 12000,
			category: "Мероприятие",
			rating: 5.0,
			reviews: 24,
			image: "/hybrid-car-engine.png",
			badge: "Очное обучение",
			date: "15 марта 2024",
			location: "Москва",
		},
	];

	const categories = [
		{
			name: "Онлайн-курсы",
			count: 45,
			icon: BookOpen,
			color: "bg-blue-500",
			href: "/shop/catalog?category=courses",
		},
		{
			name: "Мероприятия",
			count: 12,
			icon: Calendar,
			color: "bg-green-500",
			href: "/shop/catalog?category=events",
		},
		{
			name: "Сертификации",
			count: 8,
			icon: Award,
			color: "bg-purple-500",
			href: "/shop/catalog?category=certifications",
		},
		{
			name: "Материалы",
			count: 23,
			icon: Package,
			color: "bg-orange-500",
			href: "/shop/catalog?category=materials",
		},
	];

	const stats = [
		{ label: "Активных курсов", value: "45+" },
		{ label: "Довольных клиентов", value: "2,500+" },
		{ label: "Средняя оценка", value: "4.8" },
		{ label: "Сертификатов выдано", value: "1,200+" },
	];
	return (
		<>
			{/* Hero Section */}
			<section className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-5xl font-bold mb-6'>
							Магазин EVERYCAR
						</h1>
						<p className='text-xl mb-8 max-w-2xl mx-auto'>
							Образовательные курсы, мероприятия и материалы для
							профессионального развития в автомобильной сфере
						</p>

						{/* Search Bar */}
						<div className='max-w-2xl mx-auto mb-8'>
							<div className='relative'>
								<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
								<Input
									placeholder='Поиск курсов, мероприятий, материалов...'
									className='pl-12 pr-4 py-3 text-lg bg-white text-gray-900'
								/>
								<Button className='absolute right-2 top-1/2 transform -translate-y-1/2'>
									Найти
								</Button>
							</div>
						</div>

						{/* Stats */}
						<div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
							{stats.map((stat, index) => (
								<div key={index} className='text-center'>
									<div className='text-2xl md:text-3xl font-bold'>
										{stat.value}
									</div>
									<div className='text-blue-100'>
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Categories */}
				<section className='mb-16'>
					<div className='flex items-center justify-between mb-8'>
						<h2 className='text-3xl font-bold text-gray-900'>
							Категории товаров
						</h2>
						<Button variant='outline' asChild>
							<Link href='/shop/catalog'>
								Все товары
								<ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{categories.map((category, index) => {
							const Icon = category.icon;
							return (
								<Card
									key={index}
									className='hover:shadow-lg transition-shadow cursor-pointer'
								>
									<Link href={category.href}>
										<CardHeader className='text-center'>
											<div
												className={`mx-auto p-4 rounded-full ${category.color} w-16 h-16 flex items-center justify-center mb-4`}
											>
												<Icon className='h-8 w-8 text-white' />
											</div>
											<CardTitle className='text-lg'>
												{category.name}
											</CardTitle>
											<CardDescription>
												{category.count} товаров
											</CardDescription>
										</CardHeader>
									</Link>
								</Card>
							);
						})}
					</div>
				</section>

				{/* Featured Products */}
				<section className='mb-16'>
					<div className='flex items-center justify-between mb-8'>
						<h2 className='text-3xl font-bold text-gray-900'>
							Рекомендуемые товары
						</h2>
						<div className='flex items-center space-x-4'>
							<Button variant='outline' size='sm'>
								<Filter className='h-4 w-4 mr-2' />
								Фильтры
							</Button>
							<Button variant='outline' asChild>
								<Link href='/shop/catalog'>Все товары</Link>
							</Button>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{featuredProducts.map((product) => (
							<Card
								key={product.id}
								className='hover:shadow-xl transition-shadow duration-300 overflow-hidden'
							>
								<div className='relative'>
									<Image
										src={
											product.image || "/placeholder.svg"
										}
										alt={product.title}
										width={400}
										height={240}
										className='w-full h-48 object-cover'
									/>
									<div className='absolute top-4 left-4'>
										<Badge
											variant='secondary'
											className='bg-white/90 text-gray-900'
										>
											{product.badge}
										</Badge>
									</div>
									<Button
										variant='ghost'
										size='sm'
										className='absolute top-4 right-4 bg-white/90 hover:bg-white'
									>
										<Heart className='h-4 w-4' />
									</Button>
								</div>

								<CardHeader>
									<div className='flex items-center justify-between mb-2'>
										<Badge variant='outline'>
											{product.category}
										</Badge>
										<div className='flex items-center space-x-1'>
											<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
											<span className='text-sm font-medium'>
												{product.rating}
											</span>
											<span className='text-sm text-gray-500'>
												({product.reviews})
											</span>
										</div>
									</div>
									<CardTitle className='text-lg line-clamp-2'>
										{product.title}
									</CardTitle>
									<CardDescription className='line-clamp-2'>
										{product.description}
									</CardDescription>

									{product.instructor && (
										<p className='text-sm text-blue-600'>
											Преподаватель: {product.instructor}
										</p>
									)}

									{product.date && (
										<div className='flex items-center space-x-4 text-sm text-gray-600'>
											<span>📅 {product.date}</span>
											<span>📍 {product.location}</span>
										</div>
									)}
								</CardHeader>

								<CardContent>
									<div className='flex items-center justify-between mb-4'>
										<div className='flex items-center space-x-2'>
											<span className='text-2xl font-bold text-gray-900'>
												{product.price.toLocaleString()}{" "}
												₽
											</span>
											{product.originalPrice && (
												<span className='text-lg text-gray-500 line-through'>
													{product.originalPrice.toLocaleString()}{" "}
													₽
												</span>
											)}
										</div>
									</div>

									<div className='flex space-x-2'>
										<Button className='flex-1' asChild>
											<Link
												href={`/shop/product/${product.id}`}
											>
												Подробнее
											</Link>
										</Button>
										<Button variant='outline' size='icon'>
											<ShoppingCart className='h-4 w-4' />
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				{/* Benefits */}
				<section className='bg-white rounded-lg p-8 shadow-sm'>
					<h2 className='text-3xl font-bold text-gray-900 text-center mb-8'>
						Почему выбирают наш магазин
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='text-center'>
							<div className='bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
								<Award className='h-8 w-8 text-blue-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								Качественное обучение
							</h3>
							<p className='text-gray-600'>
								Курсы от ведущих экспертов автомобильной
								индустрии
							</p>
						</div>

						<div className='text-center'>
							<div className='bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
								<TrendingUp className='h-8 w-8 text-green-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								Карьерный рост
							</h3>
							<p className='text-gray-600'>
								Сертификаты и навыки для профессионального
								развития
							</p>
						</div>

						<div className='text-center'>
							<div className='bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
								<ShoppingCart className='h-8 w-8 text-purple-600' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								Удобные покупки
							</h3>
							<p className='text-gray-600'>
								Простая оплата, быстрый доступ к материалам
							</p>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
