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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
	ArrowLeft,
	ArrowRight,
	Award,
	BookOpen,
	Calendar,
	CheckCircle,
	Eye,
	Package,
	Plus,
	Save,
	Upload,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreateContent() {
	const [currentStep, setCurrentStep] = useState(1);
	const [productType, setProductType] = useState("");
	const [formData, setFormData] = useState({
		title: "",
		sku: "",
		category: "",
		shortDescription: "",
		fullDescription: "",
		price: "",
		oldPrice: "",
		currency: "RUB",
	});

	const steps = [
		{ id: 1, name: "Тип товара", completed: currentStep > 1 },
		{ id: 2, name: "Основная информация", completed: currentStep > 2 },
		{ id: 3, name: "Медиа-контент", completed: currentStep > 3 },
		{ id: 4, name: "Настройки", completed: currentStep > 4 },
		{ id: 5, name: "SEO", completed: currentStep > 5 },
		{ id: 6, name: "Превью", completed: false },
	];

	const productTypes = [
		{
			id: "course",
			name: "Онлайн-курс",
			description: "Образовательный курс с видеоуроками и материалами",
			icon: BookOpen,
			color: "bg-blue-500",
		},
		{
			id: "event",
			name: "Мероприятие",
			description: "Воркшопы, семинары и очные мероприятия",
			icon: Calendar,
			color: "bg-green-500",
		},
		{
			id: "certification",
			name: "Сертификация",
			description: "Программы сертификации и экзамены",
			icon: Award,
			color: "bg-purple-500",
		},
		{
			id: "material",
			name: "Материалы",
			description: "Цифровые и физические материалы",
			icon: Package,
			color: "bg-orange-500",
		},
	];

	const categories = [
		{ value: "engine-diagnostics", label: "Диагностика двигателя" },
		{ value: "electronics", label: "Электронные системы" },
		{ value: "body-repair", label: "Кузовной ремонт" },
		{ value: "hybrid-systems", label: "Гибридные системы" },
		{ value: "certification", label: "Сертификация" },
		{ value: "tools", label: "Инструменты" },
	];

	const nextStep = () => {
		if (currentStep < 6) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const generateSKU = () => {
		const prefix = productType.toUpperCase();
		const random = Math.floor(Math.random() * 1000)
			.toString()
			.padStart(3, "0");
		return `${prefix}-${random}`;
	};
	return (
		<div className='space-y-8'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-4'>
					<Button variant='ghost' asChild>
						<Link href='/shop/admin/products'>
							<ArrowLeft className='h-4 w-4 mr-2' />
							Назад к товарам
						</Link>
					</Button>
					<div>
						<h1 className='text-3xl font-bold text-gray-900'>
							Добавить товар
						</h1>
						<p className='text-gray-600 mt-2'>
							Создайте новый товар для магазина
						</p>
					</div>
				</div>
				<div className='flex items-center space-x-2'>
					<Button variant='outline'>
						<Eye className='h-4 w-4 mr-2' />
						Предпросмотр
					</Button>
					<Button variant='outline'>
						<Save className='h-4 w-4 mr-2' />
						Сохранить черновик
					</Button>
				</div>
			</div>

			{/* Progress Steps */}
			<Card>
				<CardContent className='p-6'>
					<div className='flex items-center justify-between'>
						{steps.map((step, index) => (
							<div key={step.id} className='flex items-center'>
								<div className='flex items-center'>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
											step.completed
												? "bg-green-500 text-white"
												: currentStep === step.id
												? "bg-blue-500 text-white"
												: "bg-gray-200 text-gray-600"
										}`}
									>
										{step.completed ? (
											<CheckCircle className='h-4 w-4' />
										) : (
											step.id
										)}
									</div>
									<div className='ml-3'>
										<p
											className={`text-sm font-medium ${
												currentStep === step.id
													? "text-blue-600"
													: "text-gray-900"
											}`}
										>
											{step.name}
										</p>
									</div>
								</div>
								{index < steps.length - 1 && (
									<div
										className={`w-16 h-0.5 mx-4 ${
											step.completed
												? "bg-green-500"
												: "bg-gray-200"
										}`}
									/>
								)}
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Step Content */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2'>
					{/* Step 1: Product Type */}
					{currentStep === 1 && (
						<Card>
							<CardHeader>
								<CardTitle>Выберите тип товара</CardTitle>
								<CardDescription>
									Выберите тип товара, который вы хотите
									создать. Это определит доступные настройки.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									{productTypes.map((type) => {
										const Icon = type.icon;
										return (
											<div
												key={type.id}
												className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
													productType === type.id
														? "border-blue-500 bg-blue-50"
														: "border-gray-200 hover:border-gray-300"
												}`}
												onClick={() =>
													setProductType(type.id)
												}
											>
												<div className='flex items-center space-x-4'>
													<div
														className={`p-3 rounded-full ${type.color} text-white`}
													>
														<Icon className='h-6 w-6' />
													</div>
													<div>
														<h3 className='font-semibold text-gray-900'>
															{type.name}
														</h3>
														<p className='text-sm text-gray-600'>
															{type.description}
														</p>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</CardContent>
						</Card>
					)}

					{/* Step 2: Basic Information */}
					{currentStep === 2 && (
						<Card>
							<CardHeader>
								<CardTitle>Основная информация</CardTitle>
								<CardDescription>
									Заполните основную информацию о товаре
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='title'>
											Название товара *
										</Label>
										<Input
											id='title'
											placeholder='Введите название товара'
											value={formData.title}
											onChange={(e) =>
												setFormData({
													...formData,
													title: e.target.value,
												})
											}
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='sku'>
											Артикул (SKU)
										</Label>
										<div className='flex space-x-2'>
											<Input
												id='sku'
												placeholder='AUTO-001'
												value={formData.sku}
												onChange={(e) =>
													setFormData({
														...formData,
														sku: e.target.value,
													})
												}
											/>
											<Button
												variant='outline'
												onClick={() =>
													setFormData({
														...formData,
														sku: generateSKU(),
													})
												}
											>
												Генерировать
											</Button>
										</div>
									</div>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='category'>
										Категория *
									</Label>
									<Select
										value={formData.category}
										onValueChange={(value) =>
											setFormData({
												...formData,
												category: value,
											})
										}
									>
										<SelectTrigger>
											<SelectValue placeholder='Выберите категорию' />
										</SelectTrigger>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													key={category.value}
													value={category.value}
												>
													{category.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='shortDescription'>
										Краткое описание *
									</Label>
									<Textarea
										id='shortDescription'
										placeholder='Краткое описание товара (до 200 символов)'
										maxLength={200}
										value={formData.shortDescription}
										onChange={(e) =>
											setFormData({
												...formData,
												shortDescription:
													e.target.value,
											})
										}
									/>
									<p className='text-xs text-gray-500'>
										{formData.shortDescription.length}/200
										символов
									</p>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='fullDescription'>
										Полное описание *
									</Label>
									<Textarea
										id='fullDescription'
										placeholder='Подробное описание товара'
										rows={6}
										value={formData.fullDescription}
										onChange={(e) =>
											setFormData({
												...formData,
												fullDescription: e.target.value,
											})
										}
									/>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='price'>Цена *</Label>
										<Input
											id='price'
											type='number'
											placeholder='0'
											value={formData.price}
											onChange={(e) =>
												setFormData({
													...formData,
													price: e.target.value,
												})
											}
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='oldPrice'>
											Старая цена
										</Label>
										<Input
											id='oldPrice'
											type='number'
											placeholder='0'
											value={formData.oldPrice}
											onChange={(e) =>
												setFormData({
													...formData,
													oldPrice: e.target.value,
												})
											}
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='currency'>Валюта</Label>
										<Select
											value={formData.currency}
											onValueChange={(value) =>
												setFormData({
													...formData,
													currency: value,
												})
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='RUB'>
													₽ Рубли
												</SelectItem>
												<SelectItem value='USD'>
													$ Доллары
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Step 3: Media Content */}
					{currentStep === 3 && (
						<Card>
							<CardHeader>
								<CardTitle>Медиа-контент</CardTitle>
								<CardDescription>
									Загрузите изображения и файлы для товара
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-6'>
								<div className='space-y-2'>
									<Label>Галерея изображений</Label>
									<div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
										<Upload className='h-12 w-12 text-gray-400 mx-auto mb-4' />
										<p className='text-gray-600 mb-2'>
											Перетащите изображения сюда или
											нажмите для выбора
										</p>
										<p className='text-sm text-gray-500'>
											Поддерживаются JPG, PNG до 5MB.
											Максимум 10 файлов.
										</p>
										<Button
											variant='outline'
											className='mt-4 bg-transparent'
										>
											Выбрать файлы
										</Button>
									</div>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='videoUrl'>
										Видео-превью (опционально)
									</Label>
									<Input
										id='videoUrl'
										placeholder='https://youtube.com/watch?v=...'
										type='url'
									/>
									<p className='text-xs text-gray-500'>
										Ссылка на YouTube или Vimeo
									</p>
								</div>

								{productType === "material" && (
									<div className='space-y-2'>
										<Label>Файлы для скачивания</Label>
										<div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
											<Package className='h-8 w-8 text-gray-400 mx-auto mb-2' />
											<p className='text-gray-600 mb-2'>
												Загрузите файлы для скачивания
											</p>
											<Button variant='outline' size='sm'>
												<Plus className='h-4 w-4 mr-2' />
												Добавить файлы
											</Button>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* Step 4: Settings */}
					{currentStep === 4 && (
						<Card>
							<CardHeader>
								<CardTitle>Настройки товара</CardTitle>
								<CardDescription>
									Настройте параметры продаж и доступности
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Tabs defaultValue='sales' className='w-full'>
									<TabsList className='grid w-full grid-cols-3'>
										<TabsTrigger value='sales'>
											Продажи
										</TabsTrigger>
										<TabsTrigger
											value='course'
											disabled={productType !== "course"}
										>
											Курс
										</TabsTrigger>
										<TabsTrigger
											value='event'
											disabled={productType !== "event"}
										>
											Мероприятие
										</TabsTrigger>
									</TabsList>

									<TabsContent
										value='sales'
										className='space-y-4'
									>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div className='space-y-2'>
												<Label htmlFor='stockQuantity'>
													Количество на складе
												</Label>
												<Input
													id='stockQuantity'
													type='number'
													placeholder='0'
												/>
											</div>
											<div className='space-y-2'>
												<Label>Доступность</Label>
												<Select defaultValue='in_stock'>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='in_stock'>
															В наличии
														</SelectItem>
														<SelectItem value='out_of_stock'>
															Нет в наличии
														</SelectItem>
														<SelectItem value='pre_order'>
															Предзаказ
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>

										<div className='flex items-center space-x-2'>
											<Checkbox id='unlimited' />
											<Label htmlFor='unlimited'>
												Неограниченное количество
											</Label>
										</div>
									</TabsContent>

									<TabsContent
										value='course'
										className='space-y-4'
									>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div className='space-y-2'>
												<Label htmlFor='duration'>
													Продолжительность (часы)
												</Label>
												<Input
													id='duration'
													type='number'
													placeholder='12'
												/>
											</div>
											<div className='space-y-2'>
												<Label>Уровень сложности</Label>
												<Select>
													<SelectTrigger>
														<SelectValue placeholder='Выберите уровень' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='beginner'>
															Начинающий
														</SelectItem>
														<SelectItem value='intermediate'>
															Средний
														</SelectItem>
														<SelectItem value='advanced'>
															Продвинутый
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>

										<div className='space-y-2'>
											<Label htmlFor='accessPeriod'>
												Период доступа (дни)
											</Label>
											<Input
												id='accessPeriod'
												type='number'
												placeholder='365'
											/>
										</div>
									</TabsContent>

									<TabsContent
										value='event'
										className='space-y-4'
									>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div className='space-y-2'>
												<Label htmlFor='eventDate'>
													Дата мероприятия
												</Label>
												<Input
													id='eventDate'
													type='date'
												/>
											</div>
											<div className='space-y-2'>
												<Label htmlFor='eventTime'>
													Время
												</Label>
												<Input
													id='eventTime'
													type='time'
												/>
											</div>
										</div>

										<div className='space-y-2'>
											<Label htmlFor='location'>
												Место проведения
											</Label>
											<Input
												id='location'
												placeholder='Москва, ул. Примерная, 1'
											/>
										</div>
									</TabsContent>
								</Tabs>
							</CardContent>
						</Card>
					)}

					{/* Step 5: SEO */}
					{currentStep === 5 && (
						<Card>
							<CardHeader>
								<CardTitle>SEO настройки</CardTitle>
								<CardDescription>
									Оптимизируйте товар для поисковых систем
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='metaTitle'>
										Meta Title
									</Label>
									<Input
										id='metaTitle'
										placeholder='SEO заголовок страницы'
									/>
									<p className='text-xs text-gray-500'>
										Рекомендуется до 60 символов
									</p>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='metaDescription'>
										Meta Description
									</Label>
									<Textarea
										id='metaDescription'
										placeholder='Описание для поисковых систем'
										maxLength={160}
									/>
									<p className='text-xs text-gray-500'>
										Рекомендуется до 160 символов
									</p>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='slug'>URL (ЧПУ)</Label>
									<Input
										id='slug'
										placeholder='diagnostika-dvigatelya-kurs'
									/>
									<p className='text-xs text-gray-500'>
										Автоматически генерируется из названия
									</p>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Step 6: Preview */}
					{currentStep === 6 && (
						<Card>
							<CardHeader>
								<CardTitle>Предварительный просмотр</CardTitle>
								<CardDescription>
									Проверьте все данные перед публикацией
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-6'>
									<div className='border rounded-lg p-6'>
										<div className='flex items-start space-x-4'>
											<div className='w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center'>
												<Package className='h-8 w-8 text-gray-400' />
											</div>
											<div className='flex-1'>
												<h3 className='text-xl font-semibold text-gray-900'>
													{formData.title ||
														"Название товара"}
												</h3>
												<p className='text-gray-600 mt-1'>
													{formData.shortDescription ||
														"Краткое описание"}
												</p>
												<div className='flex items-center space-x-4 mt-2'>
													<Badge variant='outline'>
														{productType}
													</Badge>
													<span className='text-2xl font-bold text-gray-900'>
														{formData.price
															? `₽${Number.parseInt(
																	formData.price
															  ).toLocaleString()}`
															: "₽0"}
													</span>
												</div>
											</div>
										</div>
									</div>

									<div className='text-center'>
										<p className='text-gray-600 mb-4'>
											Товар готов к публикации!
										</p>
										<div className='flex justify-center space-x-4'>
											<Button variant='outline'>
												Сохранить как черновик
											</Button>
											<Button>Опубликовать товар</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Sidebar */}
				<div className='space-y-6'>
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>
								Статус публикации
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<span className='text-sm text-gray-600'>
										Статус:
									</span>
									<Badge variant='secondary'>Черновик</Badge>
								</div>
								<div className='flex items-center justify-between'>
									<span className='text-sm text-gray-600'>
										Видимость:
									</span>
									<span className='text-sm'>Приватный</span>
								</div>
								<div className='flex items-center justify-between'>
									<span className='text-sm text-gray-600'>
										Создан:
									</span>
									<span className='text-sm'>
										{new Date().toLocaleDateString()}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Помощь</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-3 text-sm text-gray-600'>
								<p>• Заполните все обязательные поля</p>
								<p>• Добавьте качественные изображения</p>
								<p>• Используйте ключевые слова в описании</p>
								<p>• Проверьте правильность цены</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Navigation */}
			<div className='flex items-center justify-between'>
				<Button
					variant='outline'
					onClick={prevStep}
					disabled={currentStep === 1}
				>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Назад
				</Button>

				<div className='flex items-center space-x-2'>
					<span className='text-sm text-gray-600'>
						Шаг {currentStep} из {steps.length}
					</span>
				</div>

				<Button
					onClick={nextStep}
					disabled={
						currentStep === 6 || (currentStep === 1 && !productType)
					}
				>
					{currentStep === 6 ? "Опубликовать" : "Далее"}
					<ArrowRight className='h-4 w-4 ml-2' />
				</Button>
			</div>
		</div>
	);
}
