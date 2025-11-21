import { Car } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className='bg-gray-900 text-white py-12 mt-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div className='col-span-1 md:col-span-2'>
						<div className='flex items-center space-x-3 mb-4'>
							<div className='bg-blue-600 p-2 rounded-lg'>
								<Car className='h-6 w-6 text-white' />
							</div>
							<div>
								<h3 className='text-xl font-bold'>
									EVERYCAR Магазин
								</h3>
								<p className='text-gray-400 text-sm'>
									Образовательная платформа
								</p>
							</div>
						</div>
						<p className='text-gray-400 mb-4'>
							Профессиональное развитие в автомобильной сфере
							через качественное обучение и сертификацию.
						</p>
					</div>

					<div>
						<h4 className='font-semibold mb-4'>Категории</h4>
						<ul className='space-y-2 text-gray-400'>
							<li>
								<Link
									href='/shop/catalog?category=courses'
									className='hover:text-white'
								>
									Онлайн-курсы
								</Link>
							</li>
							<li>
								<Link
									href='/shop/catalog?category=events'
									className='hover:text-white'
								>
									Мероприятия
								</Link>
							</li>
							<li>
								<Link
									href='/shop/catalog?category=certifications'
									className='hover:text-white'
								>
									Сертификации
								</Link>
							</li>
							<li>
								<Link
									href='/shop/catalog?category=materials'
									className='hover:text-white'
								>
									Материалы
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-semibold mb-4'>Поддержка</h4>
						<ul className='space-y-2 text-gray-400'>
							<li>
								<Link
									href='/shop/help'
									className='hover:text-white'
								>
									Помощь
								</Link>
							</li>
							<li>
								<Link
									href='/shop/account'
									className='hover:text-white'
								>
									Мой аккаунт
								</Link>
							</li>
							<li>
								<Link
									href='/shop/returns'
									className='hover:text-white'
								>
									Возвраты
								</Link>
							</li>
							<li>shop@everycar.ru</li>
						</ul>
					</div>
				</div>

				<div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
					<p>&copy; 2024 EVERYCAR. Все права защищены.</p>
				</div>
			</div>
		</footer>
	);
}
