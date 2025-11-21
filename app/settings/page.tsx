import React from 'react';

const SettingsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Настройки</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Общие настройки</h2>
          <p className="text-gray-600">Язык интерфейса, часовой пояс, формат даты</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Уведомления</h2>
          <p className="text-gray-600">Настройка email и push-уведомлений</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Безопасность</h2>
          <p className="text-gray-600">Пароль, двухфакторная аутентификация</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Конфиденциальность</h2>
          <p className="text-gray-600">Настройки видимости профиля и данных</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;