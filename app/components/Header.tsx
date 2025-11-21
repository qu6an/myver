'use client';

import React, { useState } from 'react';

interface UserMenuProps {
  name: string;
  role: string;
  avatar: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ name, role, avatar }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        className="user-menu flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-colors duration-200 hover:bg-indigo-100/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-bold">
          {avatar}
        </div>
        <div className="user-info">
          <div className="user-name text-sm font-semibold">{name}</div>
          <div className="user-role text-xs text-gray-500">{role}</div>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">Профиль</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">Настройки</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">Выход</a>
        </div>
      )}
    </div>
  );
};

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Главная", subtitle = "Панель управления вашим успехом" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      console.log('Поиск:', searchQuery);
    } else {
      console.log('Введите текст для поиска');
    }
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="header flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
      <div className="page-title">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      
      <div className="header-actions flex gap-4 items-center">
        <div className="search-box relative">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Поиск по вопросам, событиям, курсам..."
              className="p-2.5 pl-10 pr-10 border border-gray-200 rounded-xl w-72 text-sm transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={handleSearchClear}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </form>
        </div>
        
        <UserMenu
          name="Алексей Иванов"
          role="Мастер-консультант"
          avatar="АИ"
        />
      </div>
    </header>
  );
};

export default Header;
