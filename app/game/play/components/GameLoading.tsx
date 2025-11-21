import { Card } from "../../../components/ui/card";
import { Loader2 } from "lucide-react";

export const GameLoading = () => (
	<div className='flex min-h-screen items-center justify-center'>
		<Card className='game-card p-8'>
			<div className='flex flex-col items-center space-y-4'>
				<Loader2 className='text-game-primary h-8 w-8 animate-spin' />
				<p className='text-white'>Загрузка игры...</p>
			</div>
		</Card>
	</div>
);
