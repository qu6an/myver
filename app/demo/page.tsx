"use client";

import { AutoserviceCard } from "../components/autoservice/AutoserviceCard";
import { AutoserviceProject } from "../components/autoservice/types";
import {
	HelpCircle,
	Users,
	Crown,
	Award,
	GraduationCap,
	Headset,
} from "lucide-react";

const demoProjects: AutoserviceProject[] = [
	{
		id: "quiz",
		icon: HelpCircle,
		title: "Автомобильная викторина",
		description:
			"Зарабатывайте очки за правильные ответы. Победители получают реальные призы и баллы.",
		linkText: "Правила PDF",
		badge: { text: "Активно", variant: "active" },
		link: "#",
	},
	{
		id: "everycar",
		icon: Users,
		title: "EVERYCAR",
		description:
			"Постоянная программа мотивации — уровни, задания, бонусы. Станьте частью крупнейшего сообщества СТО.",
		linkText: "Присоединиться",
		badge: { text: "Идёт набор", variant: "open" },
		featured: true,
	},
	{
		id: "contest",
		icon: Crown,
		title: "Автосервис года",
		description:
			"Конкурс с учётом показателей и репутации. Номинации и призы для лучших автосервисов страны.",
		linkText: "Правила PDF",
		badge: { text: "Скоро", variant: "soon" },
		link: "#",
	},
	{
		id: "accreditation",
		icon: Award,
		title: "Аккредитация производителем",
		description:
			"Получите официальную аккредитацию от ведущих производителей автокомпонентов.",
		linkText: "Узнать больше",
		badge: { text: "Доступно", variant: "active" },
	},
	{
		id: "academy",
		icon: GraduationCap,
		title: "Академия СТО",
		description:
			"Мы обучаем автосервисные предприятия эффективным технологиям управления.",
		linkText: "Узнать больше",
		badge: { text: "Доступно", variant: "active" },
	},
	{
		id: "myteam",
		icon: Headset,
		title: "MyTeam",
		description:
			"Партнерская программа с услугами колл-центра для СТО. NPS-опросы и информирование клиентов.",
		linkText: "Узнать больше",
		badge: { text: "Доступно", variant: "active" },
	},
];

export default function DemoPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20'>
			<div className='container mx-auto px-6'>
				<div className='text-center mb-16'>
					<h1 className='text-5xl font-extrabold mb-4 text-gray-900'>
						Демо компонентов АВТОКОМ
					</h1>
					<p className='text-lg text-gray-600'>
						Модульные компоненты для автосервисной платформы
					</p>
				</div>

				<section className='mb-20'>
					<h2 className='text-3xl font-bold mb-8 text-gray-900'>
						Default вариант
					</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{demoProjects.slice(0, 3).map((project, index) => (
							<AutoserviceCard
								key={project.id}
								project={project}
								variant='default'
								index={index}
								onAction={(id) =>
									console.log("Action clicked:", id)
								}
							/>
						))}
					</div>
				</section>

				<section className='mb-20'>
					<h2 className='text-3xl font-bold mb-8 text-gray-900'>
						Featured вариант
					</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{demoProjects.slice(1, 2).map((project, index) => (
							<AutoserviceCard
								key={project.id}
								project={project}
								variant='featured'
								index={index}
								onAction={(id) =>
									console.log("Action clicked:", id)
								}
							/>
						))}
					</div>
				</section>

				<section className='mb-20'>
					<h2 className='text-3xl font-bold mb-8 text-gray-900'>
						С анимацией Twinkle
					</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{demoProjects.slice(2, 3).map((project, index) => (
							<AutoserviceCard
								key={project.id}
								project={project}
								variant='default'
								index={index}
								showTwinkle={true}
								onAction={(id) =>
									console.log("Action clicked:", id)
								}
							/>
						))}
					</div>
				</section>

				<section className='mb-20'>
					<h2 className='text-3xl font-bold mb-8 text-gray-900'>
						Glass вариант
					</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{demoProjects.slice(3, 6).map((project, index) => (
							<AutoserviceCard
								key={project.id}
								project={project}
								variant='glass'
								index={index}
								onAction={(id) =>
									console.log("Action clicked:", id)
								}
							/>
						))}
					</div>
				</section>

				<section>
					<h2 className='text-3xl font-bold mb-8 text-gray-900'>
						Все проекты
					</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{demoProjects.map((project, index) => (
							<AutoserviceCard
								key={project.id}
								project={project}
								variant={
									project.featured ? "featured" : "default"
								}
								index={index}
								showTwinkle={index === 2}
								onAction={(id) =>
									console.log("Action clicked:", id)
								}
							/>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
