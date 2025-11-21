"use client";

import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { GameQuestion } from "../types";

interface BrandDisplayProps {
	questionData: Partial<GameQuestion | null>;
	onContinueAction: () => void;
}

export const BrandDisplay = ({
	questionData,
	onContinueAction,
}: BrandDisplayProps) => {
	return (
		<div className='flex flex-col items-center justify-center space-y-8 lg:space-y-0'>
			<Card className='bg-white p-8'>
				{questionData?.logo_url ? (
					<Image
						src={questionData.logo_url}
						alt={questionData.brand || "brand logo"}
						width={200}
						height={200}
						className='h-36 w-48 object-contain lg:h-48 lg:w-64'
					/>
				) : (
					<div className='flex h-48 w-48 items-center justify-center bg-gray-200'>
						<p className='text-gray-500'>Нет изображения</p>
					</div>
				)}
			</Card>
			<Button
				onClick={onContinueAction}
				className='h-16 w-60 border border-gray-300 text-2xl uppercase lg:hidden'
			>
				Далее
			</Button>
		</div>
	);
};
