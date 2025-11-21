"use client";

import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "../../components/ui/progress";
import {
	Search,
	Filter,
	Star,
	Clock,
	Users,
	Play,
	BookOpen,
	Award,
	TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
	const myCourses = [
		{
			id: 1,
			title: "Диагностика современных двигателей",
			instructor: "Алексей Морозов",
			progress: 65,
			duration: "4 часа",
			status: "В процессе",
			image: "/car-engine-diagnostics.png",
		},
		{
			id: 2,
			title: "Электронные системы автомобиля",
			instructor: "Мария Волкова",
			progress: 30,
			duration: "6 часов",
			status: "В процессе",
			image: "/car-electronics-systems.png",
		},
		{
			id: 6,
			title: "Основы автосервиса",
			instructor: "Петр Иванов",
			progress: 100,
			duration: "3 часа",
			status: "Завершен",
			image: "/automotive-service-basics.png",
		},
	];

	const allCourses = [
		{
			id: 3,
			title: "Гибридные силовые установки",
			instructor: "Дмитрий Козлов",
			rating: 4.8,
			students: 234,
			duration: "8 часов",
			level: "Продвинутый",
			price: "Бесплатно",
			category: "Двигатели",
			image: "/hybrid-car-engine.png",
		},
		{
			id: 4,
			title: "Кузовной ремонт и покраска",
			instructor: "Сергей Петров",
			rating: 4.9,
			students: 189,
			duration: "12 часов",
			level: "Средний",
			price: "2,500 ₽",
			category: "Кузовные работы",
			image: "/car-body-repair-painting.png",
		},
		{
			id: 5,
			title: "Работа с клиентами в автосервисе",
			instructor: "Елена Смирнова",
			rating: 4.7,
			students: 156,
			duration: "3 часа",
			level: "Начальный",
			price: "Бесплатно",
			category: "Менеджмент",
			image: "/customer-service-automotive.png",
		},
		{
			id: 7,
			title: "Диагностика тормозных систем",
			instructor: "Андрей Соколов",
			rating: 4.6,
			students: 98,
			duration: "5 часов",
			level: "Средний",
			price: "1,800 ₽",
			category: "Тормозные системы",
			image: "/car-brake-system-diagnostics.png",
		},
		{
			id: 8,
			title: "Современные системы кондиционирования",
			instructor: "Ольга Федорова",
			rating: 4.5,
			students: 67,
			duration: "4 часа",
			level: "Средний",
			price: "2,000 ₽",
			category: "Климат-контроль",
			image: "/car-air-conditioning-system.png",
		},
	];

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>Курсы</h1>
				<p className='text-gray-600'>
					Изучайте новые технологии и развивайте профессиональные
					навыки
				</p>
			</div>

			<Tabs defaultValue='my-courses' className='space-y-6'>
				<TabsList>
					<TabsTrigger value='my-courses'>Мои курсы</TabsTrigger>
					<TabsTrigger value='catalog'>Каталог курсов</TabsTrigger>
				</TabsList>

				<TabsContent value='my-courses' className='space-y-6'>
					{/* My Courses Stats */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									Активные курсы
								</CardTitle>
								<BookOpen className='h-4 w-4 text-blue-500' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>2</div>
								<p className='text-xs text-muted-foreground'>
									В процессе изучения
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									Завершено
								</CardTitle>
								<Award className='h-4 w-4 text-green-500' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>1</div>
								<p className='text-xs text-muted-foreground'>
									Получены сертификаты
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									Общий прогресс
								</CardTitle>
								<TrendingUp className='h-4 w-4 text-purple-500' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>65%</div>
								<p className='text-xs text-muted-foreground'>
									Средний по всем курсам
								</p>
							</CardContent>
						</Card>
					</div>

					{/* My Courses List */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{myCourses.map((course) => (
							<Card
								key={course.id}
								className='hover:shadow-lg transition-shadow'
							>
								<CardHeader className='pb-3'>
									<img
										src={course.image || "/placeholder.svg"}
										alt={course.title}
										className='w-full h-32 object-cover rounded-lg mb-3'
									/>
									<div className='flex items-center justify-between'>
										<Badge
											variant={
												course.status === "Завершен"
													? "default"
													: "secondary"
											}
										>
											{course.status}
										</Badge>
										<div className='text-sm text-gray-500'>
											<Clock className='h-4 w-4 inline mr-1' />
											{course.duration}
										</div>
									</div>
									<CardTitle className='text-lg'>
										{course.title}
									</CardTitle>
									<CardDescription>
										Преподаватель: {course.instructor}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-3'>
										<div>
											<div className='flex items-center justify-between text-sm mb-1'>
												<span>Прогресс</span>
												<span>{course.progress}%</span>
											</div>
											<Progress
												value={course.progress}
												className='h-2'
											/>
										</div>
										<Button className='w-full' asChild>
											<Link
												href={`/academy/courses/${course.id}`}
											>
												{course.status ===
												"Завершен" ? (
													<>
														<Award className='h-4 w-4 mr-2' />
														Просмотреть сертификат
													</>
												) : (
													<>
														<Play className='h-4 w-4 mr-2' />
														Продолжить
													</>
												)}
											</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value='catalog' className='space-y-6'>
					{/* Search and Filters */}
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='flex-1'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
								<Input
									placeholder='Поиск курсов...'
									className='pl-10'
								/>
							</div>
						</div>
						<div className='flex gap-2'>
							<Select>
								<SelectTrigger className='w-[180px]'>
									<SelectValue placeholder='Категория' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>
										Все категории
									</SelectItem>
									<SelectItem value='engines'>
										Двигатели
									</SelectItem>
									<SelectItem value='body'>
										Кузовные работы
									</SelectItem>
									<SelectItem value='management'>
										Менеджмент
									</SelectItem>
									<SelectItem value='brakes'>
										Тормозные системы
									</SelectItem>
									<SelectItem value='climate'>
										Климат-контроль
									</SelectItem>
								</SelectContent>
							</Select>
							<Select>
								<SelectTrigger className='w-[180px]'>
									<SelectValue placeholder='Уровень' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>
										Все уровни
									</SelectItem>
									<SelectItem value='beginner'>
										Начальный
									</SelectItem>
									<SelectItem value='intermediate'>
										Средний
									</SelectItem>
									<SelectItem value='advanced'>
										Продвинутый
									</SelectItem>
								</SelectContent>
							</Select>
							<Button variant='outline'>
								<Filter className='h-4 w-4 mr-2' />
								Фильтры
							</Button>
						</div>
					</div>

					{/* Course Catalog */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{allCourses.map((course) => (
							<Card
								key={course.id}
								className='hover:shadow-lg transition-shadow'
							>
								<CardHeader className='pb-3'>
									<img
										src={course.image || "/placeholder.svg"}
										alt={course.title}
										className='w-full h-32 object-cover rounded-lg mb-3'
									/>
									<div className='flex items-center justify-between'>
										<Badge variant='outline'>
											{course.category}
										</Badge>
										<Badge variant='secondary'>
											{course.level}
										</Badge>
									</div>
									<CardTitle className='text-lg'>
										{course.title}
									</CardTitle>
									<CardDescription>
										Преподаватель: {course.instructor}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-3'>
										<div className='flex items-center justify-between text-sm'>
											<div className='flex items-center space-x-4'>
												<div className='flex items-center'>
													<Star className='h-4 w-4 text-yellow-500 mr-1' />
													<span>{course.rating}</span>
												</div>
												<div className='flex items-center'>
													<Users className='h-4 w-4 text-gray-500 mr-1' />
													<span>
														{course.students}
													</span>
												</div>
											</div>
											<div className='text-gray-500'>
												<Clock className='h-4 w-4 inline mr-1' />
												{course.duration}
											</div>
										</div>
										<div className='flex items-center justify-between'>
											<div className='font-semibold text-green-600'>
												{course.price}
											</div>
											<Button size='sm' asChild>
												<Link
													href={`/academy/courses/${course.id}`}
												>
													Начать курс
												</Link>
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
