'use client';

import React, { useState } from 'react';
import { useNotificationContext } from './NotificationProvider';

interface PointsCompactProps {
  points: number;
}

const PointsCompact: React.FC<PointsCompactProps> = ({ points }) => {
  const { addNotification } = useNotificationContext();

  const handleWalletClick = () => {
    // addNotification('Кошелек', 'Открыт раздел "Кошелек"', 'info'); // Уведомления отключены
  };

  const handleSpendClick = () => {
    // addNotification('Баллы', 'Открыт каталог для траты баллов', 'info'); // Уведомления отключены
  };

  return (
    <div className="points-compact bg-white/15 p-4 rounded-xl backdrop-filter backdrop-blur-sm border border-white/20 mr-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/20 transition-colors duration-300"
      onClick={handleWalletClick}>
      <div className="points-compact-info flex items-center gap-3">
        <div className="points-compact-icon w-10 h-10 rounded-xl bg-yellow-50/20 flex items-center justify-center text-xl text-yellow-500">
          💰
        </div>
        <div className="points-compact-text flex-col">
          <div className="points-compact-title text-sm opacity-90 mb-0.5">Ваши баллы</div>
          <div className="points-compact-total text-xl font-bold text-yellow-500">{points.toLocaleString()} баллов</div>
        </div>
      </div>
      
      <div className="points-compact-actions flex gap-2">
        <button 
          className="points-btn-compact points-btn-wallet p-2 rounded-lg font-bold text-xs cursor-pointer transition-all duration-300 border border-white/30 flex items-center justify-center gap-1 hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation();
            handleWalletClick();
          }}
        >
          <i className="fas fa-wallet"></i> Кошелек
        </button>
        <button 
          className="points-btn-compact points-btn-spend p-2 rounded-lg font-bold text-xs cursor-pointer transition-all duration-300 border border-rose-500/50 bg-rose-500/30 text-rose-50 flex items-center justify-center gap-1 hover:bg-rose-500/40"
          onClick={(e) => {
            e.stopPropagation();
            handleSpendClick();
          }}
        >
          <i className="fas fa-shopping-cart"></i> Потратить
        </button>
      </div>
    </div>
  );
};

interface GlobalLevelProps {
  level: number;
  currentXp: number;
  requiredXp: number;
}

const GlobalLevel: React.FC<GlobalLevelProps> = ({ level, currentXp, requiredXp }) => {
  const { addNotification } = useNotificationContext();
  const progress = (currentXp / requiredXp) * 100;

  const handleLevelClick = () => {
    // addNotification('Уровень', `Ваш текущий уровень: ${level}`, 'info'); // Уведомления отключены
  };

  return (
    <div className="global-level inline-flex items-center gap-4 bg-white/15 p-4 rounded-xl backdrop-filter backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors duration-300"
      onClick={handleLevelClick}>
      <div className="level-badge text-2xl font-bold">⭐ {level}</div>
      <div className="level-info">
        <h4 className="text-xs font-bold opacity-90 mb-2">ГЛОБАЛЬНЫЙ УРОВЕНЬ</h4>
        <div className="level-progress w-48 h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="level-progress-fill h-full bg-yellow-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <small className="text-xs opacity-80 block mt-2">{currentXp.toLocaleString()} / {requiredXp.toLocaleString()} XP до уровня {level + 1}</small>
      </div>
    </div>
  );
};

interface ProfileProps {
  name: string;
  title: string;
  location: string;
  avatar: string;
}

const Profile: React.FC<ProfileProps> = ({ name, title, location, avatar }) => {
  const { addNotification } = useNotificationContext();

  const handleEditProfile = () => {
    // addNotification('Профиль', 'Редактирование профиля будет доступно в следующей версии', 'warning'); // Уведомления отключены
  };

  const handleProfileClick = () => {
    // addNotification('Профиль', `Просмотр профиля: ${name}`, 'info'); // Уведомления отключены
  };

  return (
    <div className="welcome-profile bg-white/15 rounded-xl p-5 backdrop-filter backdrop-blur-sm border border-white/20 min-w-[280px] cursor-pointer hover:bg-white/20 transition-colors duration-300"
      onClick={handleProfileClick}>
      <div className="profile-header flex items-center gap-3 mb-4">
        <div className="profile-avatar-large w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
          {avatar}
        </div>
        <div className="profile-info flex-1">
          <div className="profile-name text-lg font-bold mb-1">{name}</div>
          <div className="profile-title text-sm opacity-90 mb-1">{title}</div>
          <div className="profile-location text-xs opacity-80 flex items-center gap-2">
            <i className="fas fa-building"></i> {location}
          </div>
        </div>
      </div>
      <button 
        className="profile-edit-btn w-full py-2.5 bg-white/20 text-white border border-white/30 rounded-xl font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/30"
        onClick={(e) => {
          e.stopPropagation();
          handleEditProfile();
        }}
      >
        <i className="fas fa-edit"></i> Редактировать профиль
      </button>
    </div>
  );
};

interface WelcomeSectionProps {
  userName: string;
  subtitle: string;
  points: number;
  level: number;
  currentXp: number;
 requiredXp: number;
  profileName: string;
  profileTitle: string;
  profileLocation: string;
  profileAvatar: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ 
  userName, 
  subtitle, 
  points, 
  level, 
  currentXp, 
  requiredXp,
  profileName,
  profileTitle,
  profileLocation,
  profileAvatar
}) => {
  const { addNotification } = useNotificationContext();

  const handleWelcomeClick = () => {
    // addNotification('Добро пожаловать', `Рады видеть вас, ${userName}!`, 'success'); // Уведомления отключены
  };

  return (
    <div className="welcome-section relative overflow-hidden rounded-3xl p-8 mb-6 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleWelcomeClick}>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(255,90,125,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(91,107,240,0.1)_0%,transparent_50%)] pointer-events-none"></div>
      <div className="welcome-content relative z-10 flex justify-between items-start gap-6">
        <div className="welcome-text flex-1">
          <h1 className="welcome-title text-2xl font-bold mb-2">Добро пожаловать, {userName}! 👋</h1>
          <p className="welcome-subtitle text-base opacity-90 mb-6">{subtitle}</p>
          
          <div className="welcome-stats-container flex-wrap gap-5">
            <PointsCompact points={points} />
            <GlobalLevel level={level} currentXp={currentXp} requiredXp={requiredXp} />
          </div>
        </div>
        
        <Profile 
          name={profileName}
          title={profileTitle}
          location={profileLocation}
          avatar={profileAvatar}
        />
      </div>
    </div>
  );
};

export default WelcomeSection;
