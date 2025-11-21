'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GameLimitExceededProps {
  timeToNextGame: string;
}

export const GameLimitExceeded = ({
  timeToNextGame,
}: GameLimitExceededProps) => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="game-card p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Сегодня вы уже играли</h2>
        <p className="text-muted-foreground mt-2 mb-6">
          Новая игра будет доступна через:{' '}
          <span className="font-mono text-white">{timeToNextGame}</span>
        </p>
        <Button
          onClick={() => router.push('/game/leaderboard')}
          className="game-button-primary text-white"
        >
          <Trophy className="mr-2 h-4 w-4" />
          Посмотреть рейтинг
        </Button>
      </Card>
    </div>
  );
};
