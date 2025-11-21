"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Award, TrendingUp, Calendar, Clock, Star, Target, BookOpen, Users } from "lucide-react"

export default function ProgressPage() {
  const userStats = {
    totalCourses: 12,
    completedCourses: 8,
    inProgressCourses: 2,
    totalHours: 45,
    currentStreak: 15,
    totalPoints: 1250,
    level: "Эксперт",
    nextLevelPoints: 1500,
  }

  const achievements = [
    {
      id: 1,
      title: "Первые шаги",
      description: "Завершите первый курс",
      icon: BookOpen,
      earned: true,
      date: "15 ноября 2024",
    },
    {
      id: 2,
      title: "Мастер диагностики",
      description: "Завершите 5 курсов по диагностике",
      icon: Award,
      earned: true,
      date: "28 ноября 2024",
    },
    {
      id: 3,
      title: "Активный ученик",
      description: "15 дней подряд в обучении",
      icon: Calendar,
      earned: true,
      date: "1 декабря 2024",
    },
    {
      id: 4,
      title: "Эксперт по двигателям",
      description: "Завершите все курсы по двигателям",
      icon: Target,
      earned: false,
      progress: 75,
    },
    {
      id: 5,
      title: "Наставник",
      description: "Помогите 10 студентам",
      icon: Users,
      earned: false,
      progress: 30,
    },
  ]

  const recentActivity = [
    {
      type: "course_completed",
      title: "Завершен курс",
      description: "Основы автосервиса",
      date: "2 дня назад",
      points: 150,
    },
    {
      type: "achievement",
      title: "Получено достижение",
      description: "Активный ученик",
      date: "1 день назад",
      points: 100,
    },
    {
      type: "lesson_completed",
      title: "Завершен урок",
      description: "Системы впрыска топлива",
      date: "Сегодня",
      points: 25,
    },
  ]

  const monthlyProgress = [
    { month: "Сентябрь", courses: 2, hours: 8 },
    { month: "Октябрь", courses: 3, hours: 12 },
    { month: "Ноябрь", courses: 2, hours: 15 },
    { month: "Декабрь", courses: 1, hours: 10 },
  ]

  const skillsProgress = [
    { skill: "Диагностика двигателей", level: 85, courses: 4 },
    { skill: "Электронные системы", level: 60, courses: 2 },
    { skill: "Кузовные работы", level: 40, courses: 1 },
    { skill: "Работа с клиентами", level: 90, courses: 1 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Мой прогресс</h1>
        <p className="text-gray-600">Отслеживайте свои достижения и развитие навыков</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Завершено курсов</CardTitle>
            <BookOpen className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.completedCourses}</div>
            <p className="text-xs text-muted-foreground">из {userStats.totalCourses} всего</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Часов обучения</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalHours}</div>
            <p className="text-xs text-muted-foreground">Общее время</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Баллы</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalPoints}</div>
            <p className="text-xs text-muted-foreground">
              До следующего уровня: {userStats.nextLevelPoints - userStats.totalPoints}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Дней подряд</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.currentStreak}</div>
            <p className="text-xs text-muted-foreground">Текущая серия</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Уровень прогресса</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Текущий уровень: {userStats.level}</p>
                    <p className="text-sm text-gray-600">Следующий уровень: Мастер</p>
                  </div>
                  <Badge variant="secondary">{userStats.totalPoints} баллов</Badge>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Прогресс до следующего уровня</span>
                    <span>{Math.round((userStats.totalPoints / userStats.nextLevelPoints) * 100)}%</span>
                  </div>
                  <Progress value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Развитие навыков</CardTitle>
              <CardDescription>Ваш прогресс по различным направлениям</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{skill.skill}</p>
                        <p className="text-sm text-gray-600">{skill.courses} курсов завершено</p>
                      </div>
                      <span className="text-sm font-medium">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Активность по месяцам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyProgress.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{month.month}</p>
                      <p className="text-sm text-gray-600">
                        {month.courses} курсов • {month.hours} часов
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(month.hours / 20) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Достижения</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <div key={achievement.id} className="flex items-start space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          achievement.earned ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                        {achievement.earned ? (
                          <p className="text-xs text-green-600 mt-1">Получено {achievement.date}</p>
                        ) : achievement.progress ? (
                          <div className="mt-2">
                            <Progress value={achievement.progress} className="h-1" />
                            <p className="text-xs text-gray-500 mt-1">{achievement.progress}%</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <TrendingUp className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{activity.date}</p>
                        <Badge variant="outline" className="text-xs">
                          +{activity.points} баллов
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
