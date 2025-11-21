import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Calendar, Mail, MapPin, Gamepad2 } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  nickname: string;
  email: string;
  city: string;
}

interface GameHistory {
  id: string;
  points: number;
  created_at: string;
}

interface PlayerDetailsModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlayerDetailsModal = ({
  player,
  isOpen,
  onClose,
}: PlayerDetailsModalProps) => {
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (isOpen && player) {
      fetchGameHistory(player.email);
    }
  }, [isOpen, player]);

  const fetchGameHistory = async (email: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .schema('game')
        .from('history_games')
        .select('id, points, created_at')
        .eq('email', email)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setGameHistory(
        data.map(game => ({
          id: game.id,
          points: game.points as number,
          created_at: game.created_at as string,
        }))
      );
    } catch (error: any) {
      toast.error('Ошибка', {
        description:
          error.message || 'Не удалось загрузить историю игр игрока.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const groupedHistory = gameHistory.reduce(
    (acc: { [key: string]: GameHistory[] }, game) => {
      const date = new Date(game.created_at).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(game);
      return acc;
    },
    {}
  );

  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background-dialog max-w-4xl text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Детали игрока: {player.name}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Подробная информация и история игр
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${player.nickname}`}
                />
                <AvatarFallback>{player.nickname.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-semibold">{player.name}</h3>
                <p className="text-muted-foreground">@{player.nickname}</p>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>{player.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>{player.city || 'Город не указан'}</span>
                </div>
                <div className="flex items-center">
                  <Gamepad2 className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>Сыграно игр: {gameHistory.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="mb-4 text-lg font-semibold">История игр</h4>
            <div className="border-border max-h-[400px] overflow-y-auto rounded-md border">
              {isLoading ? (
                <div className="p-8 text-center">Загрузка истории...</div>
              ) : Object.keys(groupedHistory).length === 0 ? (
                <div className="text-muted-foreground p-8 text-center">
                  Нет истории игр.
                </div>
              ) : (
                Object.entries(groupedHistory).map(([date, games]) => (
                  <div key={date} className="mb-4">
                    <h5 className="bg-muted px-4 py-2 text-sm font-semibold">
                      <Calendar className="mr-2 inline h-4 w-4" />
                      {date}
                    </h5>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border">
                          <TableHead className="text-white">Время</TableHead>
                          <TableHead className="text-white">Очки</TableHead>
                          <TableHead className="text-white">ID Игры</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {games.map(game => (
                          <TableRow key={game.id} className="border-border">
                            <TableCell>
                              {new Date(game.created_at).toLocaleTimeString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className="text-lg font-bold"
                              >
                                {game.points}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-xs">
                              {game.id}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
