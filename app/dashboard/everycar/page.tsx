import React from 'react';

const EveryCarPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Проект EveryCar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Соревнование</h2>
          <p className="text-gray-600">Участвуйте в соревнованиях и повышайте свой рейтинг</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Розыгрыш билетов</h2>
          <p className="text-gray-600">Получайте билеты и участвуйте в розыгрышах призов</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Достижения</h2>
          <p className="text-gray-600">Следите за своими достижениями и наградами</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Статистика</h2>
          <p className="text-gray-600">Просматривайте статистику по вашей активности</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Расчёт GRADE</h2>
          <p className="text-gray-600">Узнайте, как рассчитывается ваш рейтинг GRADE</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Мой автосервис</h2>
          <p className="text-gray-600">Управляйте информацией о вашем автосервисе</p>
        </div>
      </div>
    </div>
  );
};

export default EveryCarPage;