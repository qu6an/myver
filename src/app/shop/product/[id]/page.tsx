"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Award,
	CheckCircle,
	Clock,
	Heart,
	MessageCircle,
	Play,
	Share2,
	ShoppingCart,
	Star,
	Users,
} from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";
import ProductImage from "./components/ProductImage";
export type Params = Promise<{ id: string }>;
export default function ProductPage({ params }: { params: Params }) {
	const [quantity, setQuantity] = useState(1);
	const [selectedTab, setSelectedTab] = useState("overview");
	const { id } = use(params);

	// Mock product data - в реальном приложении будет загружаться по ID

	const product = {
		id: id,
		title: "Диагностика двигателя: Полный курс",
		description:
			"Комплексный курс по диагностике современных двигателей с практическими заданиями и реальными кейсами",
		price: 4990,
		originalPrice: 6990,
		category: "Онлайн-курс",
		rating: 4.8,
		reviews: 156,
		students: 1250,
		image: "/car-engine-diagnostics.png",
		badge: "Хит продаж",
		instructor: {
			name: "Алексей Морозов",
			title: "Ведущий специалист по диагностике",
			avatar: "/diverse-user-avatars.png",
			experience: "15+ лет опыта",
			courses: 12,
			rating: 4.9,
		},
		duration: "12 часов",
		lessons: 24,
		language: "Русский",
		level: "Средний",
		certificate: true,
		features: [
			"24 видеоурока в HD качестве",
			"Практические задания",
			"Сертификат о прохождении",
			"Доступ к материалам навсегда",
			"Поддержка преподавателя",
			"Мобильное приложение",
		],
		curriculum: [
			{
				title: "Введение в диагностику",
				lessons: 3,
				duration: "45 мин",
				topics: ["Основы диагностики", "Инструменты", "Безопасность"],
			},
			{
				title: "Системы двигателя",
				lessons: 8,
				duration: "3 часа",
				topics: [
					"Система зажигания",
					"Топливная система",
					"Система охлаждения",
					"Выхлопная система",
				],
			},
			{
				title: "Электронные системы",
				lessons: 6,
				duration: "2.5 часа",
				topics: ["ECU диагностика", "Датчики", "Актуаторы"],
			},
			{
				title: "Практические кейсы",
				lessons: 7,
				duration: "3 часа",
				topics: [
					"Реальные поломки",
					"Диагностика по симптомам",
					"Сложные случаи",
				],
			},
		],
	};

	const reviews = [
		{
			id: 1,
			author: "Михаил Петров",
			avatar: "/diverse-user-avatars.png",
			rating: 5,
			date: "2 недели назад",
			text: "Отличный курс! Очень подробно разобраны все аспекты диагностики. Преподаватель объясняет сложные вещи простым языком.",
			helpful: 12,
		},
		{
			id: 2,
			author: "Анна Сидорова",
			avatar: "/diverse-user-avatars.png",
			rating: 4,
			date: "1 месяц назад",
			text: "Хороший курс для начинающих. Много практических примеров. Единственный минус - хотелось бы больше интерактивных заданий.",
			helpful: 8,
		},
		{
			id: 3,
			author: "Дмитрий Козлов",
			avatar: "/diverse-user-avatars.png",
			rating: 5,
			date: "1 месяц назад",
			text: "Профессиональный подход к обучению. Получил сертификат и сразу применил знания на практике. Рекомендую!",
			helpful: 15,
		},
	];

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Main Content */}
				<div className='lg:col-span-2'>
					{/* Product Images */}
					<ProductImage params={params} product={product} />

					{/* Product Info */}
					<div className='mb-8'>
						<div className='flex items-center space-x-2 mb-4'>
							<Badge variant='outline'>{product.category}</Badge>
							<Badge variant='secondary'>{product.level}</Badge>
						</div>

						<h1 className='text-3xl font-bold text-gray-900 mb-4'>
							{product.title}
						</h1>
						<p className='text-lg text-gray-600 mb-6'>
							{product.description}
						</p>

						<div className='flex items-center space-x-6 mb-6'>
							<div className='flex items-center space-x-1'>
								<Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
								<span className='font-medium'>
									{product.rating}
								</span>
								<span className='text-gray-500'>
									({product.reviews} отзывов)
								</span>
							</div>
							<div className='flex items-center space-x-1'>
								<Users className='h-5 w-5 text-gray-400' />
								<span className='text-gray-600'>
									{product.students} студентов
								</span>
							</div>
							<div className='flex items-center space-x-1'>
								<Clock className='h-5 w-5 text-gray-400' />
								<span className='text-gray-600'>
									{product.duration}
								</span>
							</div>
						</div>

						{/* Instructor */}
						<div className='flex items-center space-x-4 p-4 bg-gray-50 rounded-lg'>
							<Avatar className='h-12 w-12'>
								<AvatarImage
									src={
										product.instructor.avatar ||
										"/placeholder.svg"
									}
									alt={product.instructor.name}
								/>
								<AvatarFallback>АМ</AvatarFallback>
							</Avatar>
							<div>
								<h3 className='font-semibold text-gray-900'>
									{product.instructor.name}
								</h3>
								<p className='text-sm text-gray-600'>
									{product.instructor.title}
								</p>
								<div className='flex items-center space-x-4 text-sm text-gray-500'>
									<span>{product.instructor.experience}</span>
									<span>⭐ {product.instructor.rating}</span>
									<span>
										{product.instructor.courses} курсов
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<Tabs value={selectedTab} onValueChange={setSelectedTab}>
						<TabsList className='grid w-full grid-cols-4'>
							<TabsTrigger value='overview'>Обзор</TabsTrigger>
							<TabsTrigger value='curriculum'>
								Программа
							</TabsTrigger>
							<TabsTrigger value='reviews'>Отзывы</TabsTrigger>
							<TabsTrigger value='instructor'>
								Преподаватель
							</TabsTrigger>
						</TabsList>

						<TabsContent value='overview' className='mt-6'>
							<Card>
								<CardHeader>
									<CardTitle>Что вы изучите</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										{product.features.map(
											(feature, index) => (
												<div
													key={index}
													className='flex items-center space-x-2'
												>
													<CheckCircle className='h-5 w-5 text-green-500' />
													<span className='text-gray-700'>
														{feature}
													</span>
												</div>
											)
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value='curriculum' className='mt-6'>
							<Card>
								<CardHeader>
									<CardTitle>Программа курса</CardTitle>
									<CardDescription>
										{product.lessons} уроков •{" "}
										{product.duration} общая
										продолжительность
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										{product.curriculum.map(
											(section, index) => (
												<div
													key={index}
													className='border rounded-lg p-4'
												>
													<div className='flex items-center justify-between mb-2'>
														<h3 className='font-semibold text-gray-900'>
															{section.title}
														</h3>
														<div className='text-sm text-gray-500'>
															{section.lessons}{" "}
															уроков •{" "}
															{section.duration}
														</div>
													</div>
													<div className='space-y-2'>
														{section.topics.map(
															(
																topic,
																topicIndex
															) => (
																<div
																	key={
																		topicIndex
																	}
																	className='flex items-center space-x-2 text-sm text-gray-600'
																>
																	<Play className='h-4 w-4' />
																	<span>
																		{topic}
																	</span>
																</div>
															)
														)}
													</div>
												</div>
											)
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value='reviews' className='mt-6'>
							<Card>
								<CardHeader>
									<CardTitle>Отзывы студентов</CardTitle>
									<div className='flex items-center space-x-4'>
										<div className='flex items-center space-x-2'>
											<Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
											<span className='text-2xl font-bold'>
												{product.rating}
											</span>
										</div>
										<div className='text-gray-600'>
											{product.reviews} отзывов
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<div className='space-y-6'>
										{reviews.map((review) => (
											<div
												key={review.id}
												className='border-b pb-6 last:border-b-0'
											>
												<div className='flex items-start space-x-4'>
													<Avatar>
														<AvatarImage
															src={
																review.avatar ||
																"/placeholder.svg"
															}
															alt={review.author}
														/>
														<AvatarFallback>
															{review.author[0]}
														</AvatarFallback>
													</Avatar>
													<div className='flex-1'>
														<div className='flex items-center space-x-2 mb-2'>
															<h4 className='font-semibold text-gray-900'>
																{review.author}
															</h4>
															<div className='flex items-center'>
																{[
																	...Array(
																		review.rating
																	),
																].map(
																	(_, i) => (
																		<Star
																			key={
																				i
																			}
																			className='h-4 w-4 fill-yellow-400 text-yellow-400'
																		/>
																	)
																)}
															</div>
															<span className='text-sm text-gray-500'>
																{review.date}
															</span>
														</div>
														<p className='text-gray-700 mb-2'>
															{review.text}
														</p>
														<div className='flex items-center space-x-4 text-sm text-gray-500'>
															<button className='flex items-center space-x-1 hover:text-blue-600'>
																<MessageCircle className='h-4 w-4' />
																<span>
																	Ответить
																</span>
															</button>
															<span>
																👍{" "}
																{review.helpful}{" "}
																человек считают
																это полезным
															</span>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value='instructor' className='mt-6'>
							<Card>
								<CardHeader>
									<div className='flex items-center space-x-4'>
										<Avatar className='h-16 w-16'>
											<AvatarImage
												src={
													product.instructor.avatar ||
													"/placeholder.svg"
												}
												alt={product.instructor.name}
											/>
											<AvatarFallback>АМ</AvatarFallback>
										</Avatar>
										<div>
											<CardTitle>
												{product.instructor.name}
											</CardTitle>
											<CardDescription>
												{product.instructor.title}
											</CardDescription>
											<div className='flex items-center space-x-4 mt-2 text-sm text-gray-600'>
												<span>
													⭐{" "}
													{product.instructor.rating}{" "}
													рейтинг
												</span>
												<span>
													👥 {product.students}{" "}
													студентов
												</span>
												<span>
													📚{" "}
													{product.instructor.courses}{" "}
													курсов
												</span>
											</div>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p className='text-gray-700 mb-4'>
										Алексей Морозов - ведущий специалист по
										диагностике автомобилей с более чем
										15-летним опытом работы. Автор множества
										обучающих программ и сертифицированный
										инструктор по автомобильной диагностике.
									</p>
									<div className='grid grid-cols-2 gap-4 text-sm'>
										<div>
											<h4 className='font-semibold mb-2'>
												Специализация:
											</h4>
											<ul className='space-y-1 text-gray-600'>
												<li>
													• Диагностика двигателей
												</li>
												<li>• Электронные системы</li>
												<li>• Топливные системы</li>
											</ul>
										</div>
										<div>
											<h4 className='font-semibold mb-2'>
												Достижения:
											</h4>
											<ul className='space-y-1 text-gray-600'>
												<li>
													• Сертифицированный
													инструктор
												</li>
												<li>• Автор 12 курсов</li>
												<li>• 2500+ выпускников</li>
											</ul>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>

				{/* Sidebar */}
				<div className='space-y-6'>
					{/* Purchase Card */}
					<Card className='sticky top-24'>
						<CardContent className='p-6'>
							<div className='text-center mb-6'>
								<div className='flex items-center justify-center space-x-2 mb-2'>
									<span className='text-3xl font-bold text-gray-900'>
										{product.price.toLocaleString()} ₽
									</span>
									{product.originalPrice && (
										<span className='text-xl text-gray-500 line-through'>
											{product.originalPrice.toLocaleString()}{" "}
											₽
										</span>
									)}
								</div>
								{product.originalPrice && (
									<Badge
										variant='destructive'
										className='text-sm'
									>
										Скидка{" "}
										{Math.round(
											(1 -
												product.price /
													product.originalPrice) *
												100
										)}
										%
									</Badge>
								)}
							</div>

							<div className='space-y-4'>
								<Button size='lg' className='w-full'>
									<ShoppingCart className='h-5 w-5 mr-2' />
									Добавить в корзину
								</Button>

								<Button
									variant='outline'
									size='lg'
									className='w-full bg-transparent'
								>
									Купить сейчас
								</Button>

								<div className='flex space-x-2'>
									<Button
										variant='outline'
										size='sm'
										className='flex-1 bg-transparent'
									>
										<Heart className='h-4 w-4 mr-2' />В
										избранное
									</Button>
									<Button
										variant='outline'
										size='sm'
										className='flex-1 bg-transparent'
									>
										<Share2 className='h-4 w-4 mr-2' />
										Поделиться
									</Button>
								</div>
							</div>

							<div className='mt-6 pt-6 border-t space-y-3'>
								<div className='flex items-center justify-between text-sm'>
									<span className='text-gray-600'>
										Продолжительность:
									</span>
									<span className='font-medium'>
										{product.duration}
									</span>
								</div>
								<div className='flex items-center justify-between text-sm'>
									<span className='text-gray-600'>
										Уроков:
									</span>
									<span className='font-medium'>
										{product.lessons}
									</span>
								</div>
								<div className='flex items-center justify-between text-sm'>
									<span className='text-gray-600'>Язык:</span>
									<span className='font-medium'>
										{product.language}
									</span>
								</div>
								<div className='flex items-center justify-between text-sm'>
									<span className='text-gray-600'>
										Уровень:
									</span>
									<span className='font-medium'>
										{product.level}
									</span>
								</div>
								{product.certificate && (
									<div className='flex items-center justify-between text-sm'>
										<span className='text-gray-600'>
											Сертификат:
										</span>
										<div className='flex items-center'>
											<Award className='h-4 w-4 text-green-500 mr-1' />
											<span className='font-medium text-green-600'>
												Да
											</span>
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Related Products */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>
								Похожие курсы
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								{[1, 2, 3].map((item) => (
									<div key={item} className='flex space-x-3'>
										<Image
											src='/automotive-course-thumbnail.png'
											alt='Course thumbnail'
											width={80}
											height={60}
											className='rounded object-cover'
										/>
										<div className='flex-1'>
											<h4 className='text-sm font-medium line-clamp-2'>
												Электронные системы автомобиля
											</h4>
											<div className='flex items-center space-x-1 mt-1'>
												<Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
												<span className='text-xs'>
													4.9
												</span>
											</div>
											<p className='text-sm font-semibold text-gray-900 mt-1'>
												3,490 ₽
											</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
