import { eachWeekOfInterval, endOfWeek, format, subWeeks } from 'date-fns';

export const getWeekRanges = () => {
  const now = new Date();
  // Создаем интервал от 10 недель назад до текущей недели
  const startDate = subWeeks(now, 9); // 10 недель включая текущую
  const endDate = now;

  const weeks = eachWeekOfInterval(
    { start: startDate, end: endDate },
    { weekStartsOn: 1 } // 1 = понедельник
  );

  return weeks
    .map(weekStart => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      return `${format(weekStart, 'yyyy-MM-dd')}_${format(
        weekEnd,
        'yyyy-MM-dd'
      )}`;
    })
    .reverse(); // Чтобы текущая неделя была первой в списке
};
