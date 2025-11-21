import {
  eachMonthOfInterval,
  endOfMonth,
  startOfMonth,
  format,
  subMonths,
} from 'date-fns';

export const getMonthRanges = () => {
  const now = new Date();
  // Создаем интервал от 10 месяцев назад до текущего месяца
  const startDate = subMonths(now, 9); // 10 месяцев включая текущий
  const endDate = now;

  const months = eachMonthOfInterval({ start: startDate, end: endDate });

  return months
    .map(monthStart => {
      const monthEnd = endOfMonth(monthStart);
      return `${format(startOfMonth(monthStart), 'yyyy-MM-dd')}_${format(
        monthEnd,
        'yyyy-MM-dd'
      )}`;
    })
    .reverse(); // Чтобы текущий месяц был первым
};
