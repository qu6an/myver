"use client";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginButton() {
	const router = useRouter();
	const handleAuthAction = () => {
		router.push("/login");
	};
	return (
		<Button
			onClick={handleAuthAction}
			size='lg'
			variant='outline'
			className='border-foreground/50 text-foreground hover:text-foreground mx-auto flex h-max w-full flex-col items-center gap-0 bg-orange-600 px-4 py-3 leading-[100%] font-medium hover:bg-orange-700'
		>
			<span className='text-2xl'>ВОЙТИ</span>
			<span className='text-sm tracking-normal italic xl:text-lg'>
				регистрация и борьба за призы
			</span>
		</Button>
	);
}
