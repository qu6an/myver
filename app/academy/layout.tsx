"use client";

import type React from "react";

import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	SidebarInset,
} from "../components/ui/sidebar";
import {
	GraduationCap,
	BookOpen,
	Calendar,
	TrendingUp,
	Bell,
	Settings,
	LogOut,
	Car,
	Home,
	Search,
	Award,
	Users,
	MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AcademyLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const user = {
		name: "Иван Петров",
		role: "EVERYCAR",
		avatar: "/diverse-user-avatars.png",
	};

	const menuItems = [
		{
			title: "Главная",
			icon: Home,
			href: "/academy",
		},
		{
			title: "Мои курсы",
			icon: BookOpen,
			href: "/academy/courses",
		},
		{
			title: "Каталог курсов",
			icon: Search,
			href: "/academy/catalog",
		},
		{
			title: "Мой прогресс",
			icon: TrendingUp,
			href: "/academy/progress",
		},
		{
			title: "Мероприятия",
			icon: Calendar,
			href: "/academy/events",
		},
		{
			title: "Достижения",
			icon: Award,
			href: "/academy/achievements",
		},
		{
			title: "База знаний",
			icon: GraduationCap,
			href: "/academy/knowledge",
		},
		{
			title: "Сообщения",
			icon: MessageSquare,
			href: "/academy/messages",
		},
	];

	const adminItems = [
		{
			title: "Управление курсами",
			icon: Settings,
			href: "/academy/admin/courses",
		},
		{
			title: "Пользователи",
			icon: Users,
			href: "/academy/admin/users",
		},
	];

	return (
		<SidebarProvider>
			<div className='flex min-h-screen w-full'>
				<Sidebar>
					<SidebarHeader>
						<div className='flex items-center space-x-3 px-2'>
							<div className='bg-purple-600 p-2 rounded-lg'>
								<GraduationCap className='h-6 w-6 text-white' />
							</div>
							<div>
								<h2 className='text-lg font-bold text-gray-900'>
									Академия
								</h2>
								<p className='text-xs text-gray-500'>
									EVERYCAR
								</p>
							</div>
						</div>
					</SidebarHeader>

					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Обучение</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{menuItems.map((item) => {
										const Icon = item.icon;
										const isActive = pathname === item.href;
										return (
											<SidebarMenuItem key={item.href}>
												<SidebarMenuButton
													asChild
													isActive={isActive}
												>
													<Link href={item.href}>
														<Icon className='h-4 w-4' />
														<span>
															{item.title}
														</span>
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>

						{/* Admin section - показывается только для администраторов */}
						{user.role === "Администратор Академии" && (
							<SidebarGroup>
								<SidebarGroupLabel>
									Администрирование
								</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{adminItems.map((item) => {
											const Icon = item.icon;
											const isActive =
												pathname === item.href;
											return (
												<SidebarMenuItem
													key={item.href}
												>
													<SidebarMenuButton
														asChild
														isActive={isActive}
													>
														<Link href={item.href}>
															<Icon className='h-4 w-4' />
															<span>
																{item.title}
															</span>
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											);
										})}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						)}
					</SidebarContent>

					<SidebarFooter>
						<SidebarMenu>
							<SidebarMenuItem>
								<div className='flex items-center space-x-3 px-2 py-2'>
									<Avatar className='h-8 w-8'>
										<AvatarImage
											src={
												user.avatar ||
												"/placeholder.svg"
											}
											alt={user.name}
										/>
										<AvatarFallback>ИП</AvatarFallback>
									</Avatar>
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium text-gray-900 truncate'>
											{user.name}
										</p>
										<p className='text-xs text-gray-500 truncate'>
											{user.role}
										</p>
									</div>
								</div>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href='/dashboard'>
										<LogOut className='h-4 w-4' />
										<span>Вернуться в портал</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarFooter>
				</Sidebar>

				<SidebarInset>
					{/* Header */}
					<header className='bg-white shadow-sm border-b'>
						<div className='flex items-center justify-between h-16 px-4'>
							<div className='flex items-center space-x-4'>
								<SidebarTrigger />
								<div className='flex items-center space-x-3'>
									<div className='bg-blue-600 p-2 rounded-lg'>
										<Car className='h-5 w-5 text-white' />
									</div>
									<div>
										<h1 className='text-lg font-bold text-gray-900'>
											EVERYCAR
										</h1>
										<p className='text-xs text-gray-500'>
											Онлайн Академия
										</p>
									</div>
								</div>
							</div>
							<div className='flex items-center space-x-4'>
								<Button variant='ghost' size='sm'>
									<Bell className='h-4 w-4' />
								</Button>
								<Button variant='ghost' size='sm'>
									<Settings className='h-4 w-4' />
								</Button>
							</div>
						</div>
					</header>

					{/* Main Content */}
					<main className='flex-1 p-6'>{children}</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
