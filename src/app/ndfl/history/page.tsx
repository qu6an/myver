"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertCircle,
	CheckCircle,
	Clock,
	Download,
	Edit,
	Eye,
	FileText,
	Search,
	XCircle,
} from "lucide-react";
import Link from "next/link";

export default function NdflHistoryPage() {
	// Mock data - в реальном приложении будет получаться из API
	const declarations = [
		{
			id: 1,
			year: 2024,
			status: "draft",
			statusText: "Черновик",
			createdAt: "2024-01-15",
			updatedAt: "2024-01-20",
			submittedAt: null,
			totalIncome: 850000,
			taxAmount: 110500,
			refundAmount: 0,
			documentsCount: 3,
		},
		{
			id: 2,
			year: 2023,
			status: "approved",
			statusText: "Принято",
			createdAt: "2023-03-10",
			updatedAt: "2023-04-15",
			submittedAt: "2023-03-15",
			totalIncome: 720000,
			taxAmount: 93600,
			refundAmount: 15000,
			documentsCount: 5,
		},
		{
			id: 3,
			year: 2022,
			status: "pending",
			statusText: "На проверке",
			createdAt: "2022-03-20",
			updatedAt: "2022-03-25",
			submittedAt: "2022-03-25",
			totalIncome: 680000,
			taxAmount: 88400,
			refundAmount: 0,
			documentsCount: 4,
		},
		{
			id: 4,
			year: 2021,
			status: "rejected",
			statusText: "Отклонено",
			createdAt: "2021-03-18",
			updatedAt: "2021-04-20",
			submittedAt: "2021-03-20",
			totalIncome: 650000,
			taxAmount: 84500,
			refundAmount: 0,
			documentsCount: 2,
		},
		{
			id: 5,
			year: 2020,
			status: "approved",
			statusText: "Принято",
			createdAt: "2020-03-12",
			updatedAt: "2020-05-10",
			submittedAt: "2020-03-15",
			totalIncome: 600000,
			taxAmount: 78000,
			refundAmount: 8000,
			documentsCount: 6,
		},
	];

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "draft":
				return <Edit className='h-4 w-4 text-yellow-500' />;
			case "pending":
				return <Clock className='h-4 w-4 text-blue-500' />;
			case "approved":
				return <CheckCircle className='h-4 w-4 text-green-500' />;
			case "rejected":
				return <XCircle className='h-4 w-4 text-red-500' />;
			default:
				return <FileText className='h-4 w-4 text-gray-500' />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "draft":
				return "bg-yellow-100 text-yellow-800";
			case "pending":
				return "bg-blue-100 text-blue-800";
			case "approved":
				return "bg-green-100 text-green-800";
			case "rejected":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const totalRefunds = declarations
		.filter((d) => d.status === "approved")
		.reduce((sum, d) => sum + d.refundAmount, 0);

	const totalTaxPaid = declarations
		.filter((d) => d.status === "approved")
		.reduce((sum, d) => sum + d.taxAmount, 0);

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex justify-between items-start'>
				<div>
					<h1 className='text-3xl font-bold text-gray-900'>
						История деклараций
					</h1>
					<p className='text-gray-600 mt-2'>
						Все ваши налоговые декларации за предыдущие периоды
					</p>
				</div>
			</div>

			{/* Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Всего деклараций
						</CardTitle>
						<FileText className='h-4 w-4 text-gray-500' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{declarations.length}
						</div>
						<p className='text-xs text-muted-foreground'>
							За все время
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Принято
						</CardTitle>
						<CheckCircle className='h-4 w-4 text-green-500' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{
								declarations.filter(
									(d) => d.status === "approved"
								).length
							}
						</div>
						<p className='text-xs text-muted-foreground'>
							Успешно обработано
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Возвращено налога
						</CardTitle>
						<Download className='h-4 w-4 text-green-500' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{totalRefunds.toLocaleString("ru-RU")} ₽
						</div>
						<p className='text-xs text-muted-foreground'>
							Общая сумма возвратов
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Уплачено налога
						</CardTitle>
						<AlertCircle className='h-4 w-4 text-blue-500' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{totalTaxPaid.toLocaleString("ru-RU")} ₽
						</div>
						<p className='text-xs text-muted-foreground'>
							За все периоды
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<Card>
				<CardHeader>
					<CardTitle>Фильтры</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col sm:flex-row gap-4'>
						<div className='flex-1'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
								<Input
									placeholder='Поиск по году или статусу...'
									className='pl-10'
								/>
							</div>
						</div>
						<Select defaultValue='all'>
							<SelectTrigger className='w-full sm:w-48'>
								<SelectValue placeholder='Статус' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Все статусы</SelectItem>
								<SelectItem value='draft'>Черновик</SelectItem>
								<SelectItem value='pending'>
									На проверке
								</SelectItem>
								<SelectItem value='approved'>
									Принято
								</SelectItem>
								<SelectItem value='rejected'>
									Отклонено
								</SelectItem>
							</SelectContent>
						</Select>
						<Select defaultValue='all'>
							<SelectTrigger className='w-full sm:w-48'>
								<SelectValue placeholder='Год' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Все годы</SelectItem>
								<SelectItem value='2024'>2024</SelectItem>
								<SelectItem value='2023'>2023</SelectItem>
								<SelectItem value='2022'>2022</SelectItem>
								<SelectItem value='2021'>2021</SelectItem>
								<SelectItem value='2020'>2020</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Declarations Table */}
			<Card>
				<CardHeader>
					<CardTitle>Список деклараций</CardTitle>
					<CardDescription>
						Подробная информация о всех поданных декларациях
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Год</TableHead>
									<TableHead>Статус</TableHead>
									<TableHead>Доход</TableHead>
									<TableHead>Налог</TableHead>
									<TableHead>К возврату</TableHead>
									<TableHead>Документы</TableHead>
									<TableHead>Дата подачи</TableHead>
									<TableHead>Действия</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{declarations.map((declaration) => (
									<TableRow key={declaration.id}>
										<TableCell className='font-medium'>
											{declaration.year}
										</TableCell>
										<TableCell>
											<div className='flex items-center space-x-2'>
												{getStatusIcon(
													declaration.status
												)}
												<Badge
													className={getStatusColor(
														declaration.status
													)}
												>
													{declaration.statusText}
												</Badge>
											</div>
										</TableCell>
										<TableCell>
											{declaration.totalIncome.toLocaleString(
												"ru-RU"
											)}{" "}
											₽
										</TableCell>
										<TableCell>
											{declaration.taxAmount.toLocaleString(
												"ru-RU"
											)}{" "}
											₽
										</TableCell>
										<TableCell>
											{declaration.refundAmount > 0 ? (
												<span className='text-green-600 font-medium'>
													{declaration.refundAmount.toLocaleString(
														"ru-RU"
													)}{" "}
													₽
												</span>
											) : (
												<span className='text-gray-400'>
													—
												</span>
											)}
										</TableCell>
										<TableCell>
											<Badge variant='outline'>
												{declaration.documentsCount}
											</Badge>
										</TableCell>
										<TableCell>
											{declaration.submittedAt ? (
												new Date(
													declaration.submittedAt
												).toLocaleDateString("ru-RU", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})
											) : (
												<span className='text-gray-400'>
													Не подана
												</span>
											)}
										</TableCell>
										<TableCell>
											<div className='flex items-center space-x-2'>
												<Button
													variant='ghost'
													size='sm'
													asChild
												>
													<Link
														href={`/ndfl/${declaration.id}`}
													>
														<Eye className='h-4 w-4' />
													</Link>
												</Button>
												{declaration.status ===
													"draft" && (
													<Button
														variant='ghost'
														size='sm'
														asChild
													>
														<Link
															href={`/ndfl/create?id=${declaration.id}`}
														>
															<Edit className='h-4 w-4' />
														</Link>
													</Button>
												)}
												{declaration.status ===
													"approved" && (
													<Button
														variant='ghost'
														size='sm'
													>
														<Download className='h-4 w-4' />
													</Button>
												)}
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
