"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Route,
	Info,
	Calendar,
	Check,
	Play,
	Clock,
	Flag,
	AlertTriangle,
	Calculator,
	CalendarPlus,
} from "lucide-react";
import { cn } from "../../../../../lib/utils";

interface PathToVictoryCardProps {
	onNotify: (message: string) => void;
}

const steps = [
	{
		label: "Январь-Февраль-Март",
		date: "Подготовка",
		status: "completed" as const,
		icon: Check,
	},
	{
		label: "Апрель",
		date: "Тест 1-2",
		status: "completed" as const,
		icon: Check,
	},
	{
		label: "Май",
		date: "Тесты 3-4",
		status: "current" as const,
		icon: Play,
	},
	{
		label: "Июнь",
		date: "10-26.06 - Регион. финал",
		status: "upcoming" as const,
		icon: Clock,
	},
	{
		label: "Август",
		date: "21.08 - Финал Москва",
		status: "upcoming" as const,
		icon: Flag,
	},
];

export default function PathToVictoryCard({
	onNotify,
}: PathToVictoryCardProps) {
	const [showScoring, setShowScoring] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.1 }}
			className='bg-white rounded-2xl shadow-lg p-6 border border-indigo-100'
		>
			<div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
				<div className='flex items-center gap-3'>
					<div className='p-2 bg-purple-100 rounded-lg'>
						<Route className='w-5 h-5 text-purple-600' />
					</div>
					<h2 className='text-xl font-bold text-gray-900'>
						Ваш путь к победе
					</h2>
				</div>
				<div className='flex gap-2'>
					<button
						onClick={() => setShowScoring(!showScoring)}
						className='flex items-center gap-2 px-4 py-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium text-purple-700'
					>
						<Info className='w-4 h-4' />
						Механика баллов
					</button>
					<button
						onClick={() => setShowCalendar(!showCalendar)}
						className='flex items-center gap-2 px-4 py-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium text-purple-700'
					>
						<Calendar className='w-4 h-4' />
						Календарь
					</button>
				</div>
			</div>

			{/* Progress Tracker */}
			<div className='flex justify-between items-start mb-8 overflow-x-auto pb-4'>
				{steps.map((step, index) => (
					<div
						key={index}
						className='flex flex-col items-center min-w-[100px]'
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: index * 0.1 }}
							className={cn(
								"w-12 h-12 rounded-full flex items-center justify-center mb-3 relative",
								step.status === "completed" &&
									"bg-green-500 text-white",
								step.status === "current" &&
									"bg-indigo-600 text-white animate-pulse",
								step.status === "upcoming" &&
									"bg-gray-200 text-gray-400"
							)}
						>
							<step.icon className='w-6 h-6' />
							{index < steps.length - 1 && (
								<div
									className={cn(
										"absolute left-full top-1/2 -translate-y-1/2 h-0.5 w-[calc(10%+1rem)]",
										step.status === "completed"
											? "bg-green-500"
											: "bg-gray-200"
									)}
								/>
							)}
						</motion.div>
						<div className='text-center'>
							<div className='font-semibold text-sm text-gray-90 mb-1'>
								{step.label}
							</div>
							<div className='text-xs text-gray-500'>
								{step.date}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Deadline Alert */}
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				className='bg-gradient-to-r from-pink-50 to-rose-50 border-l-4 border-pink-500 rounded-xl p-5 mb-4'
			>
				<div className='flex items-start gap-4'>
					<AlertTriangle className='w-6 h-6 text-pink-600 flex-shrink-0 mt-0.5' />
					<div>
						<div className='font-semibold text-pink-700 mb-1'>
							До конца Теста 3: 2 дня 14 часов
						</div>
						<div className='text-sm text-pink-600'>
							Максимум: 150 баллов
						</div>
					</div>
				</div>
			</motion.div>

			<button
				onClick={() => onNotify("События добавлены в календарь")}
				className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium'
			>
				<CalendarPlus className='w-5 h-5' />
				Добавить все события в календарь
			</button>

			{/* Calendar Information */}
			<AnimatePresence>
				{showCalendar && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className='mt-6 overflow-hidden'
					>
						<div className='bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200'>
							<div className='flex items-center gap-3 mb-4'>
								<Calendar className='w-5 h-5 text-blue-600' />
								<h3 className='font-bold text-blue-900'>
									Этапы проведения конкурса
								</h3>
							</div>
							<div className='space-y-4'>
								<div className='bg-white rounded-lg p-4 border border-blue-100'>
									<h4 className='font-semibold text-gray-900 mb-2'>
										📍Городские финалы (ОНЛАЙН)
									</h4>
									<ul className='space-y-1 text-sm text-gray-700'>
										<li className='flex justify-between'>
											<span>1 тур</span>{" "}
											<span>1 апреля — 28 мая 2026</span>
										</li>
										<li className='flex justify-between'>
											<span>2 тур</span>{" "}
											<span>14 апреля — 28 мая 2026</span>
										</li>
										<li className='flex justify-between'>
											<span>3 тур</span>{" "}
											<span>1 мая — 28 мая 2026</span>
										</li>
										<li className='flex justify-between'>
											<span>4 тур</span>{" "}
											<span>14 мая — 28 мая 2026</span>
										</li>
									</ul>
									<p className='text-sm text-gray-600 mt-2'>
										30 мая 2026 по результатам баллов,
										набранных участниками в отборочном
										этапе, будут названы победители в
										областях во всех номинациях областного
										финала.
									</p>
								</div>

								<div className='bg-white rounded-lg p-4 border border-blue-100'>
									<h4 className='font-semibold text-gray-900 mb-2'>
										📍Областные финалы (ОНЛАЙН)
									</h4>
									<p className='text-sm text-gray-700'>
										3 июня 2026 - по результатам баллов,
										набранных участниками в отборочном
										этапе, будут названы победители в
										областях во всех номинациях областного
										финала.
									</p>
								</div>

								<div className='bg-white rounded-lg p-4 border border-blue-100'>
									<h4 className='font-semibold text-gray-900 mb-2'>
										📍Региональные финалы - ИЮНЬ (ОНЛАЙН)
									</h4>
									<ul className='space-y-1 text-sm text-gray-700'>
										<li className='flex justify-between'>
											<span>10 июня 2026</span>{" "}
											<span>
												Дальневосточный и Сибирский
												федеральные округа
											</span>
										</li>
										<li className='flex justify-between'>
											<span>17 июня 2026</span>{" "}
											<span>
												Приволжский и Уральский
												федеральные округа
											</span>
										</li>
										<li className='flex justify-between'>
											<span>24 июня 2026</span>{" "}
											<span>
												Южный и Северо-Кавказский
												федеральные округа
											</span>
										</li>
										<li className='flex justify-between'>
											<span>26 июня 2026</span>{" "}
											<span>
												Центральный и Северо-Западный
												федеральные округа
											</span>
										</li>
									</ul>
								</div>

								<div className='bg-white rounded-lg p-4 border-blue-100'>
									<h4 className='font-semibold text-gray-90 mb-2'>
										📍Финал конкурса (ОФФЛАЙН)
									</h4>
									<p className='text-sm text-gray-700'>
										Финал 21 августа 2026 - Торжественное
										награждение победителей состоится в
										Москве
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Scoring System */}
			<AnimatePresence>
				{showScoring && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className='mt-6 overflow-hidden'
					>
						<div className='bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6'>
							<div className='flex items-center gap-3 mb-4'>
								<Calculator className='w-5 h-5 text-indigo-600' />
								<h3 className='font-bold text-indigo-900'>
									Механика начисления баллов
								</h3>
							</div>
							<div className='space-y-3'>
								{[
									{
										num: "1",
										title: "Отборочный тур: 4 теста",
										desc: "Каждый тест до 150 баллов. Итого до 600 баллов",
										points: "+600 баллов максимум",
									},
									{
										num: "2",
										title: "Победа в городе/области",
										desc: "По сумме баллов отборочного тура",
										points: "+150/100/50 баллов",
									},
									{
										num: "3",
										title: "Победа в регионе/финале",
										desc: "Баллы предыдущих туров обнуляются!",
										points: "+150/100/50 баллов",
									},
									{
										num: "4",
										title: "Итого за этап",
										desc: "Максимум можно набрать за все этапы",
										points: "1200 баллов",
									},
								].map((step, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: i * 0.1 }}
										className='flex gap-4 bg-white rounded-lg p-4'
									>
										<div className='flex-shrink-0 w-8 h-8 bg-indigo-60 text-white rounded-full flex items-center justify-center font-bold'>
											{step.num}
										</div>
										<div className='flex-1'>
											<div className='font-semibold text-gray-900 mb-1'>
												{step.title}
											</div>
											<div className='text-sm text-gray-600 mb-2'>
												{step.desc}
											</div>
											<div className='text-sm font-bold text-indigo-600'>
												{step.points}
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
