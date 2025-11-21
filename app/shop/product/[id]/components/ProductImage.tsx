import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Heart, Play } from "lucide-react";
import Image from "next/image";
import { Params } from "../page";
import { Product } from "../productType";

export default function ProductImage({
	params,
	product,
}: {
	params: Params;
	product: Product;
}) {
	return (
		<div className='mb-8'>
			<div className='relative'>
				<Image
					src={product.image || "/placeholder.svg"}
					alt={product.title}
					width={800}
					height={450}
					className='w-full h-96 object-cover rounded-lg'
				/>
				<div className='absolute top-4 left-4'>
					<Badge className='bg-red-500 text-white'>
						{product.badge}
					</Badge>
				</div>
				<Button
					variant='ghost'
					size='sm'
					className='absolute top-4 right-4 bg-white/90 hover:bg-white'
				>
					<Heart className='h-4 w-4' />
				</Button>
				<div className='absolute inset-0 flex items-center justify-center'>
					<Button
						size='lg'
						className='bg-white/90 text-gray-900 hover:bg-white'
					>
						<Play className='h-6 w-6 mr-2' />
						Предварительный просмотр
					</Button>
				</div>
			</div>
		</div>
	);
}
