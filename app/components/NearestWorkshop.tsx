'use client';

import React from 'react';

interface NearestWorkshopProps {
  title?: string;
  brand?: string;
 topic?: string;
 description?: string;
 expert?: string;
 expertTitle?: string;
  date?: string;
  time?: string;
 brandLogo?: string;
}

const NearestWorkshop: React.FC<NearestWorkshopProps> = ({
  title = "Ближайший воркшоп",
  brand = "BOSCH",
  topic = "Диагностика электронных систем современных автомобилей",
  description = "Разберитесь со сложными случаями диагностики и научитесь быстро находить неисправности. Эксперт ответит на ваши вопросы в прямом эфире.",
  expert = "Иван Петров",
  expertTitle = "Технический эксперт Bosch",
  date = "Среда, 20 ноября 2025",
  time = "15:00 МСК",
  brandLogo = "https://autocom.parts/storage/c/2025/01/20/1737470252_380485_74.png"
}) => {
 const handleJoinWorkshop = () => {
    console.log('Участие в воркшопе');
  };

  const handleAskQuestion = () => {
    console.log('Задать вопрос');
  };

  return (
    <div className="card bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
      <div className="card-header mb-4">
        <div className="card-title text-lg font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-graduation-cap text-indigo-600"></i>
          <span>{title}</span>
        </div>
      </div>
      
      <div className="workshop-card">
        <div className="workshop-layout flex flex-col gap-3">
          <div className="workshop-brand-section flex flex-col items-center md:items-start">
            <img
              src={brandLogo}
              alt={brand}
              className="workshop-brand-logo w-16 h-16 object-contain mb-2"
            />
            <div className="workshop-brand-name font-bold text-gray-800">{brand}</div>
          </div>
          
          <div className="workshop-content-section flex-1">
            <h3 className="workshop-topic text-lg font-bold text-gray-900 mb-2">{topic}</h3>
            <p className="workshop-description text-sm text-gray-600 mb-3">{description}</p>
            
            <div className="workshop-meta space-y-1.5 mb-4">
              <div className="workshop-meta-item flex items-center gap-2 text-xs text-gray-600">
                <i className="fas fa-user-tie text-indigo-600"></i>
                <span>{expert} • {expertTitle}</span>
              </div>
              <div className="workshop-meta-item flex items-center gap-2 text-xs text-gray-600">
                <i className="fas fa-calendar text-indigo-600"></i>
                <span>{date} • {time}</span>
              </div>
            
              <div className="workshop-actions flex flex-col sm:flex-row gap-2 mt-3">
                <button
                  className="btn btn-accent flex-1 py-2 px-3 rounded-lg font-bold text-xs cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
                  onClick={handleJoinWorkshop}
                >
                  <i className="fas fa-rocket"></i> УЧАСТВОВАТЬ
                </button>
                <button
                  className="btn btn-outline flex-1 py-2 px-3 rounded-lg font-bold text-xs cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 text-indigo-600 border border-indigo-600 hover:bg-indigo-100/50"
                  onClick={handleAskQuestion}
                >
                  <i className="fas fa-question-circle"></i> ЗАДАТЬ ВОПРОС
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearestWorkshop;