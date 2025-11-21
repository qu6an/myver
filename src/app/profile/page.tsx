import React from 'react';

const ProfilePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Мой профиль</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Личная информация</h2>
          <p className="text-gray-600">Имя, фамилия, контактная информация</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Настройки аккаунта</h2>
          <p className="text-gray-600">Безопасность, уведомления, приватность</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">Мои достижения</h2>
          <p className="text-gray-600">Награды и достижения в проектах</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">История активности</h2>
          <p className="text-gray-600">Ваша активность в системе</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
