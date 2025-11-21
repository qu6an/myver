'use client';

import { Button } from '@/components/ui/button';
import { LogIn, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IGame, IGameSettings, IUser } from '../actions';
import LoginButton from './LoginButton';
import { PlayButtonGame } from './PlayButtonGame';

interface GameButtonsProps {
  game: IGame;
  settings?: IGameSettings;
  user: IUser | null;
  role: string;
}

const GameButtons = ({ game, settings, user, role }: GameButtonsProps) => {
  const router = useRouter();

  const handleStartAnonymousGame = () => {
    router.push('/game/play?anonymous=true');
  };

  if ((game.canPlayToday && user) || role === 'admin') {
    return (
      <div className="w-full space-y-4 sm:max-w-sm">
        <PlayButtonGame user={user} game={game} role={role} />
      </div>
    );
  } else if (!user) {
    return (
      <div className="flex flex-col-reverse items-center gap-5 xl:flex-row">
        {settings?.allowAnonymousPlay && (
          <Button
            onClick={handleStartAnonymousGame}
            size="lg"
            variant="outline"
            className="border-foreground/50 text-foreground hover:bg-foreground/10 hover:text-foreground mx-auto flex h-max w-full flex-col items-center gap-0 bg-transparent px-4 py-3 leading-[100%] font-medium"
          >
            <span className="text-2xl">ИГРАТЬ КАК ГОСТЬ</span>
            <span className="text-lg italic">пробный режим</span>
          </Button>
        )}
        <LoginButton />
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
        <div className="game-card rounded-lg p-6">
          <h3 className="text-foreground mb-2 text-xl font-bold">
            Вы уже играли сегодня!
          </h3>
          {game.todaysBest && (
            <div className="space-y-2">
              <p className="text-muted-foreground">Ваш последний результат:</p>
              <p className="text-game-secondary text-3xl font-bold">
                {game.todaysBest.toLocaleString()}
              </p>
              <p className="text-muted-foreground">очков</p>
            </div>
          )}
        </div>
        <p className="text-muted-foreground">
          Возвращайтесь завтра за новыми вопросами!
        </p>
      </div>
    );
  }
};

export default GameButtons;
