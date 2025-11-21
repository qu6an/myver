import { Card } from "../../components/ui/card";
import GameButtons from "./GameButtons";
import { IGame, IGameSettings, IProfile, IUser } from "../actions";

interface GameCardProps {
	game: IGame;
	settings: IGameSettings;
	user: IUser | null;
	profile: IProfile;
}

const GameCard = ({ game, settings, user, profile }: GameCardProps) => {
	return (
		<Card className='game-card p-8 text-center'>
			<div className='space-y-6'>
				<div className='space-y-2'>
					<h2 className='text-foreground text-3xl font-bold'>
						Ежедневный квиз
					</h2>
					<p className='text-muted-foreground'>
						{settings.questionsPerGame} вопросов •{" "}
						{settings.timePerQuestion / 1000} секунд на ответ • До{" "}
						{(
							settings.questionsPerGame * settings.timePerQuestion
						).toLocaleString()}{" "}
						очков
					</p>
				</div>

				<GameButtons
					role={profile.role}
					game={game}
					settings={settings}
					user={user}
				/>
			</div>
		</Card>
	);
};

export default GameCard;
