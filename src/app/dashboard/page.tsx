'use client';

import React, { useState, useEffect } from 'react';
import { FaPuzzlePiece, FaCar, FaTrophy, FaGraduationCap, FaAward, FaUsers } from 'react-icons/fa';
import { FaWrench, FaGem, FaCalendar } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WelcomeSection from '../../components/WelcomeSection';
import CTASection from '../../components/CTASection';
import ProjectCard from '../../components/ProjectCard';
import EventCard from '../../components/EventCard';
import NearestWorkshop from '../../components/NearestWorkshop';
import ConferenceBanner from '../../components/ConferenceBanner';
import { useSearchContext } from '../../contexts/SearchContext';

export default function HomePage() {
  const [originalProjectCardsData] = useState([
    {
      id: 'victory',
      title: 'ВИКТОРИНА',
      description: 'Проверьте свои знания автомобильной тематики, участвуйте в розыгрышах и получайте награды.',
      icon: FaPuzzlePiece,
      iconColor: 'text-indigo-600',
      progress: 65,
      progressLabel: 'Прогресс',
      stats: [
        { value: '1,240', label: 'Очков за сегодня' },
        { value: '231 933', label: 'Очков за неделю' },
        { value: 5, label: 'Билеты' }
      ],
      badge: 'Активно',
      primaryButtonText: 'Продолжить',
      secondaryButtonText: 'Статистика'
    },
    {
      id: 'everycar',
      title: 'EVERYCAR',
      description: 'Комплексная программа для автосервисов с конкурсами, закупками и бонусами.',
      icon: FaCar,
      iconColor: 'text-blue-500',
      progress: 70,
      progressLabel: 'Прогресс программы',
      stats: [
        { value: '243 186,63 ₽', label: 'Закупка всего' },
        { value: '149 155 ₽', label: 'Брендов проекта' },
        { value: 4, label: 'Билеты' }
      ],
      badge: 'Новый',
      primaryButtonText: 'Участвовать',
      secondaryButtonText: 'Статистика'
    },
    {
      id: 'garage-of-year',
      title: 'АВТОСЕРВИС ГОДА',
      description: 'Участвуйте в главном отраслевом конкурсе, повышайте рейтинг и выигрывайте ценные призы.',
      icon: FaTrophy,
      iconColor: 'text-rose-500',
      progress: 45,
      progressLabel: 'Прогресс конкурса',
      stats: [
        { value: 34, label: 'в городе' },
        { value: 84, label: 'в области' },
        { value: 102, label: 'в округе' }
      ],
      badge: 'Новый этап',
      primaryButtonText: 'Мои задания',
      secondaryButtonText: 'Рейтинги'
    },
    {
      id: 'academy',
      title: 'АКАДЕМИЯ СТО',
      description: 'Повышайте квалификацию, проходите обучение и получайте сертификаты для вашего СТО.',
      icon: FaGraduationCap,
      iconColor: 'text-emerald-500',
      progress: 78,
      progressLabel: 'Прогресс',
      stats: [
        { value: 8, label: 'Сотрудников' },
        { value: '75%', label: 'Активность' },
        { value: 12, label: 'Достижения' }
      ],
      badge: '2 новых курса',
      primaryButtonText: 'Продолжить',
      secondaryButtonText: 'Каталог курсов'
    },
    {
      id: 'certification',
      title: 'СЕРТИФИКАЦИЯ СТО',
      description: 'Получите официальную сертификацию вашего автосервиса от ведущих производителей.',
      icon: FaAward,
      iconColor: 'text-amber-500',
      progress: 12.5,
      progressLabel: 'Прогресс сертификации',
      stats: [
        { value: '3/24', label: 'Получено' },
        { value: '92%', label: 'NPS' },
        { value: 12, label: 'В процессе' }
      ],
      badge: 'Доступно',
      primaryButtonText: 'Начать',
      secondaryButtonText: 'Условия'
    },
    {
      id: 'myteam',
      title: 'MYTEAM',
      description: 'Управляйте командой вашего автосервиса, отслеживайте прогресс и мотивируйте сотрудников.',
      icon: FaUsers,
      iconColor: 'text-red-600',
      stats: [
        { value: '92%', label: 'NPS' },
        { value: 12, label: 'Опросов' },
        { value: 56, label: 'База' }
      ],
      badge: 'Новый',
      primaryButtonText: 'Управлять',
      secondaryButtonText: 'Статистика'
    }
  ]);

  const [originalEventCardsData] = useState([
    {
      id: 'workshop',
      title: 'Практические воркшопы',
      description: 'Присоединяйтесь к нашим еженедельным онлайн-воркшопам от ведущих экспертов отрасли!',
      icon: FaWrench,
      iconColor: 'text-indigo-600',
      badge: 'Еженедельно',
      date: 'Каждый четверг, 19:00',
      location: 'Онлайн',
      eventType: 'workshop',
      primaryButtonText: 'Записаться',
      secondaryButtonText: 'Расписание'
    },
    {
      id: 'exclusive',
      title: 'Отпуск за знаниями',
      description: 'Уникальные образовательные туры с погружением в практику ведущих автосервисов Европы.',
      icon: FaGem,
      iconColor: 'text-rose-50',
      badge: 'Эксклюзив',
      date: 'Май 2025',
      location: 'Германия, Италия',
      eventType: 'exclusive',
      primaryButtonText: 'Узнать больше',
      secondaryButtonText: 'Программа'
    },
    {
      id: 'conference',
      title: 'Autocom Conference 2025',
      description: 'Главная отраслевая конференция с участием топ-экспертов и производителей.',
      icon: FaCalendar,
      iconColor: 'text-emerald-500',
      badge: 'Скоро',
      date: '15-17 октября 2025',
      location: 'Москва',
      eventType: 'conference',
      primaryButtonText: 'Забронировать',
      secondaryButtonText: 'Программа'
    }
  ]);

  const [filteredProjects, setFilteredProjects] = useState(originalProjectCardsData);
  const [filteredEvents, setFilteredEvents] = useState(originalEventCardsData);
  const { searchQuery } = useSearchContext();

  // Фильтрация карточек проектов и мероприятий на основе поискового запроса
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProjects(originalProjectCardsData);
      setFilteredEvents(originalEventCardsData);
    } else {
      const filteredProjects = originalProjectCardsData.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.badge?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredEvents = originalEventCardsData.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.badge?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredProjects(filteredProjects);
      setFilteredEvents(filteredEvents);
    }
  }, [searchQuery, originalProjectCardsData, originalEventCardsData]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      
      <div className="main-content flex-1 ml-0 md:ml-[70px] lg:ml-[300px] transition-all duration-300">
        <Header title="Главная" subtitle="Панель управления вашим успехом" />
        
        <div className="breadcrumbs text-sm text-gray-600 mb-2">
          <span>Главная</span>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WelcomeSection
                userName="Алексей"
                subtitle="Ваш прогресс в экосистеме АВТОКОМ"
                points={10500}
                level={1}
                currentXp={3250}
                requiredXp={5000}
                profileName="Алексей Иванов"
                profileTitle="Мастер-консультант"
                profileLocation={'СТО "АвтоПрофи" | Москва'}
                profileAvatar="👤"
              />
              
              <CTASection />
              
              <div className="dashboard-section mb-8">
                <div className="section-header flex justify-between items-center mb-5">
                  <h2 className="section-title text-2xl font-bold text-gray-900">Ваши проекты</h2>
                  <a href="#" className="section-link text-indigo-600 font-bold flex items-center gap-2 hover:text-indigo-800 transition-colors">
                    Все проекты <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
                
                <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      icon={project.icon}
                      iconColor={project.iconColor}
                      progress={project.progress}
                      progressLabel={project.progressLabel}
                      stats={project.stats}
                      badge={project.badge}
                      primaryButtonText={project.primaryButtonText}
                      secondaryButtonText={project.secondaryButtonText}
                      onPrimaryClick={() => console.log(`Primary action for ${project.title}`)}
                      onSecondaryClick={() => console.log(`Secondary action for ${project.title}`)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="dashboard-section mb-8">
                <ConferenceBanner />
              </div>
              
              <div className="dashboard-section mb-8">
                <div className="section-header flex justify-between items-center mb-5">
                  <h2 className="section-title text-2xl font-bold text-gray-900">Ближайшие мероприятия</h2>
                  <a href="#" className="section-link text-indigo-600 font-bold flex items-center gap-2 hover:text-indigo-800 transition-colors">
                    Все мероприятия <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
                
                <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      description={event.description}
                      icon={event.icon}
                      iconColor={event.iconColor}
                      badge={event.badge}
                      date={event.date}
                      location={event.location}
                      eventType={event.eventType as 'workshop' | 'exclusive' | 'conference'}
                      primaryButtonText={event.primaryButtonText}
                      secondaryButtonText={event.secondaryButtonText}
                      onPrimaryClick={() => console.log(`Primary action for ${event.title}`)}
                      onSecondaryClick={() => console.log(`Secondary action for ${event.title}`)}
                    />
                  ))}
                </div>
              </div>
            </div>
          
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                <NearestWorkshop />
              </div>
            </div>
          </div>
        </div>
      
        <Footer />
      </div>
    </div>
  );
}
