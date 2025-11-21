"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProjectCard from "../../components/ProjectCard";
import {
	FaSearch,
	FaBuilding,
	FaMapMarkerAlt,
	FaEdit,
	FaRocket,
	FaCalendarAlt,
	FaExternalLinkAlt,
	FaCalendarPlus,
	FaTicketAlt,
	FaFire,
	FaTrophy,
	FaGraduationCap,
	FaArrowUp,
	FaQuestionCircle,
	FaPlus,
} from "react-icons/fa";

const QuizDashboard = () => {
	const router = useRouter();

	useEffect(() => {
		// Инициализация скриптов из HTML-прототипа
		const initScripts = () => {
			// Анимация прогресс-баров
			const progressBars = document.querySelectorAll(".progress-fill");
			progressBars.forEach((bar) => {
				// берем текущую ширину (если задана inline-стилем)
				const width = (bar as HTMLElement).style.width || "";
				(bar as HTMLElement).style.width = "0%";

				setTimeout(() => {
					(bar as HTMLElement).style.width = width;
				}, 500);
			});

			// Таймер для следующей игры
			const updateGameTimer = () => {
				const now = new Date();
				const tomorrow = new Date(now);
				tomorrow.setDate(tomorrow.getDate() + 1);
				tomorrow.setHours(0, 0, 0, 0);

				const diff = tomorrow.getTime() - now.getTime(); // ms
				const hours = Math.floor(diff / (1000 * 60 * 60));
				const minutes = Math.floor(
					(diff % (1000 * 60 * 60)) / (1000 * 60)
				);
				const seconds = Math.floor((diff % (1000 * 60)) / 1000);

				const timerElement = document.getElementById("nextGameTimer");
				const timeString = `${hours
					.toString()
					.padStart(2, "0")}:${minutes
					.toString()
					.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

				if (timerElement) {
					timerElement.textContent = timeString;
				}
			};

			// Запускаем таймер
			updateGameTimer();
			const timerInterval = setInterval(updateGameTimer, 1000);

			// Обработчики кликов на билеты
			const ticketItems = document.querySelectorAll(".ticket-item");
			const handlers: Array<{
				el: Element;
				fn: EventListenerOrEventListenerObject;
			}> = [];
			ticketItems.forEach((item) => {
				const fn = function (this: HTMLElement) {
					const ticketNumber = this.getAttribute("data-ticket");
					alert(
						`Информация о билете:\n\nНомер: ${ticketNumber}\nСтатус: Активен\nДействителен до: 25.12.2025\n\nБилет участвует в еженедельном розыгрыше призов.`
					);
				} as EventListener;
				item.addEventListener("click", fn);
				handlers.push({ el: item, fn });
			});

			// Возврат функции очистки
			return () => {
				clearInterval(timerInterval);
				// удаляем обработчики
				handlers.forEach((h) =>
					h.el.removeEventListener("click", h.fn)
				);
			};
		};

		const cleanupRef = initScripts();
		// если initScripts вернул функцию cleanup — используем её
		return () => {
			if (typeof cleanupRef === "function") cleanupRef();
		};
	}, []);

	// Функции для кнопок
	const startQuiz = () => {
		alert("🎮 Запуск викторины...\n\nПереход к игровому модулю!");
		// В реальном приложении здесь будет навигация к игре
	};

	const viewMissions = () => {
		alert("📋 Открытие страницы миссий...");
	};

	const viewRewards = () => {
		alert("🎁 Открытие каталога наград...");
	};

	const switchDashboard = (dashboard: string) => {
		console.log("Переключение на проект:", dashboard);
		alert(
			"Переход к проекту: " +
				dashboard +
				"\n\nВ реальном приложении здесь будет навигация между страницами проектов"
		);
	};

	const addToGoogleCalendar = () => {
		const eventDetails = {
			text: "Онлайн-конференция АВТОСЕРВИС 2026",
			dates: "20251225T100000/20251225T180000",
			details:
				"Крупнейшее отраслевое событие года с участием ведущих экспертов автомобильной индустрии. Темы: Аналитика, Юридические, Финансы, Маркировка, Кадры, Налоги.",
			location: "Онлайн",
			ctz: "Europe/Moscow",
		};

		const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
			eventDetails.text
		)}&dates=${eventDetails.dates}&details=${encodeURIComponent(
			eventDetails.details
		)}&location=${encodeURIComponent(eventDetails.location)}&ctz=${
			eventDetails.ctz
		}`;

		window.open(googleCalendarUrl, "_blank", "width=600,height=700");
	};

	// Данные для карточек
	const projectStats = [
		{ value: "4", label: "Билетов" },
		{ value: "4 дня", label: "Серия" },
		{ value: "#12", label: "Рейтинг" },
		{ value: "35%", label: "Прогресс" },
	];

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Хедер */}
			<div className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center py-4'>
						<div>
							<h1 className='text-2xl font-bold text-gray-900'>
								Главная
							</h1>
							<p className='text-gray-600'>
								Панель управления вашим успехом
							</p>
						</div>

						<div className='flex items-center space-x-4'>
							<div className='relative'>
								<input
									type='text'
									placeholder='Поиск по вопросам, событиям, курсам...'
									className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
								/>
								<FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
							</div>

							<div className='flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg'>
								<div className='w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold'>
									АИ
								</div>
								<div className='text-right'>
									<div className='font-medium text-gray-900'>
										Алексей Иванов
									</div>
									<div className='text-sm text-gray-500'>
										Мастер-консультант
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Основной контент */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Сетка дашборда */}
				<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
					{/* Приветственный блок */}
					<div className='lg:col-span-4 relative bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-8 text-white overflow-hidden'>
						<div className='absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -m-16'></div>
						<div className='absolute top-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -m-16'></div>

						<div className='relative z-10 flex flex-col md:flex-row justify-between items-start gap-6'>
							<div className='flex-1'>
								<h1 className='text-3xl font-bold mb-2'>
									Добро пожаловать, Алексей! 👋
								</h1>
								<p className='text-blue-100 mb-6'>
									Ваш прогресс в экосистеме АВТОКОМ
								</p>

								<div className='flex items-center space-x-4'>
									<div className='bg-white bg-opacity-20 rounded-xl p-4'>
										<div className='text-2xl font-bold'>
											⭐ 1
										</div>
										<div className='text-xs opacity-80'>
											ГЛОБАЛЬНЫЙ УРОВЕНЬ
										</div>
										<div className='w-40 h-2 bg-white bg-opacity-30 rounded-full mt-2 overflow-hidden'>
											<div
												className='h-full bg-yellow-400 rounded-full'
												style={{ width: "5%" }}
											></div>
										</div>
										<small className='text-xs opacity-80'>
											1,250 / 5,000 XP до уровня 2
										</small>
									</div>
								</div>
							</div>

							<div className='bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-20 min-w-[280px]'>
								<div className='flex items-center mb-4'>
									<div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl mr-3'>
										👤
									</div>
									<div>
										<div className='font-bold'>
											Алексей Иванов
										</div>
										<div className='text-sm opacity-80'>
											Мастер-консультант
										</div>
										<div className='text-xs opacity-70 flex items-center'>
											<FaBuilding className='mr-1' /> СТО
											"АвтоПрофи" |
											<FaMapMarkerAlt className='ml-1 mr-1' />{" "}
											Москва
										</div>
									</div>
								</div>
								<button className='w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg py-2 px-4 text-sm font-medium hover:bg-opacity-30 transition-all flex items-center justify-center'>
									<FaEdit className='mr-2' /> Редактировать
									профиль
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* CTA блок */}
				<div className='lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6'>
					<div className='flex items-start space-x-4'>
						<div className='text-3xl'>⚡</div>
						<div className='flex-1'>
							<h2 className='text-xl font-bold mb-2'>
								ЧТО НУЖНО СДЕЛАТЬ СЕЙЧАС?
							</h2>
							<p className='text-gray-600 mb-4'>
								Сыграйте в ежедневную викторину — получите билет
								на розыгрыш приза!
							</p>

							<div className='flex flex-wrap gap-3'>
								<button
									onClick={startQuiz}
									className='bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-medium shadow-md'
								>
									🎯 НАЧАТЬ ВИКТОРИНУ
								</button>
								<button
									onClick={viewMissions}
									className='bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300'
								>
									📋 Посмотреть правила
								</button>
								<button
									onClick={viewRewards}
									className='bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300'
								>
									⚙️ Заполнить профиль
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Проектные карточки и баннер */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
					<div>
						{/* Карточка викторины */}
						<div
							onClick={() => switchDashboard("quiz")}
							className='bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white cursor-pointer hover:shadow-lg transition-all mb-6'
						>
							<div className='flex justify-between items-start mb-4'>
								<div>
									<h3 className='text-xl font-bold mb-1'>
										Автомобильная викторина
									</h3>
									<p className='text-blue-100 text-sm'>
										Еженедельные вопросы
									</p>
								</div>
								<div className='text-3xl opacity-50'>🎯</div>
							</div>

							<div className='grid grid-cols-3 gap-4'>
								<div className='bg-white bg-opacity-20 rounded-lg p-3 text-center'>
									<div className='text-lg font-bold'>
										1,240
									</div>
									<div className='text-xs opacity-80'>
										Очков за сегодня
									</div>
								</div>
								<div className='bg-white bg-opacity-20 rounded-lg p-3 text-center'>
									<div className='text-lg font-bold'>
										231 933
									</div>
									<div className='text-xs opacity-80'>
										Очков за неделю
									</div>
								</div>
								<div className='bg-white bg-opacity-20 rounded-lg p-3 text-center'>
									<div className='text-lg font-bold'>
										423 743
									</div>
									<div className='text-xs opacity-80'>
										🏆 Ваш рекорд очков
									</div>
								</div>
							</div>
						</div>

						{/* Карточка приза недели */}
						<div className='bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white'>
							<div className='flex items-center mb-4'>
								<div className='w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-xl mr-3'>
									🏆
								</div>
								<div>
									<h3 className='font-bold'>Приз недели</h3>
									<p className='text-sm opacity-80'>
										Разыгрывается каждый понедельник
									</p>
								</div>
							</div>

							<div className='text-3xl font-bold text-center mb-2'>
								6 000 баллов
							</div>
							<p className='text-center text-sm opacity-80'>
								Баллы можно обменять на сертификаты Ozon
							</p>
						</div>
					</div>

					{/* Баннер конференции */}
					<div className='relative bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl overflow-hidden'>
						<div className='absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-white/5'></div>
						<div className='relative z-10 p-6'>
							<div className='flex flex-col md:flex-row'>
								<div className='md:w-1/2 mb-6 md:mb-0'>
									<div className='inline-flex items-center bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-4'>
										<FaRocket className='mr-2' />
										<span>Онлайн-конференция</span>
									</div>

									<h1 className='text-2xl font-bold text-white mb-2'>
										АВТОСЕРВИС
										<br />
										<span className='bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent'>
											2026
										</span>
									</h1>

									<div className='flex items-center text-blue-100 mb-4'>
										<FaCalendarAlt className='mr-2' />
										<span>25 декабря 2025</span>
									</div>

									<p className='text-blue-100 mb-6'>
										Крупнейшее отраслевое событие года с
										участием ведущих экспертов автомобильной
										индустрии...
									</p>

									<div className='flex flex-col sm:flex-row gap-3'>
										<a
											href='https://autocom.parts/events/autocom-avtoservis-2026.html'
											target='_blank'
											rel='noopener noreferrer'
											className='bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all flex items-center justify-center'
										>
											<FaExternalLinkAlt className='mr-2' />
											Зарегистрироваться
										</a>

										<button
											onClick={addToGoogleCalendar}
											className='bg-white/20 border border-white/30 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all flex items-center justify-center'
										>
											<FaCalendarPlus className='mr-2' />В
											календарь
										</button>
									</div>
								</div>

								<div className='md:w-1/2'>
									<h3 className='text-white font-semibold mb-4'>
										Программа включает:
									</h3>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
										<div className='bg-white/10 rounded-lg p-3 flex items-center'>
											<div className='text-lg mr-2'>
												📊
											</div>
											<span className='text-white text-sm'>
												Аналитика
											</span>
										</div>
										<div className='bg-white/10 rounded-lg p-3 flex items-center'>
											<div className='text-lg mr-2'>
												🧾
											</div>
											<span className='text-white text-sm'>
												Новые налоги
											</span>
										</div>
										<div className='bg-white/10 rounded-lg p-3 flex items-center'>
											<div className='text-lg mr-2'>
												💰
											</div>
											<span className='text-white text-sm'>
												Финансы
											</span>
										</div>
										<div className='bg-white/10 rounded-lg p-3 flex items-center'>
											<div className='text-lg mr-2'>
												📦
											</div>
											<span className='text-white text-sm'>
												Маркировка
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Метрики */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
					{/* Билеты на розыгрыш */}
					<div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-200'>
						<div className='flex items-center mb-4'>
							<div className='w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-xl text-white mr-3'>
								<FaTicketAlt />
							</div>
							<div>
								<h3 className='font-bold text-gray-900'>
									Билеты на розыгрыш
								</h3>
								<p className='text-sm text-gray-600'>
									Прямой путь к 9000 рублей
								</p>
							</div>
						</div>

						<div className='text-3xl font-bold text-blue-600 mb-4'>
							4
						</div>

						<div className='mb-4'>
							<div className='flex justify-between text-sm mb-1'>
								<span>Прогресс недели</span>
								<span>57%</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2'>
								<div
									className='bg-gradient-to-r from-blue-600 to-blue-800 h-2 rounded-full'
									style={{ width: "57%" }}
								></div>
							</div>
							<div className='text-xs text-gray-500 mt-1'>
								3 билета до максимума
							</div>
						</div>
					</div>

					{/* Текущая серия */}
					<div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-200'>
						<div className='flex items-center mb-4'>
							<div className='w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-xl text-white mr-3'>
								<FaFire />
							</div>
							<div>
								<h3 className='font-bold text-gray-900'>
									Текущая серия
								</h3>
								<p className='text-sm text-gray-600'>
									Не пропустите ни дня!
								</p>
							</div>
						</div>
						<div className='grid grid-cols-2 gap-3 mb-4'>
							<div className='bg-gray-50 p-3 rounded-lg text-center'>
								<div className='text-lg font-bold'>3</div>
								<div className='text-xs text-gray-60'>
									Дня до бонуса
								</div>
							</div>
							<div className='bg-gray-50 p-3 rounded-lg text-center'>
								<div className='text-lg font-bold'>+1</div>
								<div className='text-xs text-gray-600'>
									Доп. билет за 7 дней
								</div>
							</div>
						</div>

						<div>
							<div className='flex justify-between text-sm mb-1'>
								<span>До 7-дневной серии</span>
								<span>57%</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2'>
								<div
									className='bg-gradient-to-r from-orange-50 to-orange-600 h-2 rounded-full'
									style={{ width: "57%" }}
								></div>
							</div>
							<div className='text-xs text-gray-500 mt-1'>
								Эксклюзивный бейдж после 7 дней
							</div>
						</div>
					</div>

					{/* Позиция в топе */}
					<div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-200'>
						<div className='flex items-center mb-4'>
							<div className='w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-xl text-white mr-3'>
								<FaTrophy />
							</div>
							<div>
								<h3 className='font-bold text-gray-900'>
									Позиция в топе
								</h3>
								<p className='text-sm text-gray-600'>
									Соревнуйтесь с лучшими
								</p>
							</div>
						</div>

						<div className='text-3xl font-bold text-yellow-600 mb-2'>
							#12
						</div>
						<div className='inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium mb-4'>
							<span className='mr-1'>
								<FaArrowUp />
							</span>
							+3 за неделю
						</div>

						<div className='grid grid-cols-2 gap-3 mb-4'>
							<div className='bg-gray-50 p-3 rounded-lg text-center'>
								<div className='text-lg font-bold'>2</div>
								<div className='text-xs text-gray-600'>
									Позиции до топ-10
								</div>
							</div>
							<div className='bg-gray-50 p-3 rounded-lg text-center'>
								<div className='text-lg font-bold'>87%</div>
								<div className='text-xs text-gray-600'>
									Лучше чем других
								</div>
							</div>
						</div>

						<div>
							<div className='flex justify-between text-sm mb-1'>
								<span>Прогресс до топ-10</span>
								<span>83%</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2'>
								<div
									className='bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full'
									style={{ width: "83%" }}
								></div>
							</div>
							<div className='text-xs text-gray-500 mt-1'>
								Топ-10 получают сертификаты
							</div>
						</div>
					</div>

					{/* Прогресс изучения */}
					<div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-200'>
						<div className='flex items-center mb-4'>
							<div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-xl text-white mr-3'>
								<FaGraduationCap />
							</div>
							<div>
								<h3 className='font-bold text-gray-900'>
									Прогресс изучения
								</h3>
								<p className='text-sm text-gray-600'>
									Освоение базы вопросов
								</p>
							</div>
						</div>

						<div className='text-3xl font-bold text-purple-600 mb-4'>
							35%
						</div>

						<div className='grid grid-cols-2 gap-3 mb-4'>
							<div className='bg-gray-50 p-3 rounded-lg text-center'>
								<div className='text-lg font-bold'>875</div>
								<div className='text-xs text-gray-600'>
									Вопросов пройдено
								</div>
							</div>
							<div className='bg-gray-50 p-3 rounded-lg text-center'>
								<div className='text-lg font-bold'>92%</div>
								<div className='text-xs text-gray-600'>
									Средняя точность
								</div>
							</div>
						</div>

						<div>
							<div className='flex justify-between text-sm mb-1'>
								<span>Общий прогресс базы</span>
								<span>35%</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2'>
								<div
									className='bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full'
									style={{ width: "35%" }}
								></div>
							</div>
							<div className='text-xs text-gray-500 mt-1'>
								2500 вопросов в базе
							</div>
						</div>
					</div>
				</div>

				{/* Карточка проекта */}
				<div className='mb-8'>
					<ProjectCard
						title='Викторина'
						description='Ежедневные вопросы по автомобильной тематике. Отвечайте правильно, чтобы получать билеты и повышать рейтинг.'
						icon={FaQuestionCircle}
						iconColor='text-blue-500'
						progress={35}
						progressLabel='Прогресс'
						stats={[
							{ value: "4", label: "Билетов" },
							{ value: "4 дня", label: "Серия" },
							{ value: "#12", label: "Рейтинг" },
						]}
						primaryButtonText='Играть'
						secondaryButtonText='Статистика'
					/>
				</div>
			</div>
		</div>
	);
};

export default QuizDashboard;
