'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedProgressBar from './AnimatedProgressBar';
import { useNotificationContext } from './NotificationProvider';
import { useCardState } from '../hooks/useCardState';

// Icons
import { FaBookmark as FaBookmarkSolid, FaBookmark as FaBookmarkFilled } from 'react-icons/fa';

interface ProjectStat {
  value: string | number;
  label: string;
}

interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;        // <— только react-icons
  iconColor: string;                     // tailwind: text-indigo-600
  progress?: number;
  progressLabel?: string;
  stats: ProjectStat[];
  badge?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const getRouteByTitle = (title: string) => {
  const t = title.toLowerCase();
  switch (t) {
    case 'everycar':
      return '/dashboard/everycar';
    case 'викторина':
    case 'quiz':
      return '/dashboard/quiz';
    case 'автосервис года':
    case 'best cto':
      return '/dashboard/bestcto';
    case 'мероприятия':
    case 'events':
      return '/events';
    case 'академия сто':
    case 'academy':
    case 'сертификация сто':
    case 'certification':
      return '/academy';
    case 'интернет-магазин':
    case 'shop':
      return '/shop';
    case 'профиль':
    case 'profile':
      return '/profile';
    default:
      return '/';
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  iconColor,
  progress,
  progressLabel = 'Прогресс',
  stats,
  badge,
  primaryButtonText = 'Продолжить',
  secondaryButtonText = 'Статистика',
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const { addNotification } = useNotificationContext();
  const { initializeCard, getCardState, toggleBookmarked } = useCardState();

  const cardState = id ? getCardState(id) : undefined;

  // Init card state
  useEffect(() => {
    if (id) {
      initializeCard(id, { progress: progress || 0 });
    }
  }, [id, progress, initializeCard]);

  const goToRoute = () => router.push(getRouteByTitle(title));

  const handlePrimaryClick = () => {
    // addNotification('Действие выполнено', `Вы начали работу с проектом "${title}"`, 'success'); // Уведомления отключены
    onPrimaryClick?.();
    goToRoute();
  };

  const handleSecondaryClick = () => {
    // addNotification('Действие выполнено', `Открыта статистика проекта "${title}"`, 'info'); // Уведомления отключены
    onSecondaryClick?.();
    goToRoute();
  };

  const handleCardClick = () => {
    // addNotification('Информация', `Вы открыли проект "${title}"`, 'info'); // Уведомления отключены
    goToRoute();
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) {
      // addNotification('Ошибка', 'ID проекта не определён', 'error'); // Уведомления отключены
      return;
    }
    toggleBookmarked(id);
    const newState = !cardState?.isBookmarked;
    // addNotification(
    //   'Закладка',
    //   `Проект "${title}" ${newState ? 'добавлен в избранное' : 'удалён из избранного'}`,
    //   newState ? 'success' : 'info'
    // ); // Уведомления отключены
  };

  return (
    <div
      className={`project-card bg-white rounded-3xl p-6 shadow-lg border border-gray-200 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isHovered ? 'cursor-pointer' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4 bg-indigo-400 text-white rounded-full px-3 py-1 text-xs font-bold">
          {badge}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative">
        {/* ICON */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${iconColor} bg-opacity-10`}
        >
          <Icon />
        </div>

        {/* Bookmark */}
        <button
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-100 transition-colors z-10"
          onClick={handleBookmarkClick}
        >
          {cardState?.isBookmarked ? (
            <FaBookmarkFilled className="text-amber-500" />
          ) : (
            <FaBookmarkSolid className="text-gray-300" />
          )}
        </button>
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-5 flex-grow">{description}</p>

      {/* Progress */}
      {progress !== undefined && (
        <div className="mb-5">
          <AnimatedProgressBar progress={progress} label={progressLabel} showPercentage={true} />
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-gray-50 p-3 rounded-xl text-center border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // addNotification('Статистика', `${stat.label}: ${stat.value}`, 'info'); // Уведомления отключены
              goToRoute();
            }}
          >
            <div className="text-lg font-bold text-indigo-600">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-2.5">
        <button
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 ${iconColor.replace(
            'text-',
            'bg-'
          )} hover:opacity-90`}
          onClick={(e) => {
            e.stopPropagation();
            handlePrimaryClick();
          }}
        >
          {primaryButtonText}
        </button>

        <button
          className="flex-1 py-2.5 px-4 rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 text-indigo-600 border border-indigo-600 hover:bg-indigo-100/50"
          onClick={(e) => {
            e.stopPropagation();
            handleSecondaryClick();
          }}
        >
          {secondaryButtonText}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
