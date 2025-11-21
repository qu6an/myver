import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
	FileText,
	Calendar,
	Clock,
	CheckCircle,
	Circle,
	AlertTriangle,
} from "lucide-react";

const WhatsNextToDo = () => {
	// Sample tasks data
	const tasks = [
		{
			id: 1,
			title: "Пройти тестирование 3",
			description:
				"Тест 3 доступен до 10 марта, не упустите шанс набрать баллы",
			status: "urgent", // urgent, in-progress, completed, available
			deadline: "Осталось 2 дня",
			points: "+50 баллов",
		},
		{
			id: 2,
			title: "Пройти аттестацию FEBEST",
			description:
				"Повысьте квалификацию и получите сертификат от производителя",
			status: "in-progress", // urgent, in-progress, completed, available
			deadline: "Рекомендуется до 15 марта",
			points: "+30 баллов",
		},
		{
			id: 3,
			title: "Участие в воркшопе BOSCH",
			description:
				"Диагностика электронных систем современных автомобилей",
			status: "available", // urgent, in-progress, completed, available
			deadline: "Среда, 20 марта 2025",
			points: "+25 баллов",
		},
		{
			id: 4,
			title: "Обновить профиль",
			description: "Добавьте информацию о себе и вашем опыте работы",
			status: "available", // urgent, in-progress, completed, available
			deadline: "Не срочно",
			points: "+10 баллов",
		},
	];

	const getStatusConfig = (status: string) => {
		switch (status) {
			case "urgent":
				return {
					bg: "bg-red-50",
					border: "border-red-200",
					text: "text-red-700",
					badgeVariant: "destructive" as const,
					icon: AlertTriangle,
				};
			case "in-progress":
				return {
					bg: "bg-blue-50",
					border: "border-blue-200",
					text: "text-blue-700",
					badgeVariant: "default" as const,
					icon: Clock,
				};
			case "completed":
				return {
					bg: "bg-green-50",
					border: "border-green-200",
					text: "text-green-700",
					badgeVariant: "secondary" as const,
					icon: CheckCircle,
				};
			default: // available
				return {
					bg: "bg-violet-50",
					border: "border-violet-200",
					text: "text-violet-700",
					badgeVariant: "default" as const,
					icon: Circle,
				};
		}
	};

	return (
		<Card className='border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50'>
			<CardHeader className='pb-4'>
				<div className='flex items-center gap-3'>
					<div className='p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg'>
						<FileText className='h-6 w-6 text-white' />
					</div>
					<div>
						<CardTitle className='text-xl font-bold text-gray-800'>
							Что нужно сделать сейчас
						</CardTitle>
						<p className='text-sm text-gray-600 mt-1'>
							Задания, которые повысят ваш рейтинг
						</p>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{tasks.map((task) => {
						const statusConfig = getStatusConfig(task.status);
						const IconComponent = statusConfig.icon;

						return (
							<div
								key={task.id}
								className={`p-4 rounded-xl border transition-all hover:shadow-md ${statusConfig.bg} ${statusConfig.border}`}
							>
								<div className='flex items-start justify-between'>
									<div className='flex items-start gap-3 flex-1'>
										<div
											className={`p-1.5 rounded-full ${statusConfig.bg} border ${statusConfig.border}`}
										>
											<IconComponent
												className={`h-4 w-4 ${statusConfig.text}`}
											/>
										</div>
										<div className='flex-1'>
											<h4
												className={`font-semibold ${statusConfig.text}`}
											>
												{task.title}
											</h4>
											<p className='text-sm text-gray-600 mt-1'>
												{task.description}
											</p>
											<div className='flex items-center gap-3 mt-2 text-xs'>
												<span
													className={`flex items-center gap-1 ${statusConfig.text}`}
												>
													<Clock className='h-3 w-3' />
													{task.deadline}
												</span>
												<Badge
													variant={
														statusConfig.badgeVariant
													}
													className='text-xs'
												>
													{task.points}
												</Badge>
											</div>
										</div>
									</div>
									<Button
										size='sm'
										variant={
											task.status === "urgent"
												? "destructive"
												: "default"
										}
										className='ml-2'
									>
										{task.status === "completed"
											? "Завершено"
											: "Начать"}
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};

export default WhatsNextToDo;
