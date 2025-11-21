import { Button } from "../../components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { EventsButton } from "./components/EventsButton";
import { BrandsBanner } from "@/components/banners/BrandsBanner";
import { Card } from "../../components/ui/card";
import { getGameData } from "./actions";

export default async function EndGamePage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		redirect("/game");
	}

	const data = await getGameData(user.id);

	if (!data.ok) {
		return (
			<div className='flex h-full w-full items-center justify-center'>
				<p className='text-center text-red-500'>{data.error}</p>
			</div>
		);
	}

	const questionPerGame = data.gameSettings?.questions_per_game ?? 0;
	const maxPointsPerQuestion =
		data.gameSettings?.max_points_per_question ?? 0;

	const maxScores = questionPerGame * maxPointsPerQuestion;
	const score = data.historyGame?.points ?? 0;
	const correctAnswers = data.historyGame?.correct_answers ?? 0;
	const totalQuestions = data.historyGame?.total_questions ?? 0;
	const ticket = data.ticket;
	const endGameData = data.endGameData;

	return (
		<section className='flex flex-col items-center p-4 pt-28'>
			<div className='container'>
				<h1 className='mb-10 text-center text-xl font-black text-white sm:block sm:text-3xl lg:text-4xl xl:text-5xl'>
					АВТОМОБИЛЬНАЯ ВИКТОРИНА
				</h1>
				<div className='grid gap-4 lg:grid-cols-2'>
					<div className='flex flex-col justify-between text-white'>
						<div className='max-w-sm lg:max-w-none'>
							<h2 className='text-2xl lg:text-4xl xl:text-5xl'>
								{endGameData?.title || ""}
							</h2>
							<div className='mx-auto mt-8 space-y-4 lg:mt-12'>
								<div className='grid w-full grid-cols-[130px_1fr] gap-1 lg:w-[610px] lg:grid-cols-[217px_1fr] lg:gap-4 lg:text-2xl'>
									<p>Верно ответили:</p>
									<p className='font-medium text-nowrap text-[#FA6366] lg:font-bold'>
										{correctAnswers} / {totalQuestions}
									</p>
								</div>
								<div className='grid w-full grid-cols-[130px_1fr] gap-1 lg:w-[610px] lg:grid-cols-[217px_1fr] lg:gap-4 lg:text-2xl'>
									<p>Набрали очков:</p>
									<p className='font-medium text-nowrap text-[#FA6366] lg:font-bold'>
										{score?.toLocaleString("ru-RU") || 0} /{" "}
										{maxScores?.toLocaleString("ru-RU") ||
											0}
									</p>
								</div>
								<div className='grid w-full grid-cols-[130px_1fr] gap-1 lg:w-[610px] lg:grid-cols-[217px_1fr] lg:gap-4 lg:text-2xl'>
									<p>Ваш билет:</p>
									<p className='font-medium text-nowrap text-[#FA6366] lg:font-bold'>
										{ticket?.number || ""}
									</p>
								</div>
							</div>
						</div>
						<div className='mt-5 max-w-[500px] lg:mt-0'>
							<p>{endGameData?.description || ""}</p>
							<div className='mt-5 space-y-3'>
								<EventsButton
									className='lg:hidden'
									text={endGameData?.text_link || ""}
									link={endGameData?.link || ""}
								/>
								<Button
									asChild
									variant={"outline"}
									className='w-full border border-gray-300 bg-[#4378ED] text-white hover:bg-[#4378ED]/90 lg:w-full'
								>
									<Link href='/game/leaderboard'>
										Посмотреть рейтинг
									</Link>
								</Button>
								<Button
									asChild
									variant={"outline"}
									className='w-full border border-gray-300 bg-[#4378ED] text-white hover:bg-[#4378ED]/90 lg:w-full'
								>
									<Link href='/game'>На главную</Link>
								</Button>
							</div>
						</div>
					</div>
					<div className='hidden flex-col items-center lg:flex'>
						<Image
							src='/game/end-game-bg.png'
							alt='end game'
							width={536}
							height={536}
							className='h-[368px] w-[368px]'
						/>
						<EventsButton
							text={endGameData?.text_link || ""}
							link={endGameData?.link || ""}
						/>
					</div>
				</div>
				<Card className='mt-5 rounded-sm bg-gray-200 p-3 lg:rounded-xl'>
					<BrandsBanner />
				</Card>
			</div>
		</section>
	);
}
