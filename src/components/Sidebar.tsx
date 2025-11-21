'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface NavItem {
  id: string;
  title: string;
  icon: string;
  badge?: string;
  badgeType?: 'primary' | 'default';
  submenu?: NavItem[];
}

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [sidebarItems, setSidebarItems] = useState<NavItem[]>([]);
  const submenuRefs = useRef<{[key: string]: HTMLUListElement | null}>({});

  useEffect(() => {
    // Восстановление состояния сайдбара
    const savedCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    setIsCollapsed(savedCollapsed);

    // Инициализация навигационных элементов
    const items: NavItem[] = [
      {
        id: 'dashboard',
        title: 'ПАНЕЛЬ УПРАВЛЕНИЯ',
        icon: 'fas fa-tachometer-alt',
        submenu: []
      },
      {
        id: 'everycar',
        title: 'EVERYCAR',
        icon: 'fas fa-car',
        submenu: [
          { id: 'everycar-competition', title: 'Соревнование', icon: '' },
          { id: 'everycar-lottery', title: 'Розыгрыш билетов', icon: '', badge: '3' },
          { id: 'everycar-achievements', title: 'Достижения', icon: '' },
          { id: 'everycar-stats', title: 'Статистика', icon: '' },
          { id: 'everycar-grade', title: 'Расчёт GRADE', icon: '' },
          { id: 'everycar-service', title: 'Мой автосервис', icon: '' },
          { id: 'everycar-purchases', title: 'Закупки', icon: '' }
        ]
      },
      {
        id: 'quiz',
        title: 'ВИКТОРИНА',
        icon: 'fa-solid fa-puzzle-piece',
        submenu: [
          { id: 'quiz-overview', title: 'Обзор', icon: '' },
          { id: 'quiz-lottery', title: 'Розыгрыш билетов', icon: '' },
          { id: 'quiz-rewards', title: 'Награды', icon: '' },
          { id: 'quiz-stats', title: 'Статистика', icon: '' },
          { id: 'quiz-service', title: 'Мой автосервис', icon: '' }
        ]
      },
      {
        id: 'garage-of-year',
        title: 'АВТОСЕРВИС ГОДА',
        icon: 'fas fa-trophy',
        badge: '15',
        badgeType: 'primary',
        submenu: [
          { id: 'garage-tasks', title: 'Мои задания', icon: '' },
          { id: 'garage-stages', title: 'Этапы конкурса', icon: '' },
          { id: 'garage-team', title: 'Команда', icon: '' },
          { id: 'garage-ratings', title: 'Рейтинги', icon: '' },
          { id: 'garage-prizes', title: 'Призы и награды', icon: '' },
          { id: 'garage-rules', title: 'Правила', icon: '' }
        ]
      },
      {
        id: 'academy',
        title: 'АКАДЕМИЯ СТО',
        icon: 'fas fa-graduation-cap',
        submenu: [
          { id: 'academy-tests', title: 'Тесты', icon: '' },
          { id: 'academy-workshops', title: 'Воркшопы', icon: '', badge: '2' },
          { id: 'academy-courses', title: 'Курсы', icon: '' },
          { id: 'academy-intensive', title: 'Интенсивы', icon: '' },
          { id: 'academy-schedule', title: 'Расписание', icon: '' },
          { id: 'academy-vacation', title: 'Отпуск за знаниями', icon: '' },
          { id: 'academy-teachers', title: 'Преподаватели', icon: '' }
        ]
      },
      {
        id: 'certification',
        title: 'СЕРТИФИКАЦИЯ СТО',
        icon: 'fas fa-award',
        submenu: [
          { id: 'cert-terms', title: 'Условия участия', icon: '' },
          { id: 'cert-status', title: 'Статус', icon: '' },
          { id: 'cert-producers', title: 'Производители', icon: '' }
        ]
      },
      {
        id: 'shop',
        title: 'ИНТЕРНЕТ-МАГАЗИН',
        icon: 'fas fa-shopping-cart',
        badge: '5',
        submenu: [
          { id: 'shop-catalog', title: 'Каталог', icon: '' },
          { id: 'shop-cart', title: 'Корзина', icon: '', badge: '3' },
          { id: 'shop-favorites', title: 'Избранное', icon: '' },
          { id: 'shop-purchases', title: 'Покупки', icon: '' }
        ]
      },
      {
        id: 'awards',
        title: 'НАГРАДЫ',
        icon: 'fas fa-medal',
        submenu: []
      },
      {
        id: 'settings',
        title: 'НАСТРОЙКИ',
        icon: 'fas fa-cog',
        submenu: []
      },
      {
        id: 'support',
        title: 'ПОДЕРЖКА',
        icon: 'fas fa-question-circle',
        submenu: [
          { id: 'support-about', title: 'О проекте', icon: '' },
          { id: 'support-faq', title: 'FAQ', icon: '' },
          { id: 'support-contacts', title: 'Контакты', icon: '' },
          { id: 'support-report', title: 'Сообщить о проблеме', icon: '' }
        ]
      }
    ];
    setSidebarItems(items);
  }, []);

  useEffect(() => {
    // Обновляем высоту подменю при изменении activeSubmenu
    Object.entries(submenuRefs.current).forEach(([key, ref]) => {
      if (ref && key === activeSubmenu) {
        ref.style.height = `${ref.scrollHeight}px`;
      } else if (ref) {
        ref.style.height = '0px';
      }
    });
  }, [activeSubmenu]);

  const toggleSidebar = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    localStorage.setItem('sidebarCollapsed', String(newCollapsed));
  };

  const toggleSubmenu = (id: string) => {
    setActiveSubmenu(activeSubmenu === id ? null : id);
  };

  const handleNavItemClick = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    // Обработка клика по элементу навигации
    console.log(`Навигация к: ${itemId}`);
    
    // Определяем маршрут на основе itemId
    let route = '/';
    switch(itemId) {
      case 'dashboard':
        route = '/';
        break;
      case 'everycar':
      case 'everycar-competition':
      case 'everycar-lottery':
      case 'everycar-achievements':
      case 'everycar-stats':
      case 'everycar-grade':
      case 'everycar-service':
      case 'everycar-purchases':
        route = '/dashboard/everycar';
        break;
      case 'quiz':
      case 'quiz-overview':
      case 'quiz-lottery':
      case 'quiz-rewards':
      case 'quiz-stats':
      case 'quiz-service':
        route = '/dashboard/quiz';
        break;
      case 'garage-of-year':
      case 'garage-tasks':
      case 'garage-stages':
      case 'garage-team':
      case 'garage-ratings':
      case 'garage-prizes':
      case 'garage-rules':
        route = '/dashboard/bestcto';
        break;
      case 'academy':
        route = '/academy';
        break;
      case 'certification':
        route = '/academy';
        break;
      case 'shop':
        route = '/shop';
        break;
      case 'awards':
        route = '/';
        break;
      case 'events':
        route = '/events';
        break;
      case 'profile':
        route = '/profile';
        break;
      case 'settings':
        route = '/settings';
        break;
      case 'support':
      case 'support-about':
      case 'support-faq':
      case 'support-contacts':
      case 'support-report':
        route = '/';
        break;
      default:
        route = '/';
    }
    
    // Выполняем навигацию с помощью Next.js router
    router.push(route);
  };

  const handleQuickAction = (action: string) => {
    console.log(`Быстрое действие: ${action}`);
  };

  // Функция для установки ref для подменю
 const setSubmenuRef = (id: string) => (el: HTMLUListElement | null) => {
    submenuRefs.current[id] = el;
  };

  return (
    <div 
      className={`fixed top-5 h-[calc(100vh-40px)] z-10 transition-all duration-300 ease-in-out flex-col ${
        isCollapsed ? 'w-[70px]' : 'w-[300px]'
      }`}
    >
      <button 
        className="mobile-menu-toggle fixed bottom-5 left-5 z-20 w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      <div 
        className={`sidebar bg-white rounded-3xl p-4 shadow-lg transition-all duration-300 ease-in-out flex flex-col z-20 h-[calc(100vh-40px)] ${
          mobileMenuOpen ? 'block' : 'hidden md:block'
        } ${isCollapsed ? 'w-[70px]' : 'w-[300px]'}`}
        id="sidebar"
      >
        <div className="logo flex flex-col items-center text-center pb-4 mb-3 border-b border-gray-200 relative transition-all duration-300">
          <img 
            src="https://autocom.parts/i/logo.svg" 
            alt="АВТОКОМ" 
            className={`logo-img w-auto transition-all duration-300 ${isCollapsed ? 'w-10' : 'w-60'}`}
          />
          <button 
            className="toggle-sidebar absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-100 border border-indigo-200 rounded-lg w-7 h-7 flex items-center justify-center cursor-pointer text-indigo-600 transition-all duration-300 hover:bg-indigo-200"
            onClick={toggleSidebar}
          >
            <i className={`fas fa-chevron-left transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}></i>
          </button>
        </div>

        <div className={`quick-actions grid grid-cols-2 gap-1.5 mb-4 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 h-0 p-0 overflow-hidden' : 'opacity-100'}`}>
          <button 
            className="quick-action flex flex-col items-center p-2 bg-indigo-100 rounded-lg border-none cursor-pointer text-gray-600 transition-all duration-300 hover:bg-indigo-200 hover:text-indigo-60 hover:-translate-y-0.5"
            onClick={() => handleQuickAction('notifications')}
          >
            <i className="fas fa-bell text-sm mb-1"></i>
            <span className="text-xs font-medium">Уведомления</span>
          </button>
          <button 
            className="quick-action flex flex-col items-center p-2 bg-indigo-10 rounded-lg border-none cursor-pointer text-gray-600 transition-all duration-300 hover:bg-indigo-200 hover:text-indigo-600 hover:-translate-y-0.5"
            onClick={() => handleQuickAction('calendar')}
          >
            <i className="fas fa-calendar text-sm mb-1"></i>
            <span className="text-xs font-medium">Календарь</span>
          </button>
        </div>

        <ul className="nav-links flex-grow overflow-y-auto overflow-x-hidden p-2">
          <li className="nav-title py-3 px-3 text-xs font-bold text-gray-40 uppercase tracking-[0.5px] mt-1 transition-all duration-300">
            ГЛАВНАЯ
          </li>
          <li>
            <a 
              href="#" 
              className="nav-link flex items-center p-3 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 hover:translate-x-0.5 rounded-xl transition-all duration-300 font-medium text-sm active:bg-indigo-200 active:text-indigo-70 relative"
              onClick={(e) => handleNavItemClick(e, 'dashboard')}
            >
              <i className="nav-icon fas fa-tachometer-alt mr-2.5 text-base w-5 text-center flex-shrink-0 transition-all duration-300"></i>
              <span className={`menu-text transition-all duration-300 whitespace-nowrap overflow-hidden ${isCollapsed ? 'opacity-0 w-0 h-0 m-0 p-0' : 'opacity-100'}`}>
                ПАНЕЛЬ УПРАВЛЕНИЯ
              </span>
              <span className="absolute left-0 top-0 h-full w-0.5 bg-indigo-600 rounded-r-md"></span>
            </a>
          </li>

          <li className="nav-title py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-[0.5px] mt-1 transition-all duration-300">
            ПРОЕКТЫ
          </li>

          {sidebarItems.filter(item => ['everycar', 'quiz', 'garage-of-year', 'academy', 'certification', 'shop'].includes(item.id)).map((item) => (
            <li 
              key={item.id} 
              className={`has-submenu ${activeSubmenu === item.id ? 'active' : ''}`}
            >
              <a 
                href="#" 
                className="nav-link flex items-center p-3 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 hover:translate-x-0.5 rounded-xl transition-all duration-300 font-medium text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSubmenu(item.id);
                }}
              >
                <i className={`${item.icon} mr-2.5 text-base w-5 text-center flex-shrink-0 transition-all duration-300`}></i>
                <span className={`menu-text transition-all duration-300 whitespace-nowrap overflow-hidden ${isCollapsed ? 'opacity-0 w-0 h-0 m-0 p-0' : 'opacity-100'}`}>
                  {item.title}
                </span>
                {item.badge && (
                  <span className={`menu-badge ml-auto text-xs font-bold rounded-full px-1.5 py-0.5 flex-shrink-0 min-w-[16px] text-center ${item.badgeType === 'primary' ? 'bg-indigo-500' : 'bg-rose-500'} text-white`}>
                    {item.badge}
                  </span>
                )}
                <span className={`submenu-indicator ml-auto transition-transform duration-300 text-xs text-gray-400 flex-shrink-0 ${activeSubmenu === item.id ? 'rotate-90 text-indigo-600' : ''}`}>
                  ▶
                </span>
              </a>
              <ul 
                ref={setSubmenuRef(item.id)}
                className={`submenu list-none overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] bg-indigo-100/30 rounded-xl m-0.5 pl-2.5 ${activeSubmenu === item.id ? 'max-h-[400px]' : 'max-h-0'}`}
                style={{ height: activeSubmenu === item.id ? 'auto' : '0px' }}
              >
                {item.submenu?.map((subItem) => (
                  <li key={subItem.id} className="m-0">
                    <a 
                      href="#" 
                      className="submenu-link flex items-center p-2 pl-9 text-sm rounded-xl relative hover:bg-indigo-100/50 hover:translate-x-0.5 hover:before:bg-indigo-600 hover:before:scale-125 before:content-[''] before:absolute before:left-5.5 before:top-1/2 before:transform before:-translate-y-1/2 before:w-0.75 before:h-0.75 before:bg-gray-400 before:rounded-full before:transition-all before:duration-300 hover:text-indigo-600"
                      onClick={(e) => handleNavItemClick(e, subItem.id)}
                    >
                      {subItem.title}
                      {subItem.badge && (
                        <span className="menu-badge ml-auto text-xs font-bold rounded-full px-1.5 py-0.5 bg-rose-500 text-white min-w-[16px] text-center">
                          {subItem.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li className="nav-title py-3 px-3 text-xs font-bold text-gray-40 uppercase tracking-[0.5px] mt-1 transition-all duration-300">
            РЕСУРСЫ
          </li>
          
          <li>
            <a 
              href="#" 
              className="nav-link flex items-center p-3 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 hover:translate-x-0.5 rounded-xl transition-all duration-300 font-medium text-sm"
              onClick={(e) => handleNavItemClick(e, 'awards')}
            >
              <i className="fas fa-medal mr-2.5 text-base w-5 text-center flex-shrink-0 transition-all duration-300"></i>
              <span className={`menu-text transition-all duration-300 whitespace-nowrap overflow-hidden ${isCollapsed ? 'opacity-0 w-0 h-0 m-0 p-0' : 'opacity-100'}`}>
                НАГРАДЫ
              </span>
            </a>
          </li>

          <li className="nav-title py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-[0.5px] mt-1 transition-all duration-30">
            СИСТЕМА
          </li>
          
          <li>
            <a 
              href="#" 
              className="nav-link flex items-center p-3 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 hover:translate-x-0.5 rounded-xl transition-all duration-300 font-medium text-sm"
              onClick={(e) => handleNavItemClick(e, 'settings')}
            >
              <i className="fas fa-cog mr-2.5 text-base w-5 text-center flex-shrink-0 transition-all duration-300"></i>
              <span className={`menu-text transition-all duration-300 whitespace-nowrap overflow-hidden ${isCollapsed ? 'opacity-0 w-0 h-0 m-0 p-0' : 'opacity-100'}`}>
                НАСТРОЙКИ
              </span>
            </a>
          </li>

          <li className={`has-submenu ${activeSubmenu === 'support' ? 'active' : ''}`}>
            <a 
              href="#" 
              className="nav-link flex items-center p-3 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 hover:translate-x-0.5 rounded-xl transition-all duration-300 font-medium text-sm"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu('support');
              }}
            >
              <i className="fas fa-question-circle mr-2.5 text-base w-5 text-center flex-shrink-0 transition-all duration-300"></i>
              <span className={`menu-text transition-all duration-300 whitespace-nowrap overflow-hidden ${isCollapsed ? 'opacity-0 w-0 h-0 m-0 p-0' : 'opacity-100'}`}>
                ПОДЕРЖКА
              </span>
              <span className={`submenu-indicator ml-auto transition-transform duration-300 text-xs text-gray-400 flex-shrink-0 ${activeSubmenu === 'support' ? 'rotate-90 text-indigo-600' : ''}`}>
                ▶
              </span>
            </a>
            <ul 
              ref={setSubmenuRef('support')}
              className={`submenu list-none overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] bg-indigo-100/30 rounded-xl m-0.5 pl-2.5 ${activeSubmenu === 'support' ? 'max-h-[400px]' : 'max-h-0'}`}
              style={{ height: activeSubmenu === 'support' ? 'auto' : '0px' }}
            >
              {sidebarItems.find(item => item.id === 'support')?.submenu?.map((subItem) => (
                <li key={subItem.id} className="m-0">
                  <a 
                    href="#" 
                    className="submenu-link flex items-center p-2 pl-9 text-sm rounded-xl relative hover:bg-indigo-100/50 hover:translate-x-0.5 hover:before:bg-indigo-600 hover:before:scale-125 before:content-[''] before:absolute before:left-5.5 before:top-1/2 before:transform before:-translate-y-1/2 before:w-0.75 before:h-0.75 before:bg-gray-400 before:rounded-full before:transition-all before:duration-300 hover:text-indigo-600"
                    onClick={(e) => handleNavItemClick(e, subItem.id)}
                  >
                    {subItem.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <div className="sidebar-footer pt-4 mt-auto border-t border-gray-200 transition-all duration-300">
          <div className="partner-logo-sidebar flex flex-col items-center text-center p-3 bg-indigo-100/50 rounded-xl transition-all duration-300">
            <img 
              src="https://autocom.parts/i/banners/everycar_partnrs/LYNX.svg" 
              alt="LYNXauto" 
              className="w-20 h-auto mb-1.5 transition-all duration-300"
            />
            <span className="text-xs">Генеральный партнер</span>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;