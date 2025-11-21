import { Button } from "../../components/ui/button";
import Link from "next/link";
import React from "react";
const item = [
	{
		title: "Очки",
		content: "<b>Очки</b> начисляются за правильность и скорость ответов.",
		footer: "Максимум очков за игру: <br /> 450 000.",
	},

	{
		title: "Билеты",
		content: "<b>Билеты</b> — это пропуск в еженедельный розыгрыш.",
		footer: "Каждый день, когда вы отвечаете на все 30 вопросов, вы получаете 1 билет.",
	},
];
export default function FourSection() {
	return (
		<div className='text-white'>
			<h1 className='text-center text-2xl font-black sm:mx-auto sm:max-w-xl sm:text-4xl lg:max-w-4xl lg:text-5xl xl:text-6xl'>
				Как начисляются очки и активируются билеты
			</h1>
			<Button
				asChild
				className='mx-auto mt-3 flex w-max py-1 text-center leading-0 sm:mt-3 sm:text-xl lg:mt-5 lg:text-2xl lg:hover:underline xl:py-3'
			>
				<Link
					href='https://disk.yandex.ru/i/udwKcZd4b-aIng'
					target='_blank'
				>
					Полные правила
				</Link>
			</Button>
			<div className='mx-auto mt-8 grid max-w-full grid-cols-1 gap-3 sm:max-w-sm lg:mt-10 lg:max-w-max lg:grid-cols-2 xl:mt-20'>
				{item.map((item, index) => (
					<div
						key={index}
						className='rounded-xl bg-gray-900 px-3 py-3 lg:max-w-md'
					>
						<h3 className='text-xl font-black'>{item.title}</h3>

						<p
							className='mt-2.5'
							dangerouslySetInnerHTML={{ __html: item.content }}
						></p>
						<p
							className='mt-5 font-medium'
							dangerouslySetInnerHTML={{ __html: item.footer }}
						></p>
					</div>
				))}
			</div>
		</div>
	);
}
