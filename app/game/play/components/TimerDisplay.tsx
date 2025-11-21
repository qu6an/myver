"use client";

import { Card } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";

interface TimerDisplayProps {
	timeLeft: number;
	timePerQuestion: number;
	isAnswered: boolean;
}

const getProgressColor = (timeLeft: number, timePerQuestion: number) => {
	const percentage = timeLeft / timePerQuestion;
	if (percentage > 0.6) return "hsl(120, 100%, 40%)"; // Green
	if (percentage > 0.3) return "hsl(60, 100%, 50%)"; // Yellow
	return "hsl(0, 100%, 50%)"; // Red
};

const getCurrentProgress = (
	timeLeft: number,
	timePerQuestion: number,
	isAnswered: boolean,
	gameStarted: boolean
) => {
	if (isAnswered || timeLeft <= 0) {
		return 100; // Show full bar when answered or time is up
	}
	if (!gameStarted) {
		return 0;
	}
	const elapsedTime = timePerQuestion - timeLeft;
	return Math.min(100, Math.max(0, (elapsedTime / timePerQuestion) * 100));
};

export const TimerDisplay = ({
	timeLeft,
	timePerQuestion,
	isAnswered,
}: TimerDisplayProps) => {
	// We assume game has started if this component is rendered
	const gameStarted = true;

	return (
		<Card className='game-card border-none bg-transparent p-0'>
			<div className='space-y-3'>
				{/* <div className="flex items-center justify-between">
          <span className="font-medium text-white">Время:</span>
          <span className="text-game-secondary font-bold">
            {Math.ceil(timeLeft / 1000)}с
          </span>
        </div> */}
				<Progress
					value={getCurrentProgress(
						timeLeft,
						timePerQuestion,
						isAnswered,
						gameStarted
					)}
					className={`h-3 bg-blue-500 ${
						isAnswered || timeLeft <= 0
							? ""
							: "transition-all duration-75 ease-linear"
					}`}
					style={
						{
							"--progress-color": getProgressColor(
								timeLeft,
								timePerQuestion
							),
						} as React.CSSProperties
					}
				/>
			</div>
		</Card>
	);
};
