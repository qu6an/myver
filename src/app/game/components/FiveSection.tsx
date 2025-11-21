import Image from 'next/image';
import LoginButton from './LoginButton';
import Link from 'next/link';
import { SectionProps } from '../types/landing';
import { PlayButtonGame } from './PlayButtonGame';
import { Button } from '@/components/ui/button';
const gift = '/game/gift.png';
const calendar = '/game/calendar.png';
const mail = '/game/mail.png';

const item = [
  {
    image: gift,
    text: 'Еженедельный приз разыгрывается в понедельник среди всех участников, которые ответили на 30 вопросов и активировали минимум один билет на прошедшей неделе.',
  },

  {
    image: calendar,
    text: 'Новый розыгрыш запускается каждый понедельник в 00:01 по мск автоматически.',
  },
  {
    image: mail,
    text: 'Победитель уведомляется в личном кабинете, по email или пуш-уведомлением в случае его подключения.',
  },
];

export default function FiveSection({ user, profile, game }: SectionProps) {
  return (
    <div className="text-white">
      <h1 className="text-center text-2xl font-black sm:text-4xl lg:text-5xl xl:text-6xl">
        Еженедельный розыгрыш
      </h1>
      <Button
        asChild
        className="mx-auto mt-3 flex w-max py-1 text-center leading-0 sm:mt-3 sm:text-xl lg:mt-5 lg:text-2xl lg:hover:underline xl:py-3"
      >
        <Link href="https://disk.yandex.ru/i/udwKcZd4b-aIng" target="_blank">
          Полные правила
        </Link>
      </Button>
      <div className="mx-auto mt-5 grid max-w-[280px] grid-cols-1 gap-3 sm:max-w-xl lg:mt-10 lg:max-w-4xl">
        {item.map((item, index) => (
          <div key={index} className="flex items-start gap-2.5">
            <Image
              src={item.image}
              alt={'image'}
              width={32}
              height={32}
              className="h-6 w-6 lg:h-8 lg:w-8"
            />
            <div className="text-white">
              <p className="text-xs sm:text-lg sm:leading-[120%]">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center font-bold sm:mx-auto sm:max-w-sm sm:text-2xl lg:max-w-max lg:text-3xl xl:mt-20">
        ГОТОВЫ подтвердить свою квалификацию?
      </p>
      <div className="mt-10 sm:mx-auto sm:max-w-sm xl:mt-14">
        {user ? (
          <PlayButtonGame role={profile.role} game={game} user={user} />
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
