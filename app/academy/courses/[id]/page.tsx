"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { Separator } from "../../../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Award,
	BookOpen,
	ChevronRight,
	Clock,
	Download,
	FileText,
	MessageSquare,
	Play,
	Star,
	Users,
	Video,
} from "lucide-react";
import { useParams } from "next/navigation";

export default function CoursePage() {
	const params = useParams();
	const courseId = params.id;

	// Mock course data - в реальном приложении будет загружаться по ID
	const course = {
		id: courseId,
		title: "Диагностика современных двигателей",
		instructor: {
			name: "Алексей Морозов",
			avatar: "/male-instructor.png",
			bio: "Эксперт по диагностике двигателей с 15-летним опытом работы в автосервисе",
			rating: 4.9,
		},
		description:
			"Комплексный курс по диагностике современных двигателей внутреннего сгорания. Изучите принципы работы, основные неисправности и методы их устранения.",
		duration: "4 часа",
		level: "Средний",
		students: 234,
		rating: 4.8,
		price: "Бесплатно",
		progress: 65,
		image: "/car-engine-diagnostics-course.png",
		category: "Двигатели",
		skills: [
			"Диагностика двигателя",
			"Работа с OBD-II",
			"Анализ параметров",
			"Поиск неисправностей",
		],
		requirements: [
			"Базовые знания устройства автомобиля",
			"Опыт работы в автосервисе от 1 года",
		],
	};

	const lessons = [
		{
			id: 1,
			title: "Введение в диагностику двигателей",
			type: "video",
			duration: "15 мин",
			completed: true,
		},
		{
			id: 2,
			title: "Основные системы двигателя",
			type: "video",
			duration: "25 мин",
			completed: true,
		},
		{
			id: 3,
			title: "Системы впрыска топлива",
			type: "video",
			duration: "30 мин",
			completed: true,
			current: true,
		},
		{
			id: 4,
			title: "Диагностическое оборудование",
			type: "video",
			duration: "20 мин",
			completed: false,
		},
		{
			id: 5,
			title: "Практическое задание",
			type: "assignment",
			duration: "45 мин",
			completed: false,
		},
		{
			id: 6,
			title: "Тест по материалам курса",
			type: "test",
			duration: "30 мин",
			completed: false,
		},
	];

	const materials = [
		{
			title: "Схемы систем впрыска",
			type: "PDF",
			size: "2.3 MB",
		},
		{
			title: "Коды ошибок двигателей",
			type: "PDF",
			size: "1.8 MB",
		},
		{
			title: "Презентация курса",
			type: "PPTX",
			size: "5.2 MB",
		},
	];

	const reviews = [
		{
			id: 1,
			author: "Михаил Петров",
			rating: 5,
			date: "2 дня назад",
			text: "Отличный курс! Очень подробно разобраны все аспекты диагностики. Рекомендую всем мастерам.",
		},
		{
			id: 2,
			author: "Анна Сидорова",
			rating: 4,
			date: "1 неделю назад",
			text: "Хороший материал, но хотелось бы больше практических примеров.",
		},
	];

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "video":
				return <Video className='h-4 w-4' />;
			case "assignment":
				return <FileText className='h-4 w-4' />;
			case "test":
				return <Award className='h-4 w-4' />;
			default:
				return <BookOpen className='h-4 w-4' />;
		}
	};

	const getTypeLabel = (type: string) => {
		switch (type) {
			case "video":
				return "Видео";
			case "assignment":
				return "Задание";
			case "test":
				return "Тест";
			default:
				return "Урок";
		}
	};

	return (
		<div className='space-y-6'>
			{/* Course Header */}
			<div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
				<div className='lg:col-span-2'>
					<img
						src={course.image || "/placeholder.svg"}
						alt={course.title}
						className='mb-6 h-64 w-full rounded-lg object-cover'
					/>
					<div className='space-y-4'>
						<div className='flex items-center space-x-2'>
							<Badge variant='outline'>{course.category}</Badge>
							<Badge variant='secondary'>{course.level}</Badge>
						</div>
						<h1 className='text-3xl font-bold text-gray-900'>
							{course.title}
						</h1>
						<p className='text-lg text-gray-600'>
							{course.description}
						</p>

						<div className='flex items-center space-x-6 text-sm text-gray-500'>
							<div className='flex items-center'>
								<Clock className='mr-1 h-4 w-4' />
								{course.duration}
							</div>
							<div className='flex items-center'>
								<Users className='mr-1 h-4 w-4' />
								{course.students} студентов
							</div>
							<div className='flex items-center'>
								<Star className='mr-1 h-4 w-4 text-yellow-500' />
								{course.rating}
							</div>
						</div>

						{/* Progress */}
						<div className='rounded-lg bg-gray-50 p-4'>
							<div className='mb-2 flex items-center justify-between'>
								<span className='text-sm font-medium'>
									Прогресс курса
								</span>
								<span className='text-sm text-gray-600'>
									{course.progress}%
								</span>
							</div>
							<Progress value={course.progress} className='h-2' />
						</div>
					</div>
				</div>

				<div className='space-y-6'>
					{/* Instructor */}
					<Card>
						<CardHeader>
							<CardTitle>Преподаватель</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='mb-3 flex items-center space-x-3'>
								<Avatar>
									<AvatarImage
										src={
											course.instructor.avatar ||
											"/placeholder.svg"
										}
										alt={course.instructor.name}
									/>
									<AvatarFallback>АМ</AvatarFallback>
								</Avatar>
								<div>
									<p className='font-medium'>
										{course.instructor.name}
									</p>
									<div className='flex items-center'>
										<Star className='mr-1 h-4 w-4 text-yellow-500' />
										<span className='text-sm'>
											{course.instructor.rating}
										</span>
									</div>
								</div>
							</div>
							<p className='text-sm text-gray-600'>
								{course.instructor.bio}
							</p>
						</CardContent>
					</Card>

					{/* Course Info */}
					<Card>
						<CardHeader>
							<CardTitle>Информация о курсе</CardTitle>
						</CardHeader>
						<CardContent className='space-y-3'>
							<div>
								<h4 className='mb-2 font-medium'>
									Что вы изучите:
								</h4>
								<ul className='space-y-1'>
									{course.skills.map((skill, index) => (
										<li
											key={index}
											className='flex items-center text-sm text-gray-600'
										>
											<ChevronRight className='mr-1 h-3 w-3' />
											{skill}
										</li>
									))}
								</ul>
							</div>
							<Separator />
							<div>
								<h4 className='mb-2 font-medium'>
									Требования:
								</h4>
								<ul className='space-y-1'>
									{course.requirements.map((req, index) => (
										<li
											key={index}
											className='flex items-center text-sm text-gray-600'
										>
											<ChevronRight className='mr-1 h-3 w-3' />
											{req}
										</li>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Course Content */}
			<Tabs defaultValue='lessons' className='space-y-6'>
				<TabsList>
					<TabsTrigger value='lessons'>Уроки</TabsTrigger>
					<TabsTrigger value='materials'>Материалы</TabsTrigger>
					<TabsTrigger value='reviews'>Отзывы</TabsTrigger>
				</TabsList>

				<TabsContent value='lessons'>
					<Card>
						<CardHeader>
							<CardTitle>Содержание курса</CardTitle>
							<CardDescription>
								{lessons.length} уроков • {course.duration}{" "}
								общая продолжительность
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-2'>
								{lessons.map((lesson, index) => (
									<div
										key={lesson.id}
										className={`flex items-center justify-between rounded-lg border p-3 ${
											lesson.current
												? "border-blue-200 bg-blue-50"
												: "hover:bg-gray-50"
										}`}
									>
										<div className='flex items-center space-x-3'>
											<div
												className={`rounded p-2 ${
													lesson.completed
														? "bg-green-100 text-green-600"
														: lesson.current
														? "bg-blue-100 text-blue-600"
														: "bg-gray-100 text-gray-600"
												}`}
											>
												{getTypeIcon(lesson.type)}
											</div>
											<div>
												<p className='font-medium'>
													{lesson.title}
												</p>
												<div className='flex items-center space-x-2 text-sm text-gray-500'>
													<span>
														{getTypeLabel(
															lesson.type
														)}
													</span>
													<span>•</span>
													<span>
														{lesson.duration}
													</span>
												</div>
											</div>
										</div>
										<div className='flex items-center space-x-2'>
											{lesson.completed && (
												<Badge
													variant='default'
													className='bg-green-100 text-green-800'
												>
													Завершено
												</Badge>
											)}
											{lesson.current && (
												<Button size='sm'>
													<Play className='mr-1 h-4 w-4' />
													Продолжить
												</Button>
											)}
											{!lesson.completed &&
												!lesson.current && (
													<Button
														size='sm'
														variant='outline'
													>
														Начать
													</Button>
												)}
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='materials'>
					<Card>
						<CardHeader>
							<CardTitle>Учебные материалы</CardTitle>
							<CardDescription>
								Дополнительные материалы для изучения
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-3'>
								{materials.map((material, index) => (
									<div
										key={index}
										className='flex items-center justify-between rounded-lg border p-3'
									>
										<div className='flex items-center space-x-3'>
											<div className='rounded bg-blue-100 p-2 text-blue-600'>
												<FileText className='h-4 w-4' />
											</div>
											<div>
												<p className='font-medium'>
													{material.title}
												</p>
												<p className='text-sm text-gray-500'>
													{material.type} •{" "}
													{material.size}
												</p>
											</div>
										</div>
										<Button size='sm' variant='outline'>
											<Download className='mr-1 h-4 w-4' />
											Скачать
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='reviews'>
					<Card>
						<CardHeader>
							<CardTitle>Отзывы студентов</CardTitle>
							<CardDescription>
								Средняя оценка: {course.rating} из 5 (
								{course.students} отзывов)
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								{reviews.map((review) => (
									<div
										key={review.id}
										className='border-b pb-4 last:border-b-0'
									>
										<div className='mb-2 flex items-center justify-between'>
											<div className='flex items-center space-x-2'>
												<p className='font-medium'>
													{review.author}
												</p>
												<div className='flex items-center'>
													{[...Array(5)].map(
														(_, i) => (
															<Star
																key={i}
																className={`h-4 w-4 ${
																	i <
																	review.rating
																		? "fill-current text-yellow-500"
																		: "text-gray-300"
																}`}
															/>
														)
													)}
												</div>
											</div>
											<span className='text-sm text-gray-500'>
												{review.date}
											</span>
										</div>
										<p className='text-gray-600'>
											{review.text}
										</p>
									</div>
								))}
								<Button
									variant='outline'
									className='w-full bg-transparent'
								>
									<MessageSquare className='mr-2 h-4 w-4' />
									Оставить отзыв
								</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
