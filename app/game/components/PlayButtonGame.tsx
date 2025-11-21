"use client";
import { Button } from "../../components/ui/button";
import React from "react";
import { PlayButtonProps } from "../types/landing";
import { useRouter } from "next/navigation";

export const PlayButtonGame = ({ user, game, role }: PlayButtonProps) => {
	const router = useRouter();

	const handleStartGame = () => {
		if (!user) {
			router.push("/login");
		} else if (game.canPlayToday || role === "admin") {
			router.push("/game/play");
		}
	};
	return (
		<Button
			onClick={handleStartGame}
			size='lg'
			variant='outline'
			className='border-foreground/50 text-foreground hover:text-foreground mx-auto flex h-max w-full flex-col items-center gap-0 bg-orange-600 px-4 py-3 leading-[100%] font-medium hover:bg-orange-700'
		>
			<span className='text-2xl'>ИГРАТЬ</span>
			<span className='text-sm tracking-normal italic'>
				борьба за призы
			</span>
		</Button>
	);
};
