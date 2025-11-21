import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

export interface NotificationHook {
  notifications: Notification[];
  addNotification: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
 markAllAsRead: () => void;
  clearAll: () => void;
}

// Уведомления отключены - заглушка
export const useNotifications = (): NotificationHook => {
  // const [notifications, setNotifications] = useState<Notification[]>([]); // Уведомления отключены
  const notifications = []; // Пустой массив уведомлений

  // useEffect(() => { // Уведомления отключены
  //   // Load notifications from localStorage if needed
  //   const savedNotifications = localStorage.getItem('notifications');
  //   if (savedNotifications) {
  //     try {
  //       const parsed = JSON.parse(savedNotifications);
  //       // Convert string dates back to Date objects
  //       const notificationsWithDates = parsed.map((n: any) => ({
  //         ...n,
  //         timestamp: new Date(n.timestamp),
  //       }));
  //       setNotifications(notificationsWithDates);
  //     } catch (e) {
  //       console.error('Error parsing notifications from localStorage', e);
  //     }
  //   }
  // }, []);

  // useEffect(() => { // Уведомления отключены
  //   // Save notifications to localStorage
  //   localStorage.setItem('notifications', JSON.stringify(notifications));
  // }, [notifications]);

  const addNotification = (
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ) => {
    // Уведомления отключены - пустая функция
    console.log('Уведомления отключены:', title, message, type); // Для отладки, можно удалить
  };

  const removeNotification = (id: string) => {
    // Уведомления отключены - пустая функция
  };

  const markAsRead = (id: string) => {
    // Уведомления отключены - пустая функция
  };

  const markAllAsRead = () => {
    // Уведомления отключены - пустая функция
  };

  const clearAll = () => {
    // Уведомления отключены - пустая функция
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
  };
};