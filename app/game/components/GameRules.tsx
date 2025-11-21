import { Card } from "../../components/ui/card";

interface GameRulesProps {
	settings: any;
}

const GameRules = ({ settings }: GameRulesProps) => {
	return (
		<Card className='game-card p-6'>
			<h3 className='text-foreground mb-4 text-2xl font-bold'>
				Правила игры
			</h3>
			<div className='text-muted-foreground grid gap-6 md:grid-cols-2'>
				<div className='space-y-3'>
					<div className='flex items-start space-x-3'>
						<div className='bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold'>
							1
						</div>
						<div>
							<p className='text-foreground font-medium'>
								{settings.questionsPerGame} вопросов
							</p>
							<p className='text-sm'>
								Разной сложности из базы 200+ вопросов
							</p>
						</div>
					</div>
					<div className='flex items-start space-x-3'>
						<div className='bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold'>
							2
						</div>
						<div>
							<p className='text-foreground font-medium'>
								{settings.timePerQuestion / 1000} секунд на
								ответ
							</p>
							<p className='text-sm'>
								Каждая миллисекунда = 1 очко
							</p>
						</div>
					</div>
				</div>
				<div className='space-y-3'>
					<div className='flex items-start space-x-3'>
						<div className='bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold'>
							3
						</div>
						<div>
							<p className='text-foreground font-medium'>
								{settings.dailyGameLimit === 1
									? "Один раз в день"
									: `${settings.dailyGameLimit} раза в день`}
							</p>
							<p className='text-sm'>Новые вопросы каждый день</p>
						</div>
					</div>
					<div className='flex items-start space-x-3'>
						<div className='bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold'>
							4
						</div>
						<div>
							<p className='text-foreground font-medium'>
								Еженедельные призы
							</p>
							<p className='text-sm'>
								20 призеров каждое воскресенье
							</p>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default GameRules;
