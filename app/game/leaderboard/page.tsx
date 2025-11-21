"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

import { Trophy, Medal, Award, User } from "lucide-react";
import { useSession } from "@/components/providers/SessionProvider";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { BrandsBanner } from "@/components/banners/BrandsBanner";
import { LeadersItem } from "./components/LeadersItem";
import Image from "next/image";

const topDayImage = "/game/top-day.png";
const topWeeklyImage = "/game/top-weekly.png";
const topMonthImage = "/game/top-month.png";

interface LeaderboardEntry {
	id: string;
	name: string;
	points: number;
	email?: string;
}
interface LeaderData {
	top: LeaderboardEntry | null;
	user: { points: number } | null;
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default function Leaderboard(props: { searchParams: SearchParams }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { user } = useSession();
	const finalScore = searchParams.get("finalScore");
	const supabase = createClient();

	const [dailyData, setDailyData] = useState<LeaderData>({
		top: null,
		user: null,
	});
	const [weeklyData, setWeeklyData] = useState<LeaderData>({
		top: null,
		user: null,
	});
	const [monthlyData, setMonthlyData] = useState<LeaderData>({
		top: null,
		user: null,
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		loadLeaderboards();
	}, [user]);

	const loadLeaderboards = async () => {
		setIsLoading(true);

		try {
			const now = new Date();
			const startOfDay = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate()
			);
			const startOfWeek = new Date(now);
			startOfWeek.setDate(now.getDate() - now.getDay());
			startOfWeek.setHours(0, 0, 0, 0);

			const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

			const [day, week, month] = await Promise.all([
				fetchLeaderData(startOfDay, "best"),
				fetchLeaderData(startOfWeek, "sum"),
				fetchLeaderData(startOfMonth, "sum"),
			]);

			setDailyData(day);
			setWeeklyData(week);
			setMonthlyData(month);
		} catch (error) {
			console.error("Error loading leaderboards:", error);
			toast.error("Ошибка", {
				description: "Не удалось загрузить рейтинг",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const fetchLeaderData = async (
		startDate: Date,
		mode: "best" | "sum"
	): Promise<LeaderData> => {
		const { data, error } = await supabase
			.schema("game")
			.from("history_games")
			.select("id, name, nickname, points, email")
			.gte("created_at", startDate.toISOString());

		if (error) throw error;
		if (!data) return { top: null, user: null };

		const userGames = data.filter((d) => d.email === user?.email);

		let userResult = 0;
		if (mode === "best") {
			userResult = userGames.reduce((max, game) => {
				const points = game.points || 0;
				return points > max ? points : max;
			}, 0);
		} else {
			userResult = userGames.reduce(
				(sum, game) => sum + (game.points || 0),
				0
			);
		}

		const players = new Map<string, { nickname: string; points: number }>();
		data.forEach((game) => {
			const player = players.get(game.email!);
			const points = game.points || 0;
			if (player) {
				if (mode === "best") {
					if (points > player.points) {
						player.points = points;
					}
				} else {
					player.points += points;
				}
			} else {
				players.set(game.email!, {
					nickname: game.nickname || "player",
					points: points,
				});
			}
		});

		const sortedPlayers = Array.from(players.entries()).sort(
			(a, b) => b[1].points - a[1].points
		);

		const topPlayer: LeaderboardEntry | null =
			sortedPlayers.length > 0
				? {
						id: sortedPlayers[0][0],
						email: sortedPlayers[0][0],

						name: sortedPlayers[0][1].nickname,
						points: sortedPlayers[0][1].points,
				  }
				: null;

		return {
			top: topPlayer,
			user: { points: userResult },
		};
	};

	return (
		<section>
			<div className='container mx-auto flex h-full min-h-[calc(100vh-64px)] flex-col space-y-8 pt-24 pb-0'>
				{/* Header */}
				<div className='text-center'>
					<h2 className='text-center text-lg font-black text-white sm:text-3xl lg:text-4xl xl:text-5xl'>
						АВТОМОБИЛЬНАЯ ВИКТОРИНА
					</h2>
				</div>

				<div className='flex flex-1 items-center justify-center gap-20 px-2.5 xl:gap-40'>
					{isLoading && <div>Загрузка...</div>}

					{!isLoading && (
						<div className='space-y-7'>
							{/* Today's Top */}
							{dailyData.top && (
								<LeadersItem
									image={topDayImage}
									title='ТОП дня'
									text='участник, набравший наибольший результат за текущий день'
									topResult={dailyData.top}
									mainResult={dailyData.user}
								/>
							)}
							{weeklyData.top && (
								<LeadersItem
									image={topWeeklyImage}
									title='ТОП недели'
									text='участник, набравший максимально количество очков за текущую неделю'
									topResult={weeklyData.top}
									mainResult={weeklyData.user}
								/>
							)}
							{monthlyData.top && (
								<LeadersItem
									image={topMonthImage}
									title='ТОП месяца'
									text='участник, набравший максимально количество очков за текущий месяц'
									topResult={monthlyData.top}
									mainResult={monthlyData.user}
								/>
							)}
						</div>
					)}
					<div className='hidden h-[371px] w-[321px] shrink-0 lg:block xl:h-[416px] xl:w-[368px]'>
						<Image
							src='/game/leaderbord.png'
							alt='leaderboard'
							width={368}
							height={416}
						/>
					</div>
				</div>

				<Card className='w-full rounded-sm bg-white p-3'>
					<BrandsBanner />
				</Card>
			</div>
		</section>
	);
}
