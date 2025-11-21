import { Button } from '@/components/ui/button';
import { ShuffledAnswer, SelectedAnswer } from '../types';

interface AnswerGridProps {
  answers: ShuffledAnswer[];
  isAnswered: boolean;
  selectedAnswer: SelectedAnswer | null;
  correctAnswer: string | null;
  onAnswerSelect: (answerText: string) => void;
}

const getAnswerButtonClass = (
  answerText: string,
  isAnswered: boolean,
  selectedAnswer: SelectedAnswer | null,
  correctAnswer: string | null
) => {
  if (!isAnswered) {
    return 'game-button-primary text-white border-0 hover:shadow-lg transition-all';
  }

  const isCorrect = answerText === correctAnswer;
  const isSelected = selectedAnswer?.text === answerText;

  if (isCorrect) {
    return 'game-button-secondary text-white border-0';
  }
  if (isSelected && !isCorrect) {
    return 'game-button-tetrary text-white border-0';
  }
  return 'border-0';
};

export const AnswerGrid = ({
  answers,
  isAnswered,
  selectedAnswer,
  correctAnswer,
  onAnswerSelect,
}: AnswerGridProps) => (
  <div className="grid grid-cols-2 gap-4">
    {answers?.map((answerObj, index) => (
      <Button
        key={index}
        onClick={() => onAnswerSelect(answerObj.text)}
        disabled={isAnswered}
        className={`h-auto p-3 font-medium disabled:opacity-100 md:min-h-[80px] md:p-6 md:text-lg ${getAnswerButtonClass(
          answerObj.text,
          isAnswered,
          selectedAnswer,
          correctAnswer
        )}`}
      >
        <div className="text-center">
          <div className="mb-1 text-sm opacity-75">
            {String.fromCharCode(65 + index)}
          </div>
          <div className="text-wrap">{answerObj.text}</div>
        </div>
      </Button>
    ))}
  </div>
);
