"use client";

import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../../components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../../../../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DollarSign,
	Edit,
	Eye,
	Filter,
	MoreHorizontal,
	Package,
	Plus,
	Search,
	ShoppingCart,
	Trash2,
	TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function PoductsContent() {
	const stats = [
		{
			title: "Всего товаров",
			value: "156",
			change: "+12%",
			icon: Package,
			color: "text-blue-600",
		},
		{
			title: "Активных товаров",
			value: "142",
			change: "+8%",
			icon: TrendingUp,
			color: "text-green-600",
		},
		{
			title: "Продаж за месяц",
			value: "1,234",
			change: "+23%",
			icon: ShoppingCart,
			color: "text-purple-600",
		},
		{
			title: "Выручка",
			value: "₽2,456,789",
			change: "+18%",
			icon: DollarSign,
			color: "text-orange-600",
		},
	];

	const products = [
		{
			id: 1,
			title: "Диагностика двигателя: Полный курс",
			sku: "COURSE-001",
			category: "Онлайн-курс",
			price: 4990,
			status: "active",
			stock: "∞",
			sales: 156,
			image: "/car-engine-diagnostics.png",
			createdAt: "2024-01-15",
		},
		{
			id: 2,
			title: "Электронные системы автомобиля",
			sku: "COURSE-002",
			category: "Онлайн-курс",
			price: 3490,
			status: "active",
			stock: "∞",
			sales: 89,
			image: "/car-electronics-systems.png",
			createdAt: "2024-01-20",
		},
		{
			id: 3,
			title: "Воркшоп: Гибридные двигатели",
			sku: "EVENT-001",
			category: "Мероприятие",
			price: 12000,
			status: "active",
			stock: "15",
			sales: 24,
			image: "/hybrid-car-engine.png",
			createdAt: "2024-02-01",
		},
		{
			id: 4,
			title: "Справочник по запчастям",
			sku: "MATERIAL-001",
			category: "Материалы",
			price: 1990,
			status: "draft",
			stock: "∞",
			sales: 0,
			image: "/automotive-parts-manual-book.png",
			createdAt: "2024-02-10",
		},
	];

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return (
					<Badge className='bg-green-100 text-green-800'>
						Активен
					</Badge>
				);
			case "draft":
				return <Badge variant='secondary'>Черновик</Badge>;
			case "archived":
				return <Badge variant='outline'>Архив</Badge>;
			default:
				return <Badge variant='secondary'>{status}</Badge>;
		}
	};
	return (
		<div className='space-y-8'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold text-gray-900'>
						Управление товарами
					</h1>
					<p className='text-gray-600 mt-2'>
						Создавайте и управляйте товарами в магазине
					</p>
				</div>
				<Button asChild>
					<Link href='/shop/admin/products/create'>
						<Plus className='h-4 w-4 mr-2' />
						Добавить товар
					</Link>
				</Button>
			</div>

			{/* Stats */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{stats.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<Card key={index}>
							<CardContent className='p-6'>
								<div className='flex items-center justify-between'>
									<div>
										<p className='text-sm font-medium text-gray-600'>
											{stat.title}
										</p>
										<p className='text-2xl font-bold text-gray-900'>
											{stat.value}
										</p>
										<p className='text-sm text-green-600'>
											{stat.change} за месяц
										</p>
									</div>
									<div
										className={`p-3 rounded-full bg-gray-50 ${stat.color}`}
									>
										<Icon className='h-6 w-6' />
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Filters and Search */}
			<Card>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<div>
							<CardTitle>Список товаров</CardTitle>
							<CardDescription>
								Управляйте всеми товарами в магазине
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className='flex items-center space-x-4 mb-6'>
						<div className='relative flex-1 max-w-sm'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
							<Input
								placeholder='Поиск товаров...'
								className='pl-10'
							/>
						</div>
						<Select defaultValue='all'>
							<SelectTrigger className='w-48'>
								<SelectValue placeholder='Категория' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>
									Все категории
								</SelectItem>
								<SelectItem value='courses'>
									Онлайн-курсы
								</SelectItem>
								<SelectItem value='events'>
									Мероприятия
								</SelectItem>
								<SelectItem value='certifications'>
									Сертификации
								</SelectItem>
								<SelectItem value='materials'>
									Материалы
								</SelectItem>
							</SelectContent>
						</Select>
						<Select defaultValue='all'>
							<SelectTrigger className='w-32'>
								<SelectValue placeholder='Статус' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Все</SelectItem>
								<SelectItem value='active'>Активные</SelectItem>
								<SelectItem value='draft'>Черновики</SelectItem>
								<SelectItem value='archived'>Архив</SelectItem>
							</SelectContent>
						</Select>
						<Button variant='outline'>
							<Filter className='h-4 w-4 mr-2' />
							Фильтры
						</Button>
					</div>

					{/* Products Table */}
					<div className='rounded-md border'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className='w-12'></TableHead>
									<TableHead>Товар</TableHead>
									<TableHead>SKU</TableHead>
									<TableHead>Категория</TableHead>
									<TableHead>Цена</TableHead>
									<TableHead>Статус</TableHead>
									<TableHead>Остаток</TableHead>
									<TableHead>Продажи</TableHead>
									<TableHead>Дата создания</TableHead>
									<TableHead className='w-12'></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((product) => (
									<TableRow key={product.id}>
										<TableCell>
											<Image
												src={
													product.image ||
													"/placeholder.svg"
												}
												alt={product.title}
												width={40}
												height={40}
												className='rounded object-cover'
											/>
										</TableCell>
										<TableCell>
											<div>
												<p className='font-medium text-gray-900 line-clamp-1'>
													{product.title}
												</p>
												<p className='text-sm text-gray-500'>
													ID: {product.id}
												</p>
											</div>
										</TableCell>
										<TableCell className='font-mono text-sm'>
											{product.sku}
										</TableCell>
										<TableCell>
											<Badge variant='outline'>
												{product.category}
											</Badge>
										</TableCell>
										<TableCell className='font-medium'>
											₽{product.price.toLocaleString()}
										</TableCell>
										<TableCell>
											{getStatusBadge(product.status)}
										</TableCell>
										<TableCell>{product.stock}</TableCell>
										<TableCell>{product.sales}</TableCell>
										<TableCell className='text-sm text-gray-500'>
											{product.createdAt}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant='ghost'
														size='sm'
													>
														<MoreHorizontal className='h-4 w-4' />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuItem asChild>
														<Link
															href={`/shop/product/${product.id}`}
														>
															<Eye className='h-4 w-4 mr-2' />
															Просмотр
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem asChild>
														<Link
															href={`/shop/admin/products/${product.id}/edit`}
														>
															<Edit className='h-4 w-4 mr-2' />
															Редактировать
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem className='text-red-600'>
														<Trash2 className='h-4 w-4 mr-2' />
														Удалить
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					{/* Pagination */}
					<div className='flex items-center justify-between mt-6'>
						<p className='text-sm text-gray-600'>
							Показано 1-4 из 156 товаров
						</p>
						<div className='flex items-center space-x-2'>
							<Button variant='outline' size='sm' disabled>
								Предыдущая
							</Button>
							<Button variant='outline' size='sm'>
								1
							</Button>
							<Button variant='outline' size='sm'>
								2
							</Button>
							<Button variant='outline' size='sm'>
								3
							</Button>
							<Button variant='outline' size='sm'>
								Следующая
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
