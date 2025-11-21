import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { User, Trophy, Settings, ChevronDown } from "lucide-react";
import { useSession } from "@/components/providers/SessionProvider";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export const UserMenu = ({ isAdmin }: { isAdmin: boolean }) => {
	const { user } = useSession();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [profile, setProfile] = useState<{
		surname: string | null;
		name: string | null;
	} | null>(null);
	const supabase = createClient();

	useEffect(() => {
		const fetchProfile = async () => {
			if (user && !user.is_anonymous) {
				const { data } = await supabase
					.schema("game")
					.from("profiles")
					.select("name, surname")
					.eq("user_id", user.id)
					.single();
				if (data) {
					setProfile(data);
				}
			}
		};

		fetchProfile();
	}, [user, supabase]);

	if (!user || user.is_anonymous) return null;

	const getUserInitials = () => {
		const surname = profile?.surname || "";
		const name = profile?.name || "";
		if (surname && name) {
			return `${surname[0]}${name[0]}`.toUpperCase();
		}
		const emailName = user.email?.split("@")[0] || "";
		return emailName.slice(0, 2).toUpperCase();
	};

	const getUserDisplayName = () => {
		const surname = profile?.surname || "";
		const name = profile?.name || "";
		if (surname && name) {
			return `${surname} ${name}`;
		}
		return user.email?.split("@")[0] || "Пользователь";
	};

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					className='border-border hover:bg-muted text-foreground flex items-center space-x-2 px-3 py-2'
				>
					<Avatar className='h-6 w-6'>
						<AvatarFallback className='bg-primary text-primary-foreground text-xs'>
							{getUserInitials()}
						</AvatarFallback>
					</Avatar>
					<span className='hidden text-sm sm:inline'>
						{getUserDisplayName()}
					</span>
					<ChevronDown className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='end'
				className='game-theme game-card border-border w-56'
			>
				<div className='border-border border-b px-3 py-2'>
					<p className='text-foreground font-medium'>
						{getUserDisplayName()}
					</p>
					<p className='text-muted-foreground text-xs'>
						{user.email}
					</p>
				</div>

				<DropdownMenuItem
					onClick={() => {
						router.push("/game/profile");
						setIsOpen(false);
					}}
					className='hover:bg-muted focus:bg-muted text-foreground cursor-pointer'
				>
					<User className='mr-2 h-4 w-4' />
					Профиль
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => {
						router.push("/game/leaderboard");
						setIsOpen(false);
					}}
					className='hover:bg-muted focus:bg-muted text-foreground cursor-pointer'
				>
					<Trophy className='mr-2 h-4 w-4' />
					Рейтинг
				</DropdownMenuItem>

				{isAdmin && (
					<DropdownMenuItem
						onClick={() => {
							router.push("/game/admin");
							setIsOpen(false);
						}}
						className='hover:bg-muted focus:bg-muted text-foreground cursor-pointer'
					>
						<Settings className='mr-2 h-4 w-4' />
						Админ-панель
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
