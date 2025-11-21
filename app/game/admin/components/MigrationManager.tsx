import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Database,
	Download,
	Upload,
	CheckCircle,
	AlertTriangle,
	Info,
	Play,
	RefreshCcw,
	FileText,
	Settings,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

interface MigrationConfig {
	sourceDb: {
		host: string;
		port: number;
		database: string;
		username: string;
		password: string;
	};
	tables: string[];
	batchSize: number;
}

interface MigrationResult {
	success: boolean;
	totalMigrated?: number;
	errors?: string[];
	log?: string[];
	message?: string;
}

interface ValidationResult {
	success: boolean;
	totalRecords?: number;
	errorCount?: number;
	tables?: Record<string, any>;
	summary?: string;
}

export const MigrationManager = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [migrationProgress, setMigrationProgress] = useState(0);
	const [migrationLogs, setMigrationLogs] = useState<string[]>([]);
	const [validationResults, setValidationResults] =
		useState<ValidationResult | null>(null);
	const [migrationResult, setMigrationResult] =
		useState<MigrationResult | null>(null);

	const supabase = createClient();
	const [config, setConfig] = useState<MigrationConfig>({
		sourceDb: {
			host: "localhost",
			port: 5432,
			database: "auto_quiz",
			username: "",
			password: "",
		},
		tables: [
			"lite_questions",
			"easy_questions",
			"normal_questions",
			"hard_questions",
			"lite_questions2",
			"hard_questions2",
			"profiles",
			"ratings",
			"history_games",
			"telegram_users",
			"info_win_game",
		],
		batchSize: 100,
	});

	const validateConnection = async () => {
		setIsLoading(true);
		setMigrationLogs([]);

		try {
			setMigrationLogs((prev) => [
				...prev,
				"Проверка соединения с исходной базой данных...",
			]);

			const { data, error } = await supabase.functions.invoke(
				"export-postgresql-data",
				{
					body: {
						action: "validate_connection",
						config,
					},
				}
			);

			if (error) throw error;

			if (data.success) {
				setMigrationLogs((prev) => [
					...prev,
					"✅ Соединение установлено успешно",
					`Найдено таблиц: ${data.tables.length}`,
					`Примерное количество записей: ${JSON.stringify(
						data.estimatedRows,
						null,
						2
					)}`,
				]);

				toast("Соединение проверено", {
					description: "Подключение к исходной базе данных успешно",
				});
			} else {
				throw new Error(data.error || "Неизвестная ошибка");
			}
		} catch (error: any) {
			console.error("Connection validation error:", error);
			setMigrationLogs((prev) => [
				...prev,
				`❌ Ошибка подключения: ${error.message}`,
			]);

			toast.error("Ошибка подключения", {
				description: error.message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const startMigration = async () => {
		setIsLoading(true);
		setMigrationProgress(0);
		setMigrationLogs([]);
		setMigrationResult(null);

		try {
			setMigrationLogs((prev) => [
				...prev,
				"Начинается миграция данных...",
			]);

			const { data, error } = await supabase.functions.invoke(
				"export-postgresql-data",
				{
					body: {
						action: "export_data",
						config,
					},
				}
			);

			if (error) throw error;

			setMigrationResult(data);

			if (data.success) {
				setMigrationProgress(100);
				setMigrationLogs((prev) => [
					...prev,
					...data.log,
					`✅ Миграция завершена! Перенесено записей: ${data.totalMigrated}`,
				]);

				if (data.errors && data.errors.length > 0) {
					setMigrationLogs((prev) => [
						...prev,
						"⚠️ Обнаружены ошибки:",
						...data.errors,
					]);
				}

				toast("Миграция завершена", {
					description: `Успешно перенесено ${data.totalMigrated} записей`,
				});
			} else {
				throw new Error(data.error || "Миграция не удалась");
			}
		} catch (error: any) {
			console.error("Migration error:", error);
			setMigrationLogs((prev) => [
				...prev,
				`❌ Ошибка миграции: ${error.message}`,
			]);

			toast.error("Ошибка миграции", {
				description: error.message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const validateMigration = async () => {
		setIsLoading(true);
		setValidationResults(null);

		try {
			setMigrationLogs((prev) => [
				...prev,
				"Начинается валидация миграции...",
			]);

			const { data, error } = await supabase.functions.invoke(
				"export-postgresql-data",
				{
					body: {
						action: "validate_migration",
					},
				}
			);

			if (error) throw error;

			setValidationResults(data);

			if (data.success) {
				setMigrationLogs((prev) => [
					...prev,
					"✅ Валидация завершена успешно",
					`Всего записей: ${data.totalRecords}`,
					`Ошибок: ${data.errorCount}`,
					data.summary,
				]);

				toast("Валидация завершена", {
					description: data.summary,
				});
			} else {
				setMigrationLogs((prev) => [
					...prev,
					"⚠️ Валидация выявила проблемы",
					data.error || "Неизвестная ошибка",
				]);

				toast.error("Проблемы с валидацией", {
					description: data.error,
				});
			}
		} catch (error: any) {
			console.error("Validation error:", error);
			setMigrationLogs((prev) => [
				...prev,
				`❌ Ошибка валидации: ${error.message}`,
			]);

			toast.error("Ошибка валидации", {
				description: error.message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const downloadMigrationGuide = () => {
		const content = `# Руководство по миграции данных
    
## Этапы миграции:

1. **Подготовка**
   - Создайте резервную копию исходной базы данных
   - Проверьте доступность Supabase проекта
   - Убедитесь в наличии прав администратора

2. **Экспорт данных**
   - Выполните скрипты экспорта из PostgreSQL
   - Проверьте созданные CSV файлы
   - Проанализируйте summary отчет

3. **Импорт в Supabase**
   - Используйте данный интерфейс для автоматической миграции
   - Или выполните ручной импорт через Supabase Dashboard
   - Проверьте логи импорта

4. **Валидация**
   - Запустите валидацию данных
   - Исправьте найденные проблемы
   - Проведите функциональное тестирование

5. **Финализация**
   - Настройте мониторинг
   - Переключите продакшн
   - Мониторьте работу системы

## Важные файлы:
- migration/export_scripts.sql - скрипты экспорта
- migration/import_scripts.sql - скрипты импорта
- migration/validation_scripts.sql - скрипты валидации
- migration/MIGRATION_GUIDE.md - подробное руководство
    `;

		const blob = new Blob([content], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "migration_guide.md";
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0'>
				<div>
					<h2 className='text-2xl font-bold text-white'>
						Менеджер миграции данных
					</h2>
					<p className='text-muted-foreground'>
						Перенос данных PostgreSQL → Supabase
					</p>
				</div>

				<Button
					onClick={downloadMigrationGuide}
					className='game-button-secondary text-white'
				>
					<FileText className='mr-2 h-4 w-4' />
					Скачать руководство
				</Button>
			</div>

			{/* Migration Status Alert */}
			{migrationResult && (
				<Alert
					className={
						migrationResult.success
							? "border-green-500"
							: "border-red-500"
					}
				>
					{migrationResult.success ? (
						<CheckCircle className='h-4 w-4 text-green-500' />
					) : (
						<AlertTriangle className='h-4 w-4 text-red-500' />
					)}
					<AlertTitle>
						{migrationResult.success
							? "Миграция завершена"
							: "Ошибка миграции"}
					</AlertTitle>
					<AlertDescription>
						{migrationResult.message}
					</AlertDescription>
				</Alert>
			)}

			{/* Migration Progress */}
			{isLoading && migrationProgress > 0 && (
				<Card className='game-card p-4'>
					<div className='space-y-2'>
						<div className='flex justify-between text-sm'>
							<span className='text-white'>
								Прогресс миграции
							</span>
							<span className='text-game-secondary'>
								{migrationProgress}%
							</span>
						</div>
						<Progress value={migrationProgress} className='h-2' />
					</div>
				</Card>
			)}

			<Tabs defaultValue='config'>
				<TabsList className='bg-card grid w-full grid-cols-4'>
					<TabsTrigger
						value='config'
						className='data-[state=active]:bg-game-primary data-[state=active]:text-white'
					>
						<Settings className='mr-2 h-4 w-4' />
						Настройки
					</TabsTrigger>
					<TabsTrigger
						value='migration'
						className='data-[state=active]:bg-game-primary data-[state=active]:text-white'
					>
						<Database className='mr-2 h-4 w-4' />
						Миграция
					</TabsTrigger>
					<TabsTrigger
						value='validation'
						className='data-[state=active]:bg-game-primary data-[state=active]:text-white'
					>
						<CheckCircle className='mr-2 h-4 w-4' />
						Валидация
					</TabsTrigger>
					<TabsTrigger
						value='logs'
						className='data-[state=active]:bg-game-primary data-[state=active]:text-white'
					>
						<FileText className='mr-2 h-4 w-4' />
						Логи
					</TabsTrigger>
				</TabsList>

				{/* Configuration Tab */}
				<TabsContent value='config' className='mt-6'>
					<Card className='game-card p-6'>
						<h3 className='mb-4 text-lg font-semibold text-white'>
							Настройки подключения к PostgreSQL
						</h3>

						<div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div className='space-y-2'>
								<Label>Хост</Label>
								<Input
									value={config.sourceDb.host}
									onChange={(e) =>
										setConfig({
											...config,
											sourceDb: {
												...config.sourceDb,
												host: e.target.value,
											},
										})
									}
									placeholder='localhost'
								/>
							</div>

							<div className='space-y-2'>
								<Label>Порт</Label>
								<Input
									type='number'
									value={config.sourceDb.port}
									onChange={(e) =>
										setConfig({
											...config,
											sourceDb: {
												...config.sourceDb,
												port:
													parseInt(e.target.value) ||
													5432,
											},
										})
									}
									placeholder='5432'
								/>
							</div>

							<div className='space-y-2'>
								<Label>База данных</Label>
								<Input
									value={config.sourceDb.database}
									onChange={(e) =>
										setConfig({
											...config,
											sourceDb: {
												...config.sourceDb,
												database: e.target.value,
											},
										})
									}
									placeholder='auto_quiz'
								/>
							</div>

							<div className='space-y-2'>
								<Label>Размер батча</Label>
								<Input
									type='number'
									value={config.batchSize}
									onChange={(e) =>
										setConfig({
											...config,
											batchSize:
												parseInt(e.target.value) || 100,
										})
									}
									placeholder='100'
								/>
							</div>

							<div className='space-y-2'>
								<Label>Пользователь</Label>
								<Input
									value={config.sourceDb.username}
									onChange={(e) =>
										setConfig({
											...config,
											sourceDb: {
												...config.sourceDb,
												username: e.target.value,
											},
										})
									}
									placeholder='username'
								/>
							</div>

							<div className='space-y-2'>
								<Label>Пароль</Label>
								<Input
									type='password'
									value={config.sourceDb.password}
									onChange={(e) =>
										setConfig({
											...config,
											sourceDb: {
												...config.sourceDb,
												password: e.target.value,
											},
										})
									}
									placeholder='password'
								/>
							</div>
						</div>

						<div className='mb-6 space-y-2'>
							<Label>Таблицы для миграции</Label>
							<Textarea
								value={config.tables.join("\n")}
								onChange={(e) =>
									setConfig({
										...config,
										tables: e.target.value
											.split("\n")
											.filter((t) => t.trim()),
									})
								}
								placeholder='Список таблиц (по одной на строку)'
								rows={8}
							/>
						</div>

						<Button
							onClick={validateConnection}
							disabled={isLoading}
							className='game-button-primary text-white'
						>
							{isLoading ? (
								<RefreshCcw className='mr-2 h-4 w-4 animate-spin' />
							) : (
								<Database className='mr-2 h-4 w-4' />
							)}
							Проверить соединение
						</Button>
					</Card>
				</TabsContent>

				{/* Migration Tab */}
				<TabsContent value='migration' className='mt-6'>
					<div className='space-y-6'>
						<Alert>
							<Info className='h-4 w-4' />
							<AlertTitle>Перед началом миграции</AlertTitle>
							<AlertDescription>
								Убедитесь, что вы создали резервную копию данных
								и проверили подключение к исходной базе данных.
							</AlertDescription>
						</Alert>

						<Card className='game-card p-6'>
							<h3 className='mb-4 text-lg font-semibold text-white'>
								Управление миграцией
							</h3>

							<div className='flex space-x-4'>
								<Button
									onClick={startMigration}
									disabled={isLoading}
									className='game-button-primary text-white'
								>
									{isLoading ? (
										<RefreshCcw className='mr-2 h-4 w-4 animate-spin' />
									) : (
										<Play className='mr-2 h-4 w-4' />
									)}
									Начать миграцию
								</Button>

								<Button
									onClick={validateMigration}
									disabled={isLoading}
									className='game-button-secondary text-white'
								>
									{isLoading ? (
										<RefreshCcw className='mr-2 h-4 w-4 animate-spin' />
									) : (
										<CheckCircle className='mr-2 h-4 w-4' />
									)}
									Валидировать данные
								</Button>
							</div>

							{migrationResult && (
								<div className='mt-6'>
									<h4 className='text-md mb-2 font-medium text-white'>
										Результат миграции
									</h4>
									<div className='space-y-2'>
										<div className='flex justify-between'>
											<span className='text-muted-foreground'>
												Статус:
											</span>
											<Badge
												className={
													migrationResult.success
														? "bg-green-500"
														: "bg-red-500"
												}
											>
												{migrationResult.success
													? "Успешно"
													: "Ошибка"}
											</Badge>
										</div>
										{migrationResult.totalMigrated && (
											<div className='flex justify-between'>
												<span className='text-muted-foreground'>
													Перенесено записей:
												</span>
												<span className='text-white'>
													{
														migrationResult.totalMigrated
													}
												</span>
											</div>
										)}
										{migrationResult.errors &&
											migrationResult.errors.length >
												0 && (
												<div className='flex justify-between'>
													<span className='text-muted-foreground'>
														Ошибок:
													</span>
													<span className='text-red-400'>
														{
															migrationResult
																.errors.length
														}
													</span>
												</div>
											)}
									</div>
								</div>
							)}
						</Card>
					</div>
				</TabsContent>

				{/* Validation Tab */}
				<TabsContent value='validation' className='mt-6'>
					<Card className='game-card p-6'>
						<h3 className='mb-4 text-lg font-semibold text-white'>
							Результаты валидации
						</h3>

						{validationResults ? (
							<div className='space-y-4'>
								<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
									<div className='text-center'>
										<div className='text-2xl font-bold text-white'>
											{validationResults.totalRecords ||
												0}
										</div>
										<div className='text-muted-foreground'>
											Всего записей
										</div>
									</div>

									<div className='text-center'>
										<div className='text-2xl font-bold text-white'>
											{validationResults.errorCount || 0}
										</div>
										<div className='text-muted-foreground'>
											Ошибок
										</div>
									</div>

									<div className='text-center'>
										<div
											className={`text-2xl font-bold ${
												validationResults.success
													? "text-green-400"
													: "text-red-400"
											}`}
										>
											{validationResults.success
												? "✅"
												: "❌"}
										</div>
										<div className='text-muted-foreground'>
											Статус
										</div>
									</div>
								</div>

								{validationResults.tables && (
									<div className='mt-6'>
										<h4 className='text-md mb-2 font-medium text-white'>
											Детали по таблицам
										</h4>
										<div className='space-y-2'>
											{Object.entries(
												validationResults.tables
											).map(
												([tableName, details]: [
													string,
													any
												]) => (
													<div
														key={tableName}
														className='flex items-center justify-between'
													>
														<span className='text-muted-foreground'>
															{tableName}
														</span>
														<div className='flex items-center space-x-2'>
															<span className='text-white'>
																{details.count}{" "}
																записей
															</span>
															<Badge
																className={
																	details.status ===
																	"success"
																		? "bg-green-500"
																		: "bg-red-500"
																}
															>
																{details.status ===
																"success"
																	? "OK"
																	: "Ошибка"}
															</Badge>
														</div>
													</div>
												)
											)}
										</div>
									</div>
								)}
							</div>
						) : (
							<div className='text-muted-foreground py-8 text-center'>
								Запустите валидацию для просмотра результатов
							</div>
						)}
					</Card>
				</TabsContent>

				{/* Logs Tab */}
				<TabsContent value='logs' className='mt-6'>
					<Card className='game-card p-6'>
						<h3 className='mb-4 text-lg font-semibold text-white'>
							Логи миграции
						</h3>

						<div className='h-96 overflow-y-auto rounded-lg bg-black/20 p-4'>
							{migrationLogs.length > 0 ? (
								<div className='space-y-1 font-mono text-sm'>
									{migrationLogs.map((log, index) => (
										<div key={index} className='text-white'>
											<span className='text-muted-foreground'>
												[
												{new Date().toLocaleTimeString()}
												]
											</span>{" "}
											{log}
										</div>
									))}
								</div>
							) : (
								<div className='text-muted-foreground py-8 text-center'>
									Логи появятся здесь после начала операций
								</div>
							)}
						</div>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};
