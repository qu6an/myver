"use client";

import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";

interface GameNotStartedProps {
	onRetryAction: () => void;
}

export const GameNotStarted = ({ onRetryAction }: GameNotStartedProps) => {
	const router = useRouter();
	return (
		<div className='flex min-h-screen items-center justify-center'>
			<Card className='game-card p-8'>
				<div className='space-y-4 text-center'>
					<h2 className='text-2xl font-bold text-white'>
						Игра не загружена
					</h2>
					<p className='text-muted-foreground'>
						Не удалось получить данные для игры. Попробуйте еще раз.
					</p>
					<div className='flex justify-center gap-4'>
						<Button
							onClick={onRetryAction}
							className='game-button-primary text-white'
						>
							Попробовать снова
						</Button>
						<Button
							onClick={() => router.push("/game")}
							variant='outline'
							className='border-border hover:bg-muted text-white'
						>
							Вернуться на главную
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};
