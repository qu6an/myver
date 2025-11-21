import { Suspense } from 'react';
import { getStartGameData } from './actions';
import GameCard from './components/GameCard';
import GameRules from './components/GameRules';
import HeroSection from './components/HeroSection';
import SecondSection from './components/SecondSection';
import ThreeSection from './components/ThreeSection';
import FourSection from './components/FourSection';
import FiveSection from './components/FiveSection';

const GamePage = async () => {
  const { profile, game, error, settings, user } = await getStartGameData();

  return (
    <div className="p-4">
      <Suspense fallback={<div>Загрузка...</div>}>
        <div className="container mx-auto space-y-20 pb-10 lg:pb-14 xl:pb-32">
          <HeroSection
            user={user}
            profile={profile}
            game={game}
            settings={settings}
          />

          <SecondSection user={user} profile={profile} game={game} />

          <ThreeSection />

          <FourSection />

          <FiveSection user={user} profile={profile} game={game} />
        </div>
      </Suspense>
    </div>
  );
};

export default GamePage;
