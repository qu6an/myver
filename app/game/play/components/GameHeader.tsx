interface GameHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  maxPossibleScore: number;
  isAnonymous: boolean;
}

export const GameHeader = ({
  currentQuestion,
  totalQuestions,
  score,
  maxPossibleScore,
  isAnonymous,
}: GameHeaderProps) => (
  <div className="space-y-2 text-center">
    <h1 className="text-xl font-bold text-white lg:text-2xl xl:text-3xl">
      Вопрос {currentQuestion + 1} из {totalQuestions}
    </h1>

    <p className="text-sm text-white lg:text-xl">
      Очки: {score.toLocaleString()} / {maxPossibleScore.toLocaleString()}
    </p>
  </div>
);
