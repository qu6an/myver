import { Card } from "../../../components/ui/card";
import Image from "next/image";
import React from "react";

interface LidersItemProps {
	text: string;
	title: string;
	topResult: {
		name: string;
		points: number;
	} | null;
	mainResult: {
		points: number;
	} | null;
	image: string;
}

export const LeadersItem = ({
	text,
	title,
	topResult,
	mainResult,
	image,
}: LidersItemProps) => {
	return (
		<Card className='mx-auto flex max-w-xs gap-2 p-2 text-white lg:max-w-lg'>
			<div className='shrink-0'>
				<Image src={image} alt='icon' width={50} height={50} />
			</div>
			<div>
				<div className='text-[#B9B8B8]'>
					<h3 className='text-lg lg:text-4xl'>{title}</h3>
					<p className='text-xs lg:text-base'>{text}</p>
				</div>

				<div className='mt-3 grid grid-cols-2 gap-x-3 lg:hidden'>
					<p className='italic'>@{topResult?.name || "-"}</p>{" "}
					<p className='text-lg font-medium'>
						{topResult?.points?.toLocaleString("ru-RU") || 0}
					</p>
					<p className='italic'>Ваш результат</p>{" "}
					<p className='text-lg font-medium text-[#FA6366]'>
						{mainResult?.points?.toLocaleString("ru-RU") || 0}
					</p>
				</div>

				<div className='mt-3 hidden grid-cols-2 gap-x-3 lg:grid'>
					<p className='text-2xl italic'>@{topResult?.name || "-"}</p>{" "}
					<p className='text-2xl italic'>Ваш результат</p>{" "}
					<p className='text-2xl font-medium'>
						{topResult?.points?.toLocaleString("ru-RU") || 0}
					</p>
					<p className='text-2xl font-medium text-[#FA6366]'>
						{mainResult?.points?.toLocaleString("ru-RU") || 0}
					</p>
				</div>
			</div>
		</Card>
	);
};
