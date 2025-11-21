import { SectionProps } from '../types/landing';
import LoginButton from './LoginButton';
import { PlayButtonGame } from './PlayButtonGame';

const item = [
  {
    number: 1,
    title: 'Играть как гость',
    description:
      'Начни как гость — протестируй формат, почувствуй скорость и азарт',
  },

  {
    number: 2,
    title: 'Регистрация (войти)',
    description:
      'Хочешь попасть в таблицу лидеров и участвовать в розыгрыше — регистрируйся!',
  },
  {
    number: 3,
    title: 'Ежедневная игра',
    description: 'Играй каждый день, активируй билеты и повышай свой рейтинг.',
  },
  {
    number: 4,
    title: 'Еженедельный розыгрыш',
    description:
      'Каждый понедельник проводится розыгрыш среди всех активированных билетов.',
  },
];

export default function SecondSection({ user, profile, game }: SectionProps) {
  return (
    <div className="text-white">
      <h1 className="text-center text-2xl font-black sm:text-4xl lg:text-5xl xl:text-6xl">
        Как это работает
      </h1>
      <div className="mx-auto mt-5 grid max-w-[280px] grid-cols-1 gap-3 sm:max-w-[420px] sm:gap-7 lg:mt-10 lg:max-w-max lg:grid-cols-2">
        {item.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 sm:gap-5 lg:max-w-md"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-300 text-center text-2xl font-black text-black sm:h-12 sm:w-12 sm:text-4xl lg:h-16 lg:w-16 lg:text-5xl">
              {item.number}
            </div>
            <div className="text-white">
              <h3 className="font-black sm:text-2xl">{item.title}</h3>
              <p className="text-xs italic sm:text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
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
