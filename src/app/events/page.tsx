import React from 'react';

const EventsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Мероприятия</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Ближайшие события</h2>
          <p className="text-gray-600">Просмотрите предстоящие мероприятия и события</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Календарь мероприятий</h2>
          <p className="text-gray-600">Календарь всех мероприятий с возможностью записи</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Мои регистрации</h2>
          <p className="text-gray-60">Список мероприятий, в которых вы участвуете</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Архив мероприятий</h2>
          <p className="text-gray-600">Прошедшие мероприятия с результатами и фотоотчетами</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Онлайн-трансляции</h2>
          <p className="text-gray-600">Прямые эфиры с проходящих мероприятий</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Обратная связь</h2>
          <p className="text-gray-600">Оставьте отзыв о прошедших мероприятиях</p>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;