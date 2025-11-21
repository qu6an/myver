import Image from 'next/image';
import React from 'react';
const fire = '/game/fire.png';
const chat = '/game/chat.png';
const clock = '/game/clock.png';
const gift = '/game/gift.png';

const item = [
  {
    image: fire,
    title: 'Азарт соревнования',
    description: 'Сотни участников каждую неделю — покажи, кто здесь лучший!',
  },

  {
    image: chat,
    title: 'Проверка знаний',
    description: 'Вопросы от экспертов автосервиса и любителей техники.',
  },
  {
    image: clock,
    title: 'Адреналин скорости',
    description:
      'Ограниченное время на ответ - будь точен и быстр, как на пит-стопе.',
  },
  {
    image: gift,
    title: 'Призы каждую неделю',
    description: 'Больше правильных ответов — выше шансы забрать награду.',
  },
];
export default function ThreeSection() {
  return (
    <div className="text-white">
      <h1 className="text-center text-2xl font-black sm:mx-auto sm:max-w-sm sm:text-4xl lg:max-w-max lg:text-5xl xl:text-6xl">
        Почему стоит участвовать
      </h1>
      <div className="mx-auto mt-5 grid max-w-[280px] grid-cols-1 gap-3 sm:max-w-sm sm:gap-6 lg:mt-10 lg:max-w-max lg:grid-cols-2 xl:mt-20">
        {item.map((item, index) => (
          <div key={index} className="flex items-start gap-2.5 lg:max-w-md">
            <Image
              src={item.image}
              alt={item.title}
              width={75}
              height={75}
              className="h-9 w-9 sm:h-16 sm:w-16 lg:h-[75px] lg:w-[75px]"
            />
            <div className="text-white">
              <h3 className="font-black sm:text-2xl">{item.title}</h3>
              <p className="text-xs italic sm:text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
