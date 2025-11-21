import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Trophy,
  Medal,
  Award,
  Calendar,
  Download,
  RefreshCcw,
  Users,
  FileSpreadsheet,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { getWeekRanges } from '../shared/getWeekRanges';
import { getMonthRanges } from '../shared/getMonthRanges';
import { Input } from '@/components/ui/input';
import { runLottery } from '../actions/runLottery';
import { deleteWinner } from '../actions/deleteWinner';

interface Winner {
  email: string;
  ticket: string;
  name: string;
  nickname: string;
}

interface WeeklyWinner {
  id: string;
  weekly: string;
  winners: Winner[];
}

interface RatingEntry {
  id: string;
  name: string;
  nickname: string;
  email: string;
  points: number;
  rank: number;
  gamesPlayed: number;
  lastGame: string;
  city: string;
}

export const RatingsManager = () => {
  const [dailyRatings, setDailyRatings] = useState<RatingEntry[]>([]);
  const [weeklyRatings, setWeeklyRatings] = useState<RatingEntry[]>([]);
  const [weeklyWinners, setWeeklyWinners] = useState<WeeklyWinner[]>([]);
  const [monthlyRatings, setMonthlyRatings] = useState<RatingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState<string>('current');
  const [selectedMonth, setSelectedMonth] = useState<string>('current');
  const [lotteryWeek, setLotteryWeek] = useState<string>('current');
  const [numWinners, setNumWinners] = useState<number>(1);
  const [availableWeeks, setAvailableWeeks] = useState<
    { value: string; label: string }[]
  >([]);
  const [availableMonths, setAvailableMonths] = useState<
    { value: string; label: string }[]
  >([]);

  const supabase = createClient();

  useEffect(() => {
    loadRatingsData(selectedWeek, selectedMonth);
  }, [selectedWeek, selectedMonth]);

  const loadRatingsData = async (
    weekFilter: string = 'current',
    monthFilter: string = 'current'
  ) => {
    setIsLoading(true);

    try {
      // Load daily ratings from history_games for the current day
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data: dailyGamesData, error: dailyGamesError } = await supabase
        .schema('game')
        .from('history_games')
        .select('*')
        .gte('created_at', today.toISOString())
        .lt('created_at', tomorrow.toISOString())
        .order('points', { ascending: false });

      if (dailyGamesError) throw dailyGamesError;

      // Load profiles to get city information
      const { data: profiles, error: profilesError } = await supabase
        .schema('public')
        .from('users')
        .select('email, city, first_name, last_name, nick_name_game');

      if (profilesError) throw profilesError;

      // Create a map for quick profile lookup
      const profileMap = new Map();
      profiles.forEach(profile => {
        profileMap.set(profile.email, profile);
      });

      // Format daily ratings
      const dailyRatingsMap = new Map();
      dailyGamesData.forEach(game => {
        const existing = dailyRatingsMap.get(game.email);
        if (!existing || (game.points || 0) > existing.points) {
          dailyRatingsMap.set(game.email, game);
        }
      });

      const formattedDailyRatings = Array.from(dailyRatingsMap.values())
        .sort((a, b) => (b.points || 0) - (a.points || 0))
        .map((game, index) => {
          const profile = profileMap.get(game.email);
          return {
            id: game.id,
            name:
              `${profile?.first_name || ''} ${
                profile?.last_name || ''
              }`.trim() || 'Неизвестно',
            nickname: profile?.nick_name_game || 'player',
            email: game.email || '',
            points: game.points || 0,
            rank: index + 1,
            gamesPlayed: dailyGamesData.filter(g => g.email === game.email)
              .length,
            lastGame: game.created_at,
            city: profile?.city || 'Не указан',
          };
        });

      setDailyRatings(formattedDailyRatings);

      // Load available weeks using the new function
      const weekRanges = getWeekRanges();
      const weeksForSelect = weekRanges.map(range => {
        const [start, end] = range.split('_');
        return {
          value: range,
          label: `Неделя: ${new Date(start).toLocaleDateString()} - ${new Date(
            end
          ).toLocaleDateString()}`,
        };
      });

      setAvailableWeeks([
        { value: 'current', label: 'Текущая неделя' },
        ...weeksForSelect,
      ]);

      // Load available months
      const monthRanges = getMonthRanges();
      const monthsForSelect = monthRanges.map(range => {
        const [start, end] = range.split('_');
        return {
          value: range,
          label: new Date(start).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          }),
        };
      });
      setAvailableMonths([
        { value: 'current', label: 'Текущий месяц' },
        ...monthsForSelect,
      ]);

      // Load weekly ratings based on selected week
      let weeklyQuery = supabase
        .schema('game')
        .from('history_games')
        .select('*');

      if (weekFilter === 'current') {
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        const monday = new Date(today.getFullYear(), today.getMonth(), diff);
        monday.setHours(0, 0, 0, 0);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);

        weeklyQuery = weeklyQuery
          .gte('created_at', monday.toISOString())
          .lte('created_at', sunday.toISOString());
      } else {
        const [startDate, endDate] = weekFilter.split('_');
        weeklyQuery = weeklyQuery
          .gte('created_at', startDate)
          .lte('created_at', new Date(endDate).toISOString());
      }

      const { data: weeklyData, error: weeklyError } = await weeklyQuery.order(
        'points',
        { ascending: false }
      );

      if (weeklyError) throw weeklyError;

      // Group by email and sum points for each user this week
      const weeklyMap = new Map();
      weeklyData.forEach(game => {
        if (!game.email) return;

        const existing = weeklyMap.get(game.email);
        const profile = profileMap.get(game.email);

        if (existing) {
          existing.points += game.points || 0;
          existing.gamesPlayed += 1;
          if (
            game.created_at &&
            new Date(game.created_at) > new Date(existing.lastGame)
          ) {
            existing.lastGame = game.created_at;
          }
        } else {
          // Create a new entry for the user
          weeklyMap.set(game.email, {
            id: game.id, // Note: this ID will be from the last game, might not be ideal
            name:
              `${profile?.first_name || ''} ${
                profile?.last_name || ''
              }`.trim() || 'Неизвестно',
            nickname: profile?.nick_name_game || 'player',
            email: game.email,
            points: game.points || 0,
            gamesPlayed: 1,
            lastGame: game.created_at || new Date().toISOString(),
            city: profile?.city || 'Не указан',
          });
        }
      });

      const weeklyLeadersList = Array.from(weeklyMap.values())
        .sort((a, b) => (b.points || 0) - (a.points || 0))
        .map((game, index) => ({
          ...game,
          rank: index + 1,
        }));

      setWeeklyRatings(weeklyLeadersList);

      // Load monthly ratings
      let monthlyQuery = supabase
        .schema('game')
        .from('history_games')
        .select('*');

      if (monthFilter === 'current') {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        lastDay.setHours(23, 59, 59, 999);

        monthlyQuery = monthlyQuery
          .gte('created_at', firstDay.toISOString())
          .lte('created_at', lastDay.toISOString());
      } else {
        const [startDate, endDate] = monthFilter.split('_');
        monthlyQuery = monthlyQuery
          .gte('created_at', startDate)
          .lte('created_at', new Date(endDate).toISOString());
      }

      const { data: monthlyData, error: monthlyError } =
        await monthlyQuery.order('points', { ascending: false });

      if (monthlyError) throw monthlyError;

      const monthlyMap = new Map();
      monthlyData.forEach(game => {
        if (!game.email) return;
        const existing = monthlyMap.get(game.email);
        const profile = profileMap.get(game.email);
        if (existing) {
          existing.points += game.points || 0;
          existing.gamesPlayed += 1;
          if (
            game.created_at &&
            new Date(game.created_at) > new Date(existing.lastGame)
          ) {
            existing.lastGame = game.created_at;
          }
        } else {
          monthlyMap.set(game.email, {
            id: game.id,
            name:
              `${profile?.first_name || ''} ${
                profile?.last_name || ''
              }`.trim() || 'Неизвестно',
            nickname: profile?.nick_name_game || 'player',
            email: game.email,
            points: game.points || 0,
            gamesPlayed: 1,
            lastGame: game.created_at || new Date().toISOString(),
            city: profile?.city || 'Не указан',
          });
        }
      });

      const monthlyLeadersList = Array.from(monthlyMap.values())
        .sort((a, b) => b.points - a.points)
        .map((game, index) => ({
          ...game,
          rank: index + 1,
        }));

      setMonthlyRatings(monthlyLeadersList);

      // Load weekly winners
      const { data: winnersData, error: winnersError } = await supabase
        .schema('game')
        .from('weekly_winners')
        .select('*');

      if (winnersError) throw winnersError;

      const processedWinners = winnersData
        .map(record => {
          const winners = Array.isArray(record.winners) ? record.winners : [];
          const populatedWinners = winners.map((winner: any) => ({
            ...winner,
            name: profileMap.get(winner.email)?.first_name || 'Неизвестно',
            nickname: profileMap.get(winner.email)?.nick_name_game || 'player',
          }));
          return {
            ...record,
            id: String(record.id),
            weekly: record.weekly || '',
            winners: populatedWinners,
          };
        })
        .filter(record => record.winners.length > 0);

      setWeeklyWinners(processedWinners);
    } catch (error) {
      console.error('Error loading ratings data:', error);
      toast.error('Ошибка', {
        description: 'Не удалось загрузить данные рейтингов',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunLottery = async () => {
    const result = await runLottery(lotteryWeek, numWinners);
    if (result?.error) {
      toast.error('Ошибка при проведении розыгрыша', {
        description: result.error,
      });
    } else if (result?.message) {
      toast.success('Розыгрыш проведен!', {
        description: result.message,
      });
      loadRatingsData(selectedWeek, selectedMonth);
    }
  };

  const handleDeleteWinner = async (recordId: number) => {
    const result = await deleteWinner(recordId);
    if (result?.error) {
      toast.error('Ошибка при удалении', {
        description: result.error,
      });
    } else {
      toast.success('Запись удалена');
      loadRatingsData(selectedWeek, selectedMonth);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-300" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-400" />;
      default:
        return (
          <span className="flex h-5 w-5 items-center justify-center text-sm font-bold text-white">
            {rank}
          </span>
        );
    }
  };

  const handleResetWeeklyScores = async () => {
    try {
      const { error } = await supabase
        .schema('game')
        .from('ratings')
        .update({ points: 0 })
        .gt('points', -1);

      if (error) throw error;

      toast('Очки сброшены', {
        description: 'Все очки недели успешно обнулены',
      });

      loadRatingsData(selectedWeek, selectedMonth);
    } catch (error: any) {
      console.error('Error resetting weekly scores:', error);
      toast('Ошибка', {
        description: error.message || 'Не удалось сбросить очки',
      });
    }
  };

  const handleExportRatings = async (format: 'csv' | 'excel' = 'csv') => {
    try {
      const { data: ratingsData, error } = await supabase
        .schema('game')
        .from('ratings')
        .select('*')
        .order('points', { ascending: false });

      if (error) throw error;

      const exportData = ratingsData.map((rating, index) => ({
        Место: index + 1,
        Имя:
          `${rating.name || ''} ${rating.surname || ''}`.trim() || 'Неизвестно',
        Никнейм: rating.nickname || '',
        Email: rating.user_email || '',
        Очки: rating.points || 0,
        'Последняя игра': rating.last_game
          ? new Date(rating.last_game).toLocaleDateString()
          : '',
      }));

      if (format === 'excel') {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, 'Рейтинги');
        XLSX.writeFile(
          wb,
          `ratings_${new Date().toISOString().split('T')[0]}.xlsx`
        );
      } else {
        const csvContent = [
          Object.keys(exportData[0]).join(','),
          ...exportData.map(row =>
            Object.values(row)
              .map(val => `"${val}"`)
              .join(',')
          ),
        ].join('\n');

        const blob = new Blob([csvContent], {
          type: 'text/csv;charset=utf-8;',
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute(
          'download',
          `ratings_${new Date().toISOString().split('T')[0]}.csv`
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      toast('Экспорт завершен', {
        description: `Файл с рейтингами успешно скачан в формате ${format.toUpperCase()}`,
      });
    } catch (error: any) {
      console.error('Error exporting ratings:', error);
      toast.error('Ошибка', {
        description: error.message || 'Не удалось экспортировать данные',
      });
    }
  };

  const RatingTable = ({
    data,
    title,
  }: {
    data: RatingEntry[];
    title: string;
  }) => (
    <Card className="game-card">
      <div className="border-border border-b p-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-white">Место</TableHead>
              <TableHead className="text-white">Игрок</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Очки</TableHead>
              <TableHead className="text-white">Игр</TableHead>
              <TableHead className="text-white">Последняя игра</TableHead>
              <TableHead className="text-white">Город</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
                  Загрузка рейтингов...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground py-8 text-center"
                >
                  Нет данных для отображения
                </TableCell>
              </TableRow>
            ) : (
              data.map(entry => (
                <TableRow key={entry.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRankIcon(entry.rank)}
                      <span className="font-medium text-white">
                        #{entry.rank}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{entry.name}</p>
                      <p className="text-game-secondary text-sm">
                        @{entry.nickname}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground text-sm">
                      {entry.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-game-secondary text-lg font-bold">
                      {entry.points.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-border text-white"
                    >
                      {entry.gamesPlayed}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {new Date(entry.lastGame).toLocaleDateString()} в{' '}
                      {new Date(entry.lastGame).toLocaleTimeString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{entry.city}</span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Управление рейтингами
          </h2>
          <p className="text-muted-foreground">
            Просмотр и управление системой рейтингов
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => handleExportRatings('excel')}
            className="game-button-secondary text-white"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button
            onClick={() => handleExportRatings('csv')}
            variant="outline"
            className="border-border text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button
            onClick={handleResetWeeklyScores}
            variant="outline"
            className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Сбросить очки недели
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="game-card p-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white">
              {dailyRatings.length}
            </h3>
            <p className="text-muted-foreground">Играли сегодня</p>
          </div>
        </Card>

        <Card className="game-card p-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white">
              {weeklyRatings.length}
            </h3>
            <p className="text-muted-foreground">Активны на неделе</p>
          </div>
        </Card>

        <Card className="game-card p-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white">{0}</h3>
            <p className="text-muted-foreground">Топ-3 призера</p>
          </div>
        </Card>

        <Card className="game-card p-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white">
              {weeklyWinners.reduce(
                (acc, curr) => acc + (curr.winners?.length || 0),
                0
              )}
            </h3>
            <p className="text-muted-foreground">Случайных призеров</p>
          </div>
        </Card>
      </div>

      {/* Period Selection */}
      <Card className="game-card p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-4">
            <Label className="text-white">Рейтинг недели:</Label>
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="bg-input border-border w-full text-white md:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="game-theme game-card border-border text-white">
                {availableWeeks.map(week => (
                  <SelectItem
                    key={week.value}
                    value={week.value}
                    className="focus:bg-muted"
                  >
                    {week.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-4">
            <Label className="text-white">Рейтинг месяца:</Label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="bg-input border-border w-full text-white md:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="game-theme game-card border-border text-white">
                {availableMonths.map(month => (
                  <SelectItem
                    key={month.value}
                    value={month.value}
                    className="focus:bg-muted"
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Rating Tabs */}
      <Tabs defaultValue="daily">
        <TabsList className="bg-muted grid w-full grid-cols-4">
          <TabsTrigger
            value="daily"
            className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Рейтинг дня
          </TabsTrigger>
          <TabsTrigger
            value="weekly"
            className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Рейтинг недели
          </TabsTrigger>
          <TabsTrigger
            value="monthly"
            className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Рейтинг месяца
          </TabsTrigger>
          <TabsTrigger
            value="winners"
            className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
          >
            <Users className="mr-2 h-4 w-4" />
            Призеры недели
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6">
          <RatingTable data={dailyRatings} title="Топ игроков дня" />
        </TabsContent>

        <TabsContent value="weekly" className="mt-6">
          <RatingTable data={weeklyRatings} title="Лидеры недели" />
        </TabsContent>

        <TabsContent value="monthly" className="mt-6">
          <RatingTable data={monthlyRatings} title="Лидеры месяца" />
        </TabsContent>

        <TabsContent value="winners" className="mt-6">
          <Card className="game-card">
            <div className="border-border border-b p-4">
              <h3 className="text-lg font-semibold text-white">
                Проведение розыгрыша и просмотр призеров
              </h3>
            </div>
            <div className="space-y-4 p-4">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Label className="text-white">Неделя для розыгрыша</Label>
                  <Select value={lotteryWeek} onValueChange={setLotteryWeek}>
                    <SelectTrigger className="bg-input border-border text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="game-theme game-card border-border text-white">
                      {availableWeeks.map(week => (
                        <SelectItem key={week.value} value={week.value}>
                          {week.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-32">
                  <Label className="text-white">Кол-во призеров</Label>
                  <Input
                    type="number"
                    value={numWinners}
                    onChange={e => {
                      const value = parseInt(e.target.value, 10);
                      setNumWinners(isNaN(value) ? 1 : value);
                    }}
                    className="bg-input border-border text-white"
                    min="1"
                  />
                </div>
                <Button
                  onClick={handleRunLottery}
                  className="game-button-primary h-10"
                >
                  Провести розыгрыш
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-white">Неделя</TableHead>
                    <TableHead className="text-white">Игрок</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Билет</TableHead>
                    <TableHead className="text-white">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-8 text-center">
                        Загрузка призеров...
                      </TableCell>
                    </TableRow>
                  ) : weeklyWinners.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-muted-foreground py-8 text-center"
                      >
                        Нет данных о призерах
                      </TableCell>
                    </TableRow>
                  ) : (
                    weeklyWinners.map(
                      record =>
                        record.winners &&
                        record.winners.map((winner: any) => (
                          <TableRow
                            key={`${record.id}-${winner.email}`}
                            className="border-border"
                          >
                            <TableCell className="font-medium text-white">
                              {record.weekly}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-white">
                                  {winner.name}
                                </p>
                                <p className="text-game-secondary text-sm">
                                  @{winner.nickname}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {winner.email}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="border-border"
                              >
                                {winner.ticket}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  handleDeleteWinner(parseInt(record.id, 10))
                                }
                              >
                                Удалить
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Weekly Contest Info */}
      <Card className="game-card p-6">
        <div className="space-y-4 text-center">
          <h3 className="text-xl font-bold text-white">
            Информация о еженедельном конкурсе
          </h3>
          <div className="text-muted-foreground grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <p className="mb-1 font-medium text-white">Время проведения</p>
              <p>Каждое воскресенье в 23:59 МСК</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-white">
                Количество победителей
              </p>
              <p>1 игрок, выбирается случайным образом по билетам</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-white">Сброс очков</p>
              <p>После определения призеров все очки обнуляются</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
