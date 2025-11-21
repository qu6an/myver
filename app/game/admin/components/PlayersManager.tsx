import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "../../../components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Search,
	Filter,
	Eye,
	Ban,
	CheckCircle,
	Calendar,
	Trophy,
	Download,
	FileSpreadsheet,
} from "lucide-react";

import { PlayerDetailsModal } from "./PlayerDetailsModal";
import * as XLSX from "xlsx";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

interface Player {
	id: string;
	name: string;
	email: string;
	nickname: string;
	city: string;
	station: string;
	station_name: string;
	registrationDate: string;
	lastGame: string | null;
	totalGames: number;
	bestScore: number;
	currentWeekPoints: number;
	role: "USER" | "ADMIN";
	status: "ACTIVE" | "BANNED";
}

export const PlayersManager = () => {
	const [players, setPlayers] = useState<Player[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedRole, setSelectedRole] = useState<string>("all");
	const [selectedStatus, setSelectedStatus] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
	const [showPlayerDetails, setShowPlayerDetails] = useState(false);
	const itemsPerPage = 20;

	const supabase = createClient();

	useEffect(() => {
		loadPlayers();
	}, []);

	const loadPlayers = async () => {
		setIsLoading(true);

		try {
			// Get profiles with user data and ratings
			const { data: profiles, error: profilesError } = await supabase
				.schema("public")
				.from("users")
				.select("*");

			if (profilesError) throw profilesError;

			// Get users data for roles
			const { data: users, error: usersError } = await supabase
				.schema("game")
				.from("users")
				.select("id, role");

			if (usersError) throw usersError;

			// Get ratings data
			const { data: ratings, error: ratingsError } = await supabase
				.schema("game")
				.from("ratings")
				.select("user_email, points, last_game");

			if (ratingsError) throw ratingsError;

			// Get game history for statistics
			const { data: gameHistory, error: historyError } = await supabase
				.schema("game")
				.from("history_games")
				.select("email, points, created_at")
				.order("created_at", { ascending: false });

			if (historyError) throw historyError;

			// Combine all data
			const playersData: Player[] = profiles.map((profile) => {
				const userRole =
					users.find((u) => u.id === profile.user_id)?.role || "USER";
				const rating = ratings.find(
					(r) => r.user_email === profile.email
				);
				const playerGames =
					gameHistory?.filter((g) => g.email === profile.email) || [];

				// Calculate stats
				const totalGames = playerGames.length;
				const bestScore =
					playerGames.length > 0
						? Math.max(...playerGames.map((g) => g.points || 0))
						: 0;

				// Calculate current week points (last 7 days)
				const oneWeekAgo = new Date();
				oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
				const recentGames = playerGames.filter(
					(g) => new Date(g.created_at as string) >= oneWeekAgo
				);
				const currentWeekPoints =
					recentGames.length > 0
						? Math.max(...recentGames.map((g) => g.points || 0))
						: 0;

				return {
					id: profile.id,
					name:
						`${profile.first_name || ""} ${
							profile.last_name || ""
						}`.trim() || "Неизвестно",
					email: profile.email || profile.email || "",
					nickname: profile.nick_name_game || "",
					city: profile.city || "",
					station: profile.organization || "",
					station_name: profile.organization || "",
					registrationDate: profile.created_at as string,
					lastGame: rating?.last_game || null,
					totalGames,
					bestScore,
					currentWeekPoints,
					role: userRole as "USER" | "ADMIN",
					status: "ACTIVE" as const, // For now, all users are active
				};
			});

			setPlayers(playersData.sort((a, b) => b.bestScore - a.bestScore));
		} catch (error) {
			console.error("Error loading players:", error);
			toast.error("Ошибка", {
				description: "Не удалось загрузить игроков",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const filteredPlayers = players.filter((player) => {
		const matchesSearch =
			player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			player.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
			player.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
			player.station_name
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
		const matchesRole =
			selectedRole === "all" || player.role === selectedRole;
		const matchesStatus =
			selectedStatus === "all" || player.status === selectedStatus;

		return matchesSearch && matchesRole && matchesStatus;
	});

	// Pagination calculations
	const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedPlayers = filteredPlayers.slice(startIndex, endIndex);

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedRole, selectedStatus]);

	const handleToggleStatus = (playerId: string) => {
		setPlayers((prev) =>
			prev.map((player) =>
				player.id === playerId
					? {
							...player,
							status:
								player.status === "ACTIVE"
									? "BANNED"
									: "ACTIVE",
					  }
					: player
			)
		);
	};

	const handleExportData = (format: "csv" | "excel" = "csv") => {
		const exportData = filteredPlayers.map((player, index) => ({
			Место: index + 1,
			Имя: player.name,
			Никнейм: player.nickname,
			Email: player.email,
			Город: player.city,
			Станция: player.station_name,
			Роль: player.role === "ADMIN" ? "Администратор" : "Игрок",
			Статус: player.status === "ACTIVE" ? "Активен" : "Заблокирован",
			"Дата регистрации": player.registrationDate,
			"Последняя игра": player.lastGame || "Нет данных",
			"Всего игр": player.totalGames,
			"Лучший результат": player.bestScore,
			"Очки за неделю": player.currentWeekPoints,
		}));

		if (format === "excel") {
			const wb = XLSX.utils.book_new();
			const ws = XLSX.utils.json_to_sheet(exportData);
			XLSX.utils.book_append_sheet(wb, ws, "Игроки");
			XLSX.writeFile(
				wb,
				`players_${new Date().toISOString().split("T")[0]}.xlsx`
			);
		} else {
			const csvContent = [
				Object.keys(exportData[0]).join(","),
				...exportData.map((row) =>
					Object.values(row)
						.map((val) => `"${val}"`)
						.join(",")
				),
			].join("\n");

			const blob = new Blob([csvContent], {
				type: "text/csv;charset=utf-8;",
			});
			const link = document.createElement("a");
			const url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute(
				"download",
				`players_${new Date().toISOString().split("T")[0]}.csv`
			);
			link.style.visibility = "hidden";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}

		toast("Экспорт завершен", {
			description: `Файл с данными игроков успешно скачан в формате ${format.toUpperCase()}`,
		});
	};

	const getStatusBadge = (status: string) => {
		if (status === "ACTIVE") {
			return (
				<Badge className='bg-game-success text-white'>Активен</Badge>
			);
		}
		return <Badge variant='destructive'>Заблокирован</Badge>;
	};

	const getRoleBadge = (role: string) => {
		if (role === "ADMIN") {
			return <Badge className='bg-game-primary text-white'>Админ</Badge>;
		}
		return (
			<Badge variant='outline' className='border-border text-white'>
				Игрок
			</Badge>
		);
	};

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0'>
				<div>
					<h2 className='text-2xl font-bold text-white'>
						Управление игроками
					</h2>
					<p className='text-muted-foreground'>
						Всего игроков: {players.length}
					</p>
				</div>

				<div className='flex space-x-2'>
					<Button
						onClick={() => handleExportData("excel")}
						className='game-button-secondary text-white'
					>
						<FileSpreadsheet className='mr-2 h-4 w-4' />
						Excel
					</Button>
					<Button
						onClick={() => handleExportData("csv")}
						variant='outline'
						className='border-border text-white'
					>
						<Download className='mr-2 h-4 w-4' />
						CSV
					</Button>
				</div>
			</div>

			{/* Stats Cards */}
			<div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
				<Card className='game-card p-4'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold text-white'>
							{
								players.filter((p) => p.status === "ACTIVE")
									.length
							}
						</h3>
						<p className='text-muted-foreground'>
							Активных игроков
						</p>
					</div>
				</Card>

				<Card className='game-card p-4'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold text-white'>
							{players.filter((p) => p.lastGame).length}
						</h3>
						<p className='text-muted-foreground'>Играли недавно</p>
					</div>
				</Card>

				<Card className='game-card p-4'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold text-white'>
							{players.filter((p) => p.role === "ADMIN").length}
						</h3>
						<p className='text-muted-foreground'>Администраторов</p>
					</div>
				</Card>

				<Card className='game-card p-4'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold text-white'>
							{isNaN(
								Math.round(
									players.reduce(
										(sum, p) => sum + p.totalGames,
										0
									) / players.length
								)
							)
								? 0
								: Math.round(
										players.reduce(
											(sum, p) => sum + p.totalGames,
											0
										) / players.length
								  )}
						</h3>
						<p className='text-muted-foreground'>Игр на игрока</p>
					</div>
				</Card>
			</div>

			{/* Filters */}
			<Card className='game-card p-4'>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
					<div className='space-y-2'>
						<Label>Поиск</Label>
						<div className='relative'>
							<Search className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
							<Input
								placeholder='Имя, email, никнейм...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='pl-10'
							/>
						</div>
					</div>

					<div className='space-y-2'>
						<Label>Роль</Label>
						<Select
							value={selectedRole}
							onValueChange={setSelectedRole}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Все роли</SelectItem>
								<SelectItem value='USER'>Игрок</SelectItem>
								<SelectItem value='ADMIN'>
									Администратор
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<Label>Статус</Label>
						<Select
							value={selectedStatus}
							onValueChange={setSelectedStatus}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Все статусы</SelectItem>
								<SelectItem value='ACTIVE'>Активные</SelectItem>
								<SelectItem value='BANNED'>
									Заблокированные
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<Label>Действия</Label>
						<Button
							variant='outline'
							onClick={() => {
								setSearchTerm("");
								setSelectedRole("all");
								setSelectedStatus("all");
							}}
							className='w-full'
						>
							<Filter className='mr-2 h-4 w-4' />
							Сбросить фильтры
						</Button>
					</div>
				</div>
			</Card>

			{/* Players Table */}
			<Card className='game-card'>
				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							<TableRow className='border-border'>
								<TableHead className='text-white'>
									Игрок
								</TableHead>
								<TableHead className='text-white'>
									Контакты
								</TableHead>
								<TableHead className='text-white'>
									Локация
								</TableHead>
								<TableHead className='text-white'>
									Статистика
								</TableHead>
								<TableHead className='text-white'>
									Роль
								</TableHead>
								<TableHead className='text-white'>
									Статус
								</TableHead>
								<TableHead className='w-32 text-white'>
									Действия
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell
										colSpan={7}
										className='py-8 text-center'
									>
										Загрузка игроков...
									</TableCell>
								</TableRow>
							) : paginatedPlayers.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={7}
										className='text-muted-foreground py-8 text-center'
									>
										Игроки не найдены
									</TableCell>
								</TableRow>
							) : (
								paginatedPlayers.map((player) => (
									<TableRow
										key={player.id}
										className='border-border'
									>
										<TableCell>
											<div>
												<p className='font-medium text-white'>
													{player.name}
												</p>
												<p className='text-game-secondary text-sm'>
													@{player.nickname}
												</p>
											</div>
										</TableCell>
										<TableCell>
											<div>
												<p className='text-sm text-white'>
													{player.email}
												</p>
												<p className='text-muted-foreground text-xs'>
													Рег:{" "}
													{new Date(
														player.registrationDate
													).toLocaleDateString()}
												</p>
											</div>
										</TableCell>
										<TableCell>
											<div>
												<p className='text-sm text-white'>
													{player.city}
												</p>
												<p className='text-muted-foreground text-xs'>
													{player.station_name}
												</p>
											</div>
										</TableCell>
										<TableCell>
											<div>
												<div className='mb-1 flex items-center space-x-1'>
													<Trophy className='h-3 w-3 text-yellow-400' />
													<span className='text-sm text-white'>
														{player.bestScore.toLocaleString()}
													</span>
												</div>
												<div className='mb-1 flex items-center space-x-1'>
													<Calendar className='h-3 w-3 text-blue-400' />
													<span className='text-muted-foreground text-xs'>
														{player.totalGames} игр
													</span>
												</div>
												{player.lastGame && (
													<p className='text-muted-foreground text-xs'>
														Последняя:{" "}
														{new Date(
															player.lastGame
														).toLocaleString()}
													</p>
												)}
											</div>
										</TableCell>
										<TableCell>
											{getRoleBadge(player.role)}
										</TableCell>
										<TableCell>
											{getStatusBadge(player.status)}
										</TableCell>
										<TableCell>
											<div className='flex space-x-2'>
												<Button
													size='sm'
													variant='outline'
													onClick={() => {
														setSelectedPlayer(
															player
														);
														setShowPlayerDetails(
															true
														);
													}}
												>
													<Eye className='h-3 w-3' />
												</Button>
												<Button
													size='sm'
													variant='outline'
													onClick={() =>
														handleToggleStatus(
															player.id
														)
													}
													className={
														player.status ===
														"ACTIVE"
															? "border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
															: "border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
													}
												>
													{player.status ===
													"ACTIVE" ? (
														<Ban className='h-3 w-3' />
													) : (
														<CheckCircle className='h-3 w-3' />
													)}
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</Card>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className='flex justify-center'>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href='#'
									onClick={(e) => {
										e.preventDefault();
										if (currentPage > 1)
											setCurrentPage(currentPage - 1);
									}}
									className={
										currentPage <= 1
											? "pointer-events-none opacity-50"
											: ""
									}
								/>
							</PaginationItem>

							{Array.from(
								{ length: Math.min(5, totalPages) },
								(_, i) => {
									let pageNum;
									if (totalPages <= 5) {
										pageNum = i + 1;
									} else if (currentPage <= 3) {
										pageNum = i + 1;
									} else if (currentPage >= totalPages - 2) {
										pageNum = totalPages - 4 + i;
									} else {
										pageNum = currentPage - 2 + i;
									}

									return (
										<PaginationItem key={pageNum}>
											<PaginationLink
												href='#'
												onClick={(e) => {
													e.preventDefault();
													setCurrentPage(pageNum);
												}}
												isActive={
													currentPage === pageNum
												}
											>
												{pageNum}
											</PaginationLink>
										</PaginationItem>
									);
								}
							)}

							<PaginationItem>
								<PaginationNext
									href='#'
									onClick={(e) => {
										e.preventDefault();
										if (currentPage < totalPages)
											setCurrentPage(currentPage + 1);
									}}
									className={
										currentPage >= totalPages
											? "pointer-events-none opacity-50"
											: ""
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}

			<div className='text-muted-foreground text-center text-sm'>
				Показано {startIndex + 1}-
				{Math.min(endIndex, filteredPlayers.length)} из{" "}
				{filteredPlayers.length} игроков
			</div>

			<PlayerDetailsModal
				player={selectedPlayer}
				isOpen={showPlayerDetails}
				onClose={() => {
					setShowPlayerDetails(false);
					setSelectedPlayer(null);
				}}
			/>
		</div>
	);
};
