import { Button } from '@/components/ui/button';

interface GameControlsProps {
  onAbandonGame: () => void;
}

export const GameControls = ({ onAbandonGame }: GameControlsProps) => (
  <div className="flex justify-center">
    <Button
      onClick={onAbandonGame}
      variant="outline"
      className="border-border hover:bg-muted text-white"
    >
      Завершить игру
    </Button>
  </div>
);
