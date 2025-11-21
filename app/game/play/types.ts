export interface ShuffledAnswer {
  text: string;
}

export interface GameQuestion {
  id: string;
  question: string;
  brand: string;
  category: string;
  logo_url?: string;
  shuffledAnswers: ShuffledAnswer[];
}

export interface GameSettings {
  questionsPerGame: number;
  timePerQuestion: number;
  maxPointsPerQuestion: number;
}

export interface SelectedAnswer {
  text: string;
  isCorrect?: boolean;
}
