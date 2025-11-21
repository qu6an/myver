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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Award,
	BookOpen,
	Calendar,
	Filter,
	Heart,
	Package,
	Search,
	ShoppingCart,
	SlidersHorizontal,
	Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function CatalogContent() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [priceRange, setPriceRange] = useState("all");
	const [sortBy, setSortBy] = useState("popular");

	const products = [
		{
			id: 1,
			title: "Диагностика двигателя: Полный курс",
			description:
				"Комплексный курс по диагностике современных двигателей с практическими заданиями",
			price: 4990,
			originalPrice: 6990,
			category: "courses",
			categoryName: "Онлайн-курс",
			rating: 4.8,
			reviews: 156,
			image: "/car-engine-diagnostics.png",
			badge: "Хит продаж",
			instructor: "Алексей Морозов",
			duration: "12 часов",
			students: 1250,
		},
		{
			id: 2,
			title: "Электронные системы автомобиля",
			description:
				"Изучение современных электронных систем управления автомобилем",
			price: 3490,
			category: "courses",
			categoryName: "Онлайн-курс",
			rating: 4.9,
			reviews: 89,
			image: "/car-electronics-systems.png",
			badge: "Новинка",
			instructor: "Мария Петрова",
			duration: "8 часов",
			students: 567,
		},
		{
			id: 3,
			title: "Воркшоп: Гибридные двигатели",
			description:
				"Практический семинар по обслуживанию гибридных систем",
			price: 12000,
			category: "events",
			categoryName: "Мероприятие",
			rating: 5.0,
			reviews: 24,
			image: "/hybrid-car-engine.png",
			badge: "Очное обучение",
			date: "15 марта 2024",
			location: "Москва",
			duration: "2 дня",
		},
		{
			id: 4,
			title: "Сертификация мастера-диагноста",
			description: "Официальная сертификация по диагностике автомобилей",
			price: 8500,
			category: "certifications",
			categoryName: "Сертификация",
			rating: 4.7,
			reviews: 45,
			image: "/automotive-certification-diploma.png",
			badge: "Официальный сертификат",
			duration: "Экзамен 3 часа",
		},
		{
			id: 5,
			title: "Справочник по запчастям",
			description:
				"Полный справочник по автомобильным запчастям и их применению",
			price: 1990,
			category: "materials",
			categoryName: "Материалы",
			rating: 4.6,
			reviews: 78,
			image: "/automotive-parts-manual-book.png",
			badge: "Цифровая версия",
			pages: "450 страниц",
		},
		{
			id: 6,
			title: "Основы кузовного ремонта",
			description: "Базовый курс по восстановлению кузова автомобиля",
			price: 5490,
			category: "courses",
			categoryName: "Онлайн-курс",
			rating: 4.5,
			reviews: 123,
			image: "/car-body-repair-course.png",
			instructor: "Дмитрий Козлов",
			duration: "15 часов",
			students: 890,
		},
	];

	const categories = [
		{ value: "all", label: "Все категории", icon: SlidersHorizontal },
		{ value: "courses", label: "Онлайн-курсы", icon: BookOpen },
		{ value: "events", label: "Мероприятия", icon: Calendar },
		{ value: "certifications", label: "Сертификации", icon: Award },
		{ value: "materials", label: "Материалы", icon: Package },
	];

	const filteredProducts = products.filter(
		(product) =>
			selectedCategory === "all" || product.category === selectedCategory
	);
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Page Header */}
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-4'>
					Каталог товаров
				</h1>
				<p className='text-gray-600'>
					Найдите подходящие курсы, мероприятия и материалы для
					профессионального развития
				</p>
			</div>

			<div className='flex flex-col lg:flex-row gap-8'>
				{/* Sidebar Filters */}
				<div className='lg:w-64 space-y-6'>
					<Card>
						<CardHeader>
							<CardTitle className='text-lg flex items-center'>
								<Filter className='h-5 w-5 mr-2' />
								Фильтры
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							{/* Search */}
							<div>
								<label className='text-sm font-medium text-gray-700 mb-2 block'>
									Поиск
								</label>
								<div className='relative'>
									<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
									<Input
										placeholder='Поиск товаров...'
										className='pl-10'
									/>
								</div>
							</div>

							{/* Categories */}
							<div>
								<label className='text-sm font-medium text-gray-700 mb-3 block'>
									Категория
								</label>
								<div className='space-y-2'>
									{categories.map((category) => {
										const Icon = category.icon;
										return (
											<div
												key={category.value}
												className='flex items-center space-x-2'
											>
												<Checkbox
													id={category.value}
													checked={
														selectedCategory ===
														category.value
													}
													onCheckedChange={() =>
														setSelectedCategory(
															category.value
														)
													}
												/>
												<label
													htmlFor={category.value}
													className='text-sm text-gray-700 flex items-center cursor-pointer'
												>
													<Icon className='h-4 w-4 mr-2' />
													{category.label}
												</label>
											</div>
										);
									})}
								</div>
							</div>

							{/* Price Range */}
							<div>
								<label className='text-sm font-medium text-gray-700 mb-3 block'>
									Цена
								</label>
								<Select
									value={priceRange}
									onValueChange={setPriceRange}
								>
									<SelectTrigger>
										<SelectValue placeholder='Выберите диапазон' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>
											Любая цена
										</SelectItem>
										<SelectItem value='0-2000'>
											До 2,000 ₽
										</SelectItem>
										<SelectItem value='2000-5000'>
											2,000 - 5,000 ₽
										</SelectItem>
										<SelectItem value='5000-10000'>
											5,000 - 10,000 ₽
										</SelectItem>
										<SelectItem value='10000+'>
											От 10,000 ₽
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Rating */}
							<div>
								<label className='text-sm font-medium text-gray-700 mb-3 block'>
									Рейтинг
								</label>
								<div className='space-y-2'>
									{[5, 4, 3].map((rating) => (
										<div
											key={rating}
											className='flex items-center space-x-2'
										>
											<Checkbox id={`rating-${rating}`} />
											<label
												htmlFor={`rating-${rating}`}
												className='text-sm text-gray-700 flex items-center cursor-pointer'
											>
												<div className='flex items-center mr-2'>
													{[...Array(rating)].map(
														(_, i) => (
															<Star
																key={i}
																className='h-3 w-3 fill-yellow-400 text-yellow-400'
															/>
														)
													)}
												</div>
												от {rating}
											</label>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Main Content */}
				<div className='flex-1'>
					{/* Sort and View Options */}
					<div className='flex items-center justify-between mb-6'>
						<p className='text-gray-600'>
							Найдено {filteredProducts.length} товаров
						</p>
						<div className='flex items-center space-x-4'>
							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger className='w-48'>
									<SelectValue placeholder='Сортировка' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='popular'>
										По популярности
									</SelectItem>
									<SelectItem value='price-low'>
										Цена: по возрастанию
									</SelectItem>
									<SelectItem value='price-high'>
										Цена: по убыванию
									</SelectItem>
									<SelectItem value='rating'>
										По рейтингу
									</SelectItem>
									<SelectItem value='newest'>
										Сначала новые
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Products Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
						{filteredProducts.map((product) => (
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
											{product.categoryName}
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

									<div className='space-y-1 text-sm text-gray-600'>
										{product.instructor && (
											<p className='text-blue-600'>
												👨‍🏫 {product.instructor}
											</p>
										)}
										{product.duration && (
											<p>⏱️ {product.duration}</p>
										)}
										{product.students && (
											<p>
												👥 {product.students} студентов
											</p>
										)}
										{product.date && (
											<p>
												📅 {product.date} • 📍{" "}
												{product.location}
											</p>
										)}
										{product.pages && (
											<p>📄 {product.pages}</p>
										)}
									</div>
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

					{/* Pagination */}
					<div className='flex justify-center mt-12'>
						<div className='flex items-center space-x-2'>
							<Button variant='outline' disabled>
								Предыдущая
							</Button>
							<Button variant='default'>1</Button>
							<Button variant='outline'>2</Button>
							<Button variant='outline'>3</Button>
							<Button variant='outline'>Следующая</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
