import React, { createContext, useContext, ReactNode } from 'react';

// Заглушка для отключенных уведомлений
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface NotificationHook {
  notifications: Notification[];
  addNotification: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const emptyNotifications: Notification[] = [];

const emptyNotificationHook: NotificationHook = {
  notifications: emptyNotifications,
  addNotification: () => {}, // Пустая функция - уведомления отключены
  removeNotification: () => {}, // Пустая функция - уведомления отключены
  markAsRead: () => {}, // Пустая функция - уведомления отключены
  markAllAsRead: () => {}, // Пустая функция - уведомления отключены
  clearAll: () => {}, // Пустая функция - уведомления отключены
};

const NotificationContext = createContext<NotificationHook>(emptyNotificationHook);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NotificationContext.Provider value={emptyNotificationHook}>
      {children}
      {/* Компонент уведомлений отключен */}
      {/* <NotificationList /> */}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

// Компонент уведомлений отключен
// const NotificationList: React.FC = () => {
//   const { notifications, removeNotification, markAsRead } = useNotificationContext();

//   return (
//     <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
//       {notifications.slice(0, 5).map((notification) => (
//         <div
//           key={notification.id}
//           className={`notification-item p-4 rounded-xl shadow-lg border-l-4 transform transition-all duration-300 ease-in-out ${
//             notification.type === 'success'
//               ? 'bg-green-50 border-l-green-50 text-green-800'
//               : notification.type === 'error'
//               ? 'bg-red-50 border-l-red-50 text-red-800'
//               : notification.type === 'warning'
//               ? 'bg-yellow-50 border-l-yellow-50 text-yellow-800'
//               : 'bg-blue-50 border-l-blue-500 text-blue-80'
//           } ${notification.read ? 'opacity-70' : 'opacity-100'}`}
//           onClick={() => markAsRead(notification.id)}
//         >
//           <div className="flex justify-between items-start">
//             <div className="flex-1">
//               <h4 className="font-bold text-sm">{notification.title}</h4>
//               <p className="text-sm mt-1">{notification.message}</p>
//               <p className="text-xs opacity-70 mt-2">
//                 {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </p>
//             </div>
//             <button
//               className="ml-2 text-gray-500 hover:text-gray-700"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 removeNotification(notification.id);
//               }}
//             >
//               <i className="fas fa-times"></i>
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };