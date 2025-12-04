import React from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import ProgressTracker from "./components/ProgressTracker";
import TestCard from "./components/TestCard";
import TeamCard from "./components/TeamCard";
import WorkshopCard from "./components/WorkshopCard";
import PrizesGrid from "./components/PrizesGrid";
import Footer from "./components/Footer";
import Image from "next/image";

export default function App() {
	const nav = [
		{
			id: "main",
			title: "Главная",
			children: [{ id: "dash", title: "Панель управления" }],
		},
		{
			id: "projects",
			title: "Проекты",
			children: [
				{ id: "everycar", title: "EVERYCAR" },
				{ id: "quiz", title: "АВТОМОБИЛЬНАЯ ВИКТОРИНА" },
				{
					id: "service",
					title: "АВТОСЕРВИС ГОДА",
					children: [
						{ id: "tasks", title: "Мои задания", active: true },
					],
				},
			],
		},
		{
			id: "academy",
			title: "Академия",
			children: [{ id: "tests", title: "Тесты" }],
		},
	];

	const stats = [
		{ label: "Место в Москве", value: 285 },
		{ label: "Место в области", value: 15 },
		{ label: "Место в ЦФО", value: 87 },
	];

	const steps = [
		{ label: "Январь", date: "Тесты 1-2", state: "completed" as const },
		{ label: "Февраль", date: "Тест 2", state: "completed" as const },
		{ label: "Март", date: "Тесты 3-4", state: "current" as const },
		{
			label: "Апрель",
			date: "22.04 - Регион. финал",
			state: "pending" as const,
		},
		{
			label: "Май",
			date: "28.05 - Финал Москва",
			state: "pending" as const,
		},
	];

	const tests = [
		{
			id: "t3",
			title: "ТЕСТ 3 | 1-10 МАРТА",
			status: "active",
			progressPercent: 30,
			meta: "Осталось: 2 дня 14 часов",
		},
		{
			id: "t2",
			title: "ТЕСТ 2 | 14-28 ФЕВРАЛЯ",
			status: "completed",
			progressPercent: 90,
			meta: "Завершено",
		},
		{
			id: "t4",
			title: "ТЕСТ 4 | 10-23 МАРТА",
			status: "upcoming",
			progressPercent: 0,
			meta: "Доступно через: 7 дней",
		},
	];

	const members = [
		{
			id: "m1",
			role: "Руководитель",
			name: "█████",
			score: 320,
			rank: "Топ-5 в Москве",
		},
		{
			id: "m2",
			role: "Мастер-консультант",
			name: "█████",
			score: 275,
			rank: "Топ-15 в Москве",
		},
		{
			id: "m3",
			role: "Механик",
			name: "Алексей Волков (Вы)",
			score: 285,
			rank: "Топ-15 в Москве",
		},
	];

	function handlePrimaryTestAction(id: string) {
		alert("Открыть тест: " + id);
	}

	return (
		<div className='min-h-screen bg-slate-50 p-4'>
			<div className='max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6'>
				<main className='flex flex-col gap-6'>
					<Header user='Алексей' />

					<div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6'>
						<div className='flex flex-col gap-6'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								{stats.map((s) => (
									<StatCard
										key={s.label}
										label={s.label}
										value={s.value.toString()}
									/>
								))}
							</div>

							<ProgressTracker steps={steps} />

							<div className='grid grid-cols-1 gap-4'>
								<div className='bg-white rounded-2xl p-4 shadow'>
									<div className='flex items-center justify-between mb-4'>
										<div className='font-semibold'>
											Все тесты
										</div>
										<button className='bg-indigo-600 text-white px-3 py-2 rounded-lg'>
											Обновить
										</button>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
										{tests.map((t) => (
											<TestCard
												key={t.id}
												model={t}
												onPrimary={
													handlePrimaryTestAction
												}
											/>
										))}
									</div>
								</div>

								<TeamCard
									members={members}
									onNotify={() => {}}
								/>
							</div>
						</div>

						<div className='flex flex-col gap-6'>
							<div className='bg-white rounded-2xl p-4 shadow'>
								<div className='font-semibold mb-3'>
									Генеральный партнер
								</div>
								<div className='flex items-center gap-4'>
									<Image
										width={20}
										height={20}
										alt='img'
										src='/partner.svg'
										className='w-20 h-20 object-contain'
									/>
									<div>
										<div className='font-bold'>
											LYNXauto
										</div>
										<div className='text-sm text-slate-500'>
											Официальный генеральный партнер
											конкурса АВТОСЕРВИС &#34;ГОДА
											2026&#34;
										</div>
									</div>
								</div>
							</div>

							<WorkshopCard onNotify={() => {}} />

							<PrizesGrid />

							<div className='bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-2xl p-6 shadow text-center'>
								<div className='text-2xl font-bold mb-2'>
									Вы в 35 баллах от ТОП-10 Москвы!
								</div>
								<p className='text-sm opacity-90 mb-4'>
									Пройдите Тест 3 на максимальный результат и
									повысьте шансы на выход в региональный
									финал.
								</p>
								<button className='bg-white text-indigo-600 rounded-lg px-4 py-2 font-semibold'>
									К тестированию
								</button>
							</div>
						</div>
					</div>

					<Footer />
				</main>
			</div>
		</div>
	);
}
