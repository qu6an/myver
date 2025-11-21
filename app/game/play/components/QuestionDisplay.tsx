import { Card } from "../../../components/ui/card";
import { GameQuestion } from "../types";
import Image from "next/image";

interface QuestionDisplayProps {
	question: GameQuestion;
}

export const QuestionDisplay = ({
	question: currentQ,
}: QuestionDisplayProps) => (
	<Card className='bg-gray-300 p-6'>
		<div className='space-y-4'>
			<div className='text-center'>
				{/* <div className="mb-4 flex items-center justify-center space-x-3">
          <div className="text-game-secondary text-sm">
            {currentQ.category} • {currentQ.brand}
          </div>
        </div> */}
				<h2 className='text-lg leading-tight font-bold text-black md:text-2xl'>
					{currentQ.question}
				</h2>
			</div>
		</div>
	</Card>
);
