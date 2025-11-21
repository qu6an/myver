"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  BookOpen,
  Trophy,
  Calendar,
  Star,
  Clock,
  Users,
  Play,
  Award,
  TrendingUp,
  Bell,
  Search,
} from "lucide-react"
import Link from "next/link"

export default function AcademyPage() {
  const user = {
    name: "Иван Петров",
    role: "EVERYCAR",
    completedCourses: 8,
    totalPoints: 1250,
    level: "Эксперт",
    currentStreak: 15,
  }

  const quickStats = [
    {
      title: "Завершено курсов",
      value: user.completedCourses,
      icon: GraduationCap,
      color: "text-purple-600",
    },
    {
      title: "Баллы",
      value: user.totalPoints,
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      title: "Дней подряд",
      value: user.currentStreak,
      icon: TrendingUp,
      color: "text-green-600",
    },
  ]

  const currentCourses = [
    {
      id: 1,
      title: "Диагностика современных двигателей",
      instructor: "Алексей Морозов",
      progress: 65,
      duration: "4 часа",
      nextLesson: "Системы впрыска топлива",
      image: "/car-engine-diagnostics.png",
    },
    {
      id: 2,
      title: "Электронные системы автомобиля",
      instructor: "Мария Волкова",
      progress: 30,
      duration: "6 часов",
      nextLesson: "CAN-шина и протоколы",
      image: "/car-electronics-systems.png",
    },
  ]

  const recommendedCourses = [
    {
      id: 3,
      title: "Гибридные силовые установки",
      instructor: "Дмитрий Козлов",
      rating: 4.8,
      students: 234,
      duration: "8 часов",
      level: "Продвинутый",
      price: "Бесплатно",
      image: "/hybrid-car-engine.png",
    },
    {
      id: 4,
      title: "Кузовной ремонт и покраска",
      instructor: "Сергей Петров",
      rating: 4.9,
      students: 189,
      duration: "12 часов",
      level: "Средний",
      price: "2,500 ₽",
      image: "/car-body-repair-painting.png",
    },
    {
      id: 5,
      title: "Работа с клиентами в автосервисе",
      instructor: "Елена Смирнова",
      rating: 4.7,
      students: 156,
      duration: "3 часа",
      level: "Начальный",
      price: "Бесплатно",
      image: "/customer-service-automotive.png",
    },
  ]

  const upcomingEvents = [
    {
      title: "Вебинар: Новые технологии в автосервисе",
      date: "15 декабря, 14:00",
      type: "Вебинар",
    },
    {
      title: "Конкурс: Лучший автосервис 2025",
      date: "20 декабря",
      type: "Конкурс",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Добро пожаловать в Академию!</h1>
            <p className="text-purple-100 mb-4">
              Развивайте свои навыки и получайте новые знания в автомобильной индустрии
            </p>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {user.role}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Уровень: {user.level}
              </Badge>
            </div>
          </div>
          <div className="hidden md:block mt-4 md:mt-0">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Award className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Следующий уровень</p>
              <p className="font-bold">Мастер</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Courses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Мои текущие курсы</span>
                </CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/academy/courses">Все курсы</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-600">Преподаватель: {course.instructor}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Прогресс</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">Следующий урок: {course.nextLesson}</p>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/academy/courses/${course.id}`}>
                      <Play className="h-4 w-4 mr-1" />
                      Продолжить
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Рекомендуемые курсы</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-24 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Преподаватель: {course.instructor}</p>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-500 mr-1" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="font-semibold text-green-600">{course.price}</div>
                    </div>
                    <Button size="sm" className="w-full mt-3" asChild>
                      <Link href={`/academy/courses/${course.id}`}>Начать курс</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Ближайшие события</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{event.date}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/academy/courses">
                  <Search className="h-4 w-4 mr-2" />
                  Найти курс
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/academy/progress">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Мой прогресс
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Уведомления
              </Button>
            </CardContent>
          </Card>

          {/* Achievement Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Последние достижения</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Award className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Мастер диагностики</p>
                    <p className="text-xs text-gray-500">Завершено 5 курсов по диагностике</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Активный участник</p>
                    <p className="text-xs text-gray-500">15 дней подряд в обучении</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
