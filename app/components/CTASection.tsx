'use client';

import React, { useState } from 'react';
import { useNotificationContext } from './NotificationProvider';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  tertiaryButtonText?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title = "ЧТО НУЖНО СДЕЛАТЬ СЕЙЧАС?",
  subtitle = "Сыграйте в ежедневную викторину — получите билет на розыгрыш приза!",
  primaryButtonText = "🎯 НАЧАТЬ ВИКТОРИНУ",
  secondaryButtonText = "📋 Посмотреть правила",
  tertiaryButtonText = "⚙️ Заполнить профиль"
}) => {
  const { addNotification } = useNotificationContext();

  const handlePrimaryClick = () => {
    // addNotification('Викторина', 'Запуск викторины...\n\nПереход к игровому модулю!', 'success'); // Уведомления отключены
  };

  const handleSecondaryClick = () => {
    // addNotification('Правила', 'Открытие страницы миссий...', 'info'); // Уведомления отключены
  };

  const handleTertiaryClick = () => {
    // addNotification('Профиль', 'Открытие каталога наград...', 'info'); // Уведомления отключены
  };

  return (
    <div className="action-now relative overflow-hidden rounded-3xl p-8 mb-6 bg-gradient-to-r from-pink-30 via-pink-20 to-orange-20 shadow-xl border-0 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
      onClick={() => /* addNotification('Действие', 'Вы открыли раздел "Что нужно сделать сейчас?"', 'info') */ {}}> {/* Уведомления отключены */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="action-header flex items-center gap-4 mb-6 relative z-10">
        <div className="action-icon text-4xl filter drop-shadow-lg">🚀</div>
        <div className="action-text">
          <h2 className="text-2xl font-bold text-white mb-2 text-shadow">ЧТО НУЖНО СДЕЛАТЬ СЕЙЧАС?</h2>
          <p className="text-white/90 text-lg text-shadow">Сыграйте в ежедневную викторину — получите билет на розыгрыш приза!</p>
        </div>
      </div>

      <div className="action-buttons flex gap-4 flex-wrap relative z-10">
        <button
          className="action-btn-primary btn bg-white/90 text-rose-500 border-0 shadow-md py-3 px-6 rounded-xl font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 hover:bg-white hover:translate-y-[-2px] hover:shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            handlePrimaryClick();
          }}
        >
          <span>🎯 НАЧАТЬ ВИКТОРИНУ</span>
        </button>
        <button
          className="action-btn-outline btn bg-white/15 text-white border border-white/30 backdrop-filter backdrop-blur-sm py-3 px-6 rounded-xl font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 hover:bg-white/25"
          onClick={(e) => {
            e.stopPropagation();
            handleSecondaryClick();
          }}
        >
          📋 Посмотреть правила
        </button>
        <button
          className="action-btn-outline btn bg-white/15 text-white border-white/30 backdrop-filter backdrop-blur-sm py-3 px-6 rounded-xl font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 hover:bg-white/25"
          onClick={(e) => {
            e.stopPropagation();
            handleTertiaryClick();
          }}
        >
          ⚙️ Заполнить профиль
        </button>
      </div>
    </div>
  );
};

export default CTASection;