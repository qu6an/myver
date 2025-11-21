'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface GameEndModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  isAnonymous?: boolean;
  askForAuth?: boolean;
}

interface EndGameInfo {
  title: string;
  description: string;
  text: string;
  text_link: string;
  link: string;
}

interface UserRank {
  position: number;
  totalPlayers: number;
}

export const GameEndModal = ({
  isOpen,
  onClose,
  score,
  totalQuestions,
  isAnonymous,
  askForAuth,
}: GameEndModalProps) => {
  const router = useRouter();
  const [endGameInfo, setEndGameInfo] = useState<EndGameInfo | null>(null);
  const [userRank, setUserRank] = useState<UserRank | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (isOpen && !isAnonymous) {
      fetchEndGameData();
    } else if (isAnonymous) {
      setLoading(false);
    }
  }, [isOpen, score]);

  const fetchEndGameData = async () => {
    try {
      setLoading(true);

      // Fetch end game info
      const { data: endGameData } = await supabase
        .schema('game')
        .from('info_win_game')
        .select('*')
        .limit(1)
        .single();

      if (endGameData) {
        const data = {
          title: endGameData.title || '',
          description: endGameData.description || '',
          text: endGameData.text || '',
          text_link: endGameData.text_link || '',
          link: endGameData.link || '',
        };
        setEndGameInfo(data);
      }

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's current rating and calculate rank
      const { data: userRating } = await supabase
        .schema('game')
        .from('ratings')
        .select('points')
        .eq('user_email', user.email as string)
        .single();

      if (userRating) {
        // Count how many users have higher scores
        const { count: higherScores } = await supabase
          .schema('game')
          .from('ratings')
          .select('*', { count: 'exact', head: true })
          .gt('points', userRating.points);

        // Count total players
        const { count: totalPlayers } = await supabase
          .schema('game')
          .from('ratings')
          .select('*', { count: 'exact', head: true });

        setUserRank({
          position: (higherScores || 0) + 1,
          totalPlayers: totalPlayers || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching end game data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLeaderboard = () => {
    onClose();
    router.push('/game/leaderboard');
  };

  const handleClose = () => {
    onClose();

    router.push('/game');
  };

  const handleLogin = () => {
    onClose();
    router.push('/login');
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'Превосходный результат! 🏆';
    if (percentage >= 80) return 'Отличная работа! ⭐';
    if (percentage >= 70) return 'Хороший результат! 👍';
    if (percentage >= 60) return 'Неплохо, но можно лучше! 💪';
    return 'Продолжайте изучать автомобили! 📚';
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="game-theme game-card border-game-primary mx-auto max-w-2xs md:max-w-md [&>button]:hidden">
        {askForAuth && isAnonymous ? (
          <>
            <DialogHeader className="space-y-4 text-center">
              <DialogTitle className="text-2xl font-bold text-white">
                Продолжить викторину
              </DialogTitle>
              <p className="text-gray-400">
                Вы ответили на {totalQuestions} пробных вопросов. Чтобы играть и
                сохранять свой результат, пожалуйста, войдите или
                зарегистрируйтесь.
              </p>
            </DialogHeader>
            <div className="flex flex-col space-y-3 pt-4">
              <Button
                onClick={handleLogin}
                className="w-full bg-orange-600 text-white hover:bg-orange-700"
              >
                Войти / Зарегистрироваться
              </Button>
              <Button
                onClick={handleClose}
                variant={'outline'}
                className="hover:bg-game-background-end w-full border border-gray-300 bg-transparent text-white"
              >
                Закрыть
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="space-y-4 text-center">
              <div className="from-game-primary to-game-secondary mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br">
                <Trophy className="h-8 w-8 text-yellow-400" />
              </div>

              <DialogTitle className="text-center text-2xl font-bold text-white">
                {endGameInfo?.title || 'Игра завершена!'}
              </DialogTitle>

              <p className="text-center text-gray-400">
                {endGameInfo?.description || 'Спасибо за участие в EVERYCAR!'}
              </p>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Score Display */}
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Target className="text-game-secondary h-5 w-5" />
                  <span className="font-medium text-white">Ваш результат:</span>
                </div>

                <div
                  className={`text-4xl font-bold ${getScoreColor(
                    score,
                    totalQuestions
                  )}`}
                >
                  {score} / {totalQuestions}
                </div>

                <Badge
                  variant="outline"
                  className="border-game-primary bg-game-primary/20 text-white"
                >
                  {Math.round((score / totalQuestions) * 100)}% правильных
                  ответов
                </Badge>

                <p className="text-sm font-medium text-gray-300">
                  {getPerformanceMessage(score, totalQuestions)}
                </p>
              </div>

              {/* Rank Display */}
              {!loading && userRank && !isAnonymous && (
                <div className="space-y-2 rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium text-white">
                      Ваше место в рейтинге:
                    </span>
                  </div>

                  <div className="text-2xl font-bold text-yellow-400">
                    #{userRank.position}
                  </div>

                  <p className="text-xs text-gray-400">
                    из {userRank.totalPlayers} игроков
                  </p>
                </div>
              )}

              {/* Additional Message */}
              {endGameInfo?.text && !isAnonymous && (
                <div className="border-game-primary/30 bg-accent rounded-lg border p-3 text-center">
                  <p className="text-sm text-gray-200">{endGameInfo.text}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 pt-4">
              {!isAnonymous && (
                <Button
                  onClick={handleGoToLeaderboard}
                  className="w-full bg-orange-600 text-white hover:bg-orange-700"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  {endGameInfo?.text_link || 'Посмотреть рейтинг'}
                </Button>
              )}

              <Button
                onClick={handleClose}
                variant={'outline'}
                className="hover:bg-game-background-end w-full border border-gray-300 bg-transparent text-white"
              >
                На главную
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
