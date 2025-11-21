"use client";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import {
	ArrowRight,
	CreditCard,
	Gift,
	Minus,
	Plus,
	Shield,
	ShoppingCart,
	Tag,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartContent() {
	const [promoCode, setPromoCode] = useState("");
	const [cartItems, setCartItems] = useState([
		{
			id: 1,
			title: "Диагностика двигателя: Полный курс",
			description:
				"Комплексный курс по диагностике современных двигателей",
			price: 4990,
			originalPrice: 6990,
			quantity: 1,
			image: "/car-engine-diagnostics.png",
			category: "Онлайн-курс",
			instructor: "Алексей Морозов",
		},
		{
			id: 2,
			title: "Воркшоп: Гибридные двигатели",
			description:
				"Практический семинар по обслуживанию гибридных систем",
			price: 12000,
			quantity: 1,
			image: "/hybrid-car-engine.png",
			category: "Мероприятие",
			date: "15 марта 2024",
		},
		{
			id: 3,
			title: "Справочник по запчастям",
			description: "Полный справочник по автомобильным запчастям",
			price: 1990,
			quantity: 2,
			image: "/automotive-parts-manual.png",
			category: "Материалы",
		},
	]);

	const updateQuantity = (id: number, newQuantity: number) => {
		if (newQuantity < 1) return;
		setCartItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	const removeItem = (id: number) => {
		setCartItems((items) => items.filter((item) => item.id !== id));
	};

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const originalTotal = cartItems.reduce(
		(sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
		0
	);
	const discount = originalTotal - subtotal;
	const deliveryFee = 0; // Бесплатная доставка для цифровых товаров
	const total = subtotal + deliveryFee;

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
					Корзина
				</h1>
				<p className='text-gray-600'>
					{cartItems.length} товаров в корзине
				</p>
			</div>

			{cartItems.length === 0 ? (
				<div className='text-center py-16'>
					<ShoppingCart className='h-24 w-24 text-gray-300 mx-auto mb-4' />
					<h2 className='text-2xl font-semibold text-gray-900 mb-2'>
						Ваша корзина пуста
					</h2>
					<p className='text-gray-600 mb-8'>
						Добавьте товары из каталога, чтобы продолжить покупки
					</p>
					<Button asChild>
						<Link href='/shop/catalog'>Перейти в каталог</Link>
					</Button>
				</div>
			) : (
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Cart Items */}
					<div className='lg:col-span-2 space-y-4'>
						{cartItems.map((item) => (
							<Card key={item.id}>
								<CardContent className='p-6'>
									<div className='flex items-start space-x-4'>
										<Image
											src={
												item.image || "/placeholder.svg"
											}
											alt={item.title}
											width={120}
											height={80}
											className='rounded-lg object-cover'
										/>

										<div className='flex-1'>
											<div className='flex items-start justify-between'>
												<div>
													<Badge
														variant='outline'
														className='mb-2'
													>
														{item.category}
													</Badge>
													<h3 className='text-lg font-semibold text-gray-900 mb-1'>
														{item.title}
													</h3>
													<p className='text-sm text-gray-600 mb-2'>
														{item.description}
													</p>

													{item.instructor && (
														<p className='text-sm text-blue-600'>
															Преподаватель:{" "}
															{item.instructor}
														</p>
													)}
													{item.date && (
														<p className='text-sm text-gray-600'>
															Дата: {item.date}
														</p>
													)}
												</div>

												<Button
													variant='ghost'
													size='sm'
													onClick={() =>
														removeItem(item.id)
													}
													className='text-red-500 hover:text-red-700 hover:bg-red-50'
												>
													<Trash2 className='h-4 w-4' />
												</Button>
											</div>

											<div className='flex items-center justify-between mt-4'>
												<div className='flex items-center space-x-3'>
													<Button
														variant='outline'
														size='sm'
														onClick={() =>
															updateQuantity(
																item.id,
																item.quantity -
																	1
															)
														}
														disabled={
															item.quantity <= 1
														}
													>
														<Minus className='h-4 w-4' />
													</Button>
													<span className='font-medium'>
														{item.quantity}
													</span>
													<Button
														variant='outline'
														size='sm'
														onClick={() =>
															updateQuantity(
																item.id,
																item.quantity +
																	1
															)
														}
													>
														<Plus className='h-4 w-4' />
													</Button>
												</div>

												<div className='text-right'>
													<div className='flex items-center space-x-2'>
														<span className='text-lg font-bold text-gray-900'>
															{(
																item.price *
																item.quantity
															).toLocaleString()}{" "}
															₽
														</span>
														{item.originalPrice && (
															<span className='text-sm text-gray-500 line-through'>
																{(
																	item.originalPrice *
																	item.quantity
																).toLocaleString()}{" "}
																₽
															</span>
														)}
													</div>
													<p className='text-sm text-gray-600'>
														{item.price.toLocaleString()}{" "}
														₽ за единицу
													</p>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}

						{/* Promo Code */}
						<Card>
							<CardContent className='p-6'>
								<div className='flex items-center space-x-4'>
									<div className='flex-1'>
										<div className='flex items-center space-x-2 mb-2'>
											<Tag className='h-4 w-4 text-gray-400' />
											<span className='text-sm font-medium text-gray-700'>
												Промокод
											</span>
										</div>
										<Input
											placeholder='Введите промокод'
											value={promoCode}
											onChange={(e) =>
												setPromoCode(e.target.value)
											}
										/>
									</div>
									<Button variant='outline'>Применить</Button>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Order Summary */}
					<div className='space-y-6'>
						<Card className='sticky top-24'>
							<CardHeader>
								<CardTitle className='flex items-center'>
									<ShoppingCart className='h-5 w-5 mr-2' />
									Итого к оплате
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-3'>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>
											Подытог:
										</span>
										<span>
											{subtotal.toLocaleString()} ₽
										</span>
									</div>

									{discount > 0 && (
										<div className='flex justify-between text-sm text-green-600'>
											<span>Скидка:</span>
											<span>
												-{discount.toLocaleString()} ₽
											</span>
										</div>
									)}

									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>
											Доставка:
										</span>
										<span className='text-green-600'>
											Бесплатно
										</span>
									</div>

									<Separator />

									<div className='flex justify-between text-lg font-bold'>
										<span>Итого:</span>
										<span>{total.toLocaleString()} ₽</span>
									</div>
								</div>

								<Button size='lg' className='w-full'>
									<CreditCard className='h-5 w-5 mr-2' />
									Перейти к оплате
									<ArrowRight className='h-4 w-4 ml-2' />
								</Button>

								<div className='text-center'>
									<Button
										variant='outline'
										className='w-full bg-transparent'
										asChild
									>
										<Link href='/shop/catalog'>
											Продолжить покупки
										</Link>
									</Button>
								</div>

								<div className='pt-4 border-t space-y-3'>
									<div className='flex items-center space-x-2 text-sm text-gray-600'>
										<Shield className='h-4 w-4 text-green-500' />
										<span>Безопасная оплата</span>
									</div>
									<div className='flex items-center space-x-2 text-sm text-gray-600'>
										<Gift className='h-4 w-4 text-blue-500' />
										<span>Мгновенный доступ к курсам</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Payment Methods */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>
									Способы оплаты
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-2 gap-3'>
									<div className='p-3 border rounded-lg text-center'>
										<div className='text-sm font-medium'>
											Банковские карты
										</div>
										<div className='text-xs text-gray-500'>
											Visa, MasterCard, МИР
										</div>
									</div>
									<div className='p-3 border rounded-lg text-center'>
										<div className='text-sm font-medium'>
											ЮMoney
										</div>
										<div className='text-xs text-gray-500'>
											Электронный кошелек
										</div>
									</div>
									<div className='p-3 border rounded-lg text-center'>
										<div className='text-sm font-medium'>
											СБП
										</div>
										<div className='text-xs text-gray-500'>
											Система быстрых платежей
										</div>
									</div>
									<div className='p-3 border rounded-lg text-center'>
										<div className='text-sm font-medium'>
											Рассрочка
										</div>
										<div className='text-xs text-gray-500'>
											0% на 6 месяцев
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Loyalty Points */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>
									Бонусные баллы
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-3'>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>
											Доступно баллов:
										</span>
										<span className='font-medium'>
											1,250
										</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>
											Можно потратить:
										</span>
										<span className='font-medium text-green-600'>
											до 500 ₽
										</span>
									</div>
									<Button
										variant='outline'
										size='sm'
										className='w-full bg-transparent'
									>
										Использовать баллы
									</Button>
									<p className='text-xs text-gray-500 text-center'>
										За эту покупку вы получите{" "}
										{Math.round(total * 0.05)} баллов
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
}
