import Image from 'next/image';
import GameButtons from './GameButtons';
import { SectionProps } from '../types/landing';

const HeroSection = ({ user, profile, game, settings }: SectionProps) => {
  return (
    <div className="relative">
      <div className="hidden h-full w-full lg:block">
        <Image
          src={'/game/bg-hero.png'}
          alt="Автомобильная викторина"
          width={528}
          height={679}
          className="absolute right-0 bottom-0 z-0 w-auto lg:h-[450px] xl:h-[800px]"
        />
      </div>
      <div className="from-game-background-start to-game-background-start/0 absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-t"></div>
      <div className="relative z-10 flex h-max w-full items-center pt-24 lg:pt-28 xl:h-[800px] xl:pt-0">
        <div className="max-w-[640px] text-white sm:mx-auto lg:mx-0">
          <h1 className="font-inter text-center text-[30px] leading-[100%] font-black text-white uppercase sm:text-[50px] sm:leading-[120%] xl:text-[70px]">
            Автомобильная викторина
          </h1>
          <p className="mt-4 text-center text-sm font-medium italic xl:text-base">
            Думай как профи. Играй как чемпион. Побеждай каждую неделю.
          </p>
          <p className="mt-9 text-center text-sm sm:text-lg xl:mt-24 xl:text-2xl">
            АВТОМОБИЛЬНАЯ ВИКТОРИНА - твой шанс доказать, что ты знаешь больше
            всех.
          </p>
          <p className="mt-4 text-center text-sm sm:mt-0 sm:text-lg xl:text-2xl">
            Отвечай быстро, набирай очки и выигрывай призы.
          </p>
          <div className="mt-11 sm:mx-auto sm:max-w-sm xl:min-w-max">
            <GameButtons
              role={profile.role}
              game={game}
              settings={settings}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
