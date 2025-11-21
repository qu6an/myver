"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/providers/SessionProvider";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import {
	submitAnswer,
	saveGameResult as saveGameResultAction,
	getQuestionById,
} from "../actions";
import { GameQuestion, GameSettings, SelectedAnswer } from "../types";

interface GameLifecycleProps {
	gameId: string | null;
	initialQuestion: GameQuestion | null;
	gameSettings: GameSettings;
	isAnonymous: boolean;
	onNextQuestion: () => void;
	onGameEnd: () => void;
}

export const useGameLifecycle = ({
	gameId,
	initialQuestion,
	gameSettings,
	isAnonymous,
	onNextQuestion,
	onGameEnd,
}: GameLifecycleProps) => {
	const router = useRouter();
	const { user, session } = useSession();
	const supabase = createClient();

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [currentQuestionData, setCurrentQuestionData] =
		useState<Partial<GameQuestion> | null>(initialQuestion);
	const [score, setScore] = useState(0);
	const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | null>(
		null
	);
	const [isAnswered, setIsAnswered] = useState(false);
	const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
	const [roundState, setRoundState] = useState<
		"showing_brand" | "showing_question"
	>("showing_brand");

	useEffect(() => {
		setCurrentQuestionData(initialQuestion);
		setRoundState("showing_brand");
	}, [initialQuestion]);

	const totalQuestions = gameSettings.questionsPerGame;

	const saveGameResult = useCallback(async () => {
		if (!gameId) return;
		try {
			const result = await saveGameResultAction({
				totalScore: score,
				correctAnswers: correctAnswersCount,
				totalQuestions: totalQuestions,
				gameId: gameId,
				accessToken: session?.access_token,
				isAnonymous,
			});

			if (result.error) throw new Error(result.error);
			onGameEnd();
		} catch (error: any) {
			console.error("Error saving game result:", error);
			toast.error("Ошибка", {
				description: error.message || "Не удалось сохранить результат",
			});
			onGameEnd();
		}
	}, [
		gameId,
		score,
		correctAnswersCount,
		totalQuestions,
		session,
		isAnonymous,
		onGameEnd,
	]);

	const loadNextQuestion = useCallback(
		async (nextQuestionId: string | null) => {
			if (!nextQuestionId) {
				if (!isAnonymous) {
					await saveGameResult();
				} else {
					onGameEnd();
				}
				return;
			}

			const nextQuestionData = await getQuestionById(
				nextQuestionId,
				false
			); // Fetch brand info first
			if (nextQuestionData.error || !nextQuestionData.id) {
				toast.error("Ошибка", {
					description: "Не удалось загрузить следующий вопрос.",
				});
				// End game gracefully
				if (!isAnonymous) await saveGameResult();
				else onGameEnd();
				return;
			}

			setCurrentQuestionIndex((prev) => prev + 1);
			setCurrentQuestionData(nextQuestionData as Partial<GameQuestion>);
			setSelectedAnswer(null);
			setCorrectAnswer(null);
			setIsAnswered(false);
			setRoundState("showing_brand");
			onNextQuestion();
		},
		[isAnonymous, saveGameResult, onGameEnd, onNextQuestion]
	);

	const handleAnswerSelect = async (
		answerText: string,
		timeTaken: number
	) => {
		if (isAnswered || !gameId || !currentQuestionData) return;

		setIsAnswered(true);

		if (!currentQuestionData.id) return; // Should not happen, but for type safety
		const result = await submitAnswer({
			gameId: gameId,
			questionId: currentQuestionData.id,
			answer: answerText,
			timeTaken: timeTaken,
			accessToken: session?.access_token,
			isAnonymous,
		});

		if (result.error || !("isCorrect" in result)) {
			toast.error("Ошибка", { description: result.error });
			setTimeout(() => loadNextQuestion(null), 2000); // End game on error
			return;
		}

		setSelectedAnswer({ text: answerText, isCorrect: result.isCorrect });
		if (result.correctAnswer) {
			setCorrectAnswer(result.correctAnswer);
		}

		if (result.isCorrect) {
			setScore((prev) => prev + result.score);
			setCorrectAnswersCount((prev) => prev + 1);
		}

		setTimeout(() => {
			loadNextQuestion(result.nextQuestionId ?? null);
		}, 2000);
	};

	const handleAbandonGame = async () => {
		// ... (logic remains the same)
	};

	const handleShowQuestion = async () => {
		if (!currentQuestionData?.id) return;
		const fullQuestion = await getQuestionById(
			currentQuestionData.id,
			true
		);
		if (fullQuestion.error || !fullQuestion.shuffledAnswers) {
			toast.error("Ошибка", {
				description: "Не удалось загрузить данные вопроса.",
			});
			return;
		}
		setCurrentQuestionData(fullQuestion as GameQuestion);
		setRoundState("showing_question");
		onNextQuestion(); // This will reset the timer
	};

	return {
		currentQuestion: currentQuestionIndex,
		currentQuestionData,
		score,
		correctAnswersCount,
		selectedAnswer,
		isAnswered,
		correctAnswer,
		roundState,
		handleAnswerSelect,
		handleShowQuestion,
		handleAbandonGame,
	};
};
