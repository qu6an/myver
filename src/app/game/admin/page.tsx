'use client';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Trophy,
  FileQuestion,
  Upload,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Car,
  Loader,
  Gamepad2,
  Ticket,
  FileQuestionIcon,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { QuestionsManager } from './components/QuestionsManager';
import { BrandsManager } from './components/BrandsManager';
import { PlayersManager } from './components/PlayersManager';
import { RatingsManager } from './components/RatingsManager';
import TicketsManager from './components/TicketsManager';
import { ExcelUploader } from './components/ExcelUploader';
import { EndGameSettingsManager } from './components/EndGameSettingsManager';
import { MigrationManager } from './components/MigrationManager';
import { GameSettings } from './components/GameSettings';
import { useRouter } from 'next/navigation';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalQuestions: 0,
    totalPlayers: 0,
    gamesPlayedToday: 0,
    activeWeeklyContest: true,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push('/game');
          return;
        }

        const { data: userRole } = await supabase
          .from('users')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (!userRole) {
          router.push('/game');
          return;
        }

        setIsAdmin(userRole.role === 'admin');

        if (userRole.role !== 'admin') {
          router.push('/game');
          return;
        }

        setLoading(true);

        // Get total questions from all tables
        const [
          liteQuestions,
          easyQuestions,
          normalQuestions,
          hardQuestions,
          liteQuestions2,
          hardQuestions2,
        ] = await Promise.all([
          supabase
            .schema('game')
            .from('lite_questions')
            .select('id', { count: 'exact', head: true }),
          supabase
            .schema('game')
            .from('easy_questions')
            .select('id', { count: 'exact', head: true }),
          supabase
            .schema('game')
            .from('normal_questions')
            .select('id', { count: 'exact', head: true }),
          supabase
            .schema('game')
            .from('hard_questions')
            .select('id', { count: 'exact', head: true }),
          supabase
            .schema('game')
            .from('lite_questions2')
            .select('id', { count: 'exact', head: true }),
          supabase
            .schema('game')
            .from('hard_questions2')
            .select('id', { count: 'exact', head: true }),
        ]);

        const totalQuestions =
          (liteQuestions.count || 0) +
          (easyQuestions.count || 0) +
          (normalQuestions.count || 0) +
          (hardQuestions.count || 0) +
          (liteQuestions2.count || 0) +
          (hardQuestions2.count || 0);

        // Get total players from profiles
        const { count: totalPlayers } = await supabase
          .schema('game')
          .from('profiles')
          .select('id', { count: 'exact', head: true });

        // Get games played today from history_games
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { count: gamesPlayedToday } = await supabase
          .schema('game')
          .from('history_games')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', today.toISOString());

        setStats({
          totalQuestions,
          totalPlayers: totalPlayers || 0,
          gamesPlayedToday: gamesPlayedToday || 0,
          activeWeeklyContest: true,
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen p-4 p-20">
      {isAdmin && (
        <>
          {loading ? (
            <div className="flex w-full items-center justify-center pt-20">
              <Loader className="text-game-primary h-10 w-10 animate-spin" />
            </div>
          ) : (
            <>
              <div className="mx-auto max-w-7xl space-y-8">
                {/* Header */}
                <div className="space-y-4 text-center">
                  <h1 className="text-4xl font-bold text-white">
                    Панель администратора
                  </h1>
                  <p className="text-muted-foreground">
                    Управление игрой EVERYCAR
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="game-card p-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-game-primary rounded-lg p-3">
                        <FileQuestion className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {loading
                            ? '...'
                            : stats.totalQuestions.toLocaleString()}
                        </h3>
                        <p className="text-muted-foreground">Всего вопросов</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="game-card p-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-game-secondary rounded-lg p-3">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {loading
                            ? '...'
                            : stats.totalPlayers.toLocaleString()}
                        </h3>
                        <p className="text-muted-foreground">Игроков</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="game-card p-6">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-yellow-500 p-3">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {loading ? '...' : stats.gamesPlayedToday}
                        </h3>
                        <p className="text-muted-foreground">Игр сегодня</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="game-card p-6">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-purple-500 p-3">
                        <Settings className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              stats.activeWeeklyContest
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {stats.activeWeeklyContest
                              ? 'Активен'
                              : 'Неактивен'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">Конкурс недели</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Main Admin Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-card flex h-max w-full flex-wrap justify-center gap-3">
                    <TabsTrigger
                      value="questions"
                      className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
                    >
                      <FileQuestion className="mr-2 h-4 w-4" />
                      Вопросы
                    </TabsTrigger>
                    <TabsTrigger
                      value="brands"
                      className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
                    >
                      <Car className="mr-2 h-4 w-4" />
                      Бренды
                    </TabsTrigger>
                    <TabsTrigger
                      value="players"
                      className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Игроки
                    </TabsTrigger>
                    <TabsTrigger
                      value="ratings"
                      className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Рейтинги
                    </TabsTrigger>
                    <TabsTrigger
                      value="tickets"
                      className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
                    >
                      <Ticket className="mr-2 h-4 w-4" />
                      Билеты
                    </TabsTrigger>
                    <TabsTrigger
                      value="upload"
                      className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Загрузка
                    </TabsTrigger>
                    <TabsTrigger
                      value="endgame"
                      className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
                    >
                      <Gamepad2 className="mr-2 h-4 w-4" />
                      Окончание игры
                    </TabsTrigger>
                    <TabsTrigger
                      value="migration"
                      className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Миграция
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="data-[state=active]:bg-game-primary data-[state=active]:text-white"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Настройки
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="questions" className="mt-6">
                    <QuestionsManager />
                  </TabsContent>

                  <TabsContent value="brands" className="mt-6">
                    <BrandsManager />
                  </TabsContent>

                  <TabsContent value="players" className="mt-6">
                    <PlayersManager />
                  </TabsContent>

                  <TabsContent value="ratings" className="mt-6">
                    <RatingsManager />
                  </TabsContent>

                  <TabsContent value="tickets" className="mt-6">
                    <TicketsManager />
                  </TabsContent>

                  <TabsContent value="upload" className="mt-6">
                    <ExcelUploader />
                  </TabsContent>

                  <TabsContent value="endgame" className="mt-6">
                    <EndGameSettingsManager />
                  </TabsContent>

                  <TabsContent value="migration" className="mt-6">
                    <MigrationManager />
                  </TabsContent>

                  <TabsContent value="settings" className="mt-6">
                    <GameSettings />
                  </TabsContent>
                </Tabs>

                {/* Quick Actions */}
                <Card className="game-card p-6">
                  <h3 className="mb-4 text-xl font-bold text-white">
                    Быстрые действия
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Button
                      onClick={() => setActiveTab('questions')}
                      className="game-button-primary h-auto justify-start p-4 text-white"
                    >
                      <FileQuestionIcon className="mr-2 h-5 w-5" />
                      <div className="text-left">
                        <div className="text-xs font-medium text-wrap sm:text-base">
                          К вопросам
                        </div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('upload')}
                      className="game-button-secondary h-auto justify-start p-4 text-white"
                    >
                      <Upload className="mr-2 h-5 w-5 shrink-0" />
                      <div className="w-full text-left">
                        <div className="text-xs font-medium text-wrap sm:text-base">
                          Перейти в загрузку из файла
                        </div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('players')}
                      variant="outline"
                      className="border-border hover:bg-muted h-auto justify-start p-4 text-white"
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      <div className="text-left">
                        <div className="text-xs font-medium text-wrap sm:text-base">
                          Просмотр игроков
                        </div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('ratings')}
                      variant="outline"
                      className="border-border hover:bg-muted h-auto justify-start p-4 text-white"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      <div className="text-left">
                        <div className="text-xs font-medium text-wrap sm:text-base">
                          Экспорт данных
                        </div>
                        <div className="text-xs opacity-75">Скачать отчеты</div>
                      </div>
                    </Button>
                  </div>
                </Card>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
