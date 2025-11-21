import { useState } from "react";
import * as XLSX from "xlsx";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Upload,
	FileSpreadsheet,
	Download,
	CheckCircle,
	XCircle,
	AlertTriangle,
	Info,
} from "lucide-react";
import { toast } from "sonner";
import { validateExcelData } from "./excel-upload/validation";
import { processQuestionsUpload } from "./excel-upload/process";

interface UploadResult {
	total: number;
	successful: number;
	failed: number;
	errors: string[];
	preview: any[];
}

export const ExcelUploader = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const allowedTypes = [
				"application/vnd.ms-excel",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			];
			if (
				!allowedTypes.includes(file.type) &&
				!file.name.endsWith(".xlsx") &&
				!file.name.endsWith(".xls")
			) {
				toast.error("Неверный формат файла", {
					description:
						"Пожалуйста, выберите Excel файл (.xlsx или .xls)",
				});
				return;
			}
			if (file.size > 10 * 1024 * 1024) {
				toast.error("Файл слишком большой", {
					description: "Максимальный размер файла: 10MB",
				});
				return;
			}
			setSelectedFile(file);
			setUploadResult(null);
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) return;

		setIsUploading(true);
		setUploadProgress(0);

		try {
			const data = await selectedFile.arrayBuffer();
			const workbook = XLSX.read(data, { type: "array" });
			const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
			const jsonData = XLSX.utils.sheet_to_json(firstSheet);
			console.log(jsonData);

			if (jsonData.length === 0) {
				toast.error("Ошибка загрузки", {
					description: "Файл пуст или не содержит данных",
				});
				setIsUploading(false);
				return;
			}

			setUploadProgress(20);
			const validationResults = validateExcelData(jsonData as any[]);
			setUploadProgress(50);

			const uploadResultData = await processQuestionsUpload(
				validationResults.validData
			);

			setUploadProgress(90);

			setUploadResult({
				total: validationResults.total,
				successful: uploadResultData.successful,
				failed: validationResults.invalidData.length,
				errors: [
					...validationResults.errors,
					...uploadResultData.errors,
				],
				preview: uploadResultData.preview,
			});

			toast("Загрузка завершена", {
				description: `Успешно загружено ${uploadResultData.successful} из ${validationResults.total} вопросов`,
			});

			setUploadProgress(100);
		} catch (error: any) {
			console.error("Error uploading questions:", error);
			toast.error("Ошибка загрузки", {
				description:
					error.message || "Произошла ошибка при обработке файла",
			});
		} finally {
			setIsUploading(false);
		}
	};

	const handleDownloadTemplate = () => {
		const headers = [
			"ID",
			"Вопрос",
			"Ответ 1",
			"Ответ 2",
			"Ответ 3",
			"Ответ 4",
			"Правильный ответ",
			"Бренд",
			"Категория",
			"Сложность",
		];
		const data = [headers];
		const worksheet = XLSX.utils.aoa_to_sheet(data);
		worksheet["!cols"] = [
			{ wch: 38 },
			{ wch: 50 },
			{ wch: 20 },
			{ wch: 20 },
			{ wch: 20 },
			{ wch: 20 },
			{ wch: 20 },
			{ wch: 15 },
			{ wch: 15 },
			{ wch: 15 },
			{ wch: 15 },
		];
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Шаблон вопросов");
		XLSX.writeFile(workbook, "questions_template.xlsx");
		toast.success("Шаблон успешно загружен", {
			description: "Заполните файл и загрузите его обратно.",
		});
	};

	const resetUpload = () => {
		setSelectedFile(null);
		setUploadResult(null);
		setUploadProgress(0);
		setIsUploading(false);
	};

	return (
		<div className='space-y-6'>
			<div className='space-y-4 text-center'>
				<h2 className='text-2xl font-bold text-white'>
					Загрузка вопросов из Excel
				</h2>
				<p className='text-muted-foreground'>
					Импортируйте вопросы массово из файла Excel
				</p>
			</div>
			<Card className='game-card p-6'>
				<div className='space-y-4'>
					<h3 className='flex items-center text-lg font-semibold text-white'>
						<Info className='text-game-secondary mr-2 h-5 w-5' />
						Инструкции по загрузке
					</h3>
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<div>
							<h4 className='mb-2 font-medium text-white'>
								Требования к файлу:
							</h4>
							<ul className='text-muted-foreground space-y-1 text-sm'>
								<li>• Формат: .xlsx или .xls</li>
								<li>• Максимальный размер: 10 MB</li>
								<li>• Максимум 1000 вопросов за раз</li>
								<li>• Кодировка: UTF-8</li>
							</ul>
						</div>
						<div>
							<h4 className='mb-2 font-medium text-white'>
								Структура столбцов:
							</h4>
							<ul className='text-muted-foreground space-y-1 text-sm'>
								<li>
									A: ID (оставьте пустым для новых вопросов,
									укажите ID для обновления существующих)
								</li>
								<li>B: Вопрос</li>
								<li>C: Ответ 1</li>
								<li>D: Ответ 2</li>
								<li>E: Ответ 3</li>
								<li>F: Ответ 4</li>
								<li>G: Правильный ответ</li>
								<li>H: Бренд</li>
								<li>I: Категория</li>
								<li>
									J: Сложность (EASY, LITE, LITE2, NORMAL,
									HARD, HARD2, TEST (для вопросов тестовой
									игры))
								</li>
							</ul>
						</div>
					</div>
					<div className='flex justify-center'>
						<Button
							onClick={handleDownloadTemplate}
							variant='outline'
							className='border-border hover:bg-muted text-white'
						>
							<Download className='mr-2 h-4 w-4' />
							Скачать шаблон Excel
						</Button>
					</div>
				</div>
			</Card>

			<Card className='game-card p-6'>
				<div className='space-y-4'>
					<h3 className='text-lg font-semibold text-white'>
						Загрузка файла
					</h3>

					{!uploadResult ? (
						<div className='space-y-4'>
							<div className='space-y-2'>
								<Label>Выберите Excel файл</Label>
								<div className='flex items-center space-x-2'>
									<Input
										type='file'
										accept='.xlsx,.xls'
										onChange={handleFileSelect}
										disabled={isUploading}
										className='flex-1'
									/>
									{selectedFile && (
										<Badge
											variant='outline'
											className='border-border text-white'
										>
											{(
												selectedFile.size /
												1024 /
												1024
											).toFixed(2)}{" "}
											MB
										</Badge>
									)}
								</div>
							</div>

							{selectedFile && (
								<div className='bg-muted rounded-lg p-4'>
									<div className='flex items-center space-x-3'>
										<FileSpreadsheet className='text-game-secondary h-8 w-8' />
										<div>
											<p className='font-medium text-white'>
												{selectedFile.name}
											</p>
											<p className='text-muted-foreground text-sm'>
												Размер:{" "}
												{(
													selectedFile.size /
													1024 /
													1024
												).toFixed(2)}{" "}
												MB
											</p>
										</div>
									</div>
								</div>
							)}

							{isUploading && (
								<div className='space-y-2'>
									<div className='flex items-center justify-between'>
										<span className='text-sm text-white'>
											Обработка файла...
										</span>
										<span className='text-muted-foreground text-sm'>
											{uploadProgress}%
										</span>
									</div>
									<Progress value={uploadProgress} />
								</div>
							)}

							<div className='flex justify-center'>
								<Button
									onClick={handleUpload}
									disabled={!selectedFile || isUploading}
									className='game-button-primary text-white'
								>
									<Upload className='mr-2 h-4 w-4' />
									{isUploading
										? "Загрузка..."
										: "Загрузить вопросы"}
								</Button>
							</div>
						</div>
					) : (
						<div className='space-y-4'>
							<h4 className='font-medium text-white'>
								Результат загрузки
							</h4>

							<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
								<div className='bg-game-success/20 border-game-success/30 rounded-lg border p-4'>
									<div className='flex items-center space-x-2'>
										<CheckCircle className='text-game-success h-5 w-5' />
										<div>
											<p className='font-medium text-white'>
												{uploadResult.successful}
											</p>
											<p className='text-muted-foreground text-sm'>
												Успешно
											</p>
										</div>
									</div>
								</div>

								<div className='rounded-lg border border-red-500/30 bg-red-500/20 p-4'>
									<div className='flex items-center space-x-2'>
										<XCircle className='h-5 w-5 text-red-400' />
										<div>
											<p className='font-medium text-white'>
												{uploadResult.failed}
											</p>
											<p className='text-muted-foreground text-sm'>
												Ошибки
											</p>
										</div>
									</div>
								</div>

								<div className='rounded-lg border border-blue-500/30 bg-blue-500/20 p-4'>
									<div className='flex items-center space-x-2'>
										<FileSpreadsheet className='h-5 w-5 text-blue-400' />
										<div>
											<p className='font-medium text-white'>
												{uploadResult.total}
											</p>
											<p className='text-muted-foreground text-sm'>
												Всего
											</p>
										</div>
									</div>
								</div>
							</div>

							{uploadResult.errors.length > 0 && (
								<div className='space-y-2'>
									<h5 className='flex items-center font-medium text-white'>
										<AlertTriangle className='mr-2 h-4 w-4 text-yellow-400' />
										Обнаруженные ошибки
									</h5>
									<div className='max-h-40 space-y-1 overflow-y-auto'>
										{uploadResult.errors.map(
											(error, index) => (
												<div
													key={index}
													className='rounded border border-red-500/20 bg-red-500/10 p-2 text-sm text-red-400'
												>
													{error}
												</div>
											)
										)}
									</div>
								</div>
							)}

							<div className='flex justify-center space-x-2'>
								<Button
									onClick={resetUpload}
									variant='outline'
									className='border-border hover:bg-muted text-white'
								>
									Загрузить новый файл
								</Button>
								{uploadResult.successful > 0 && (
									<Button className='game-button-secondary text-white'>
										<CheckCircle className='mr-2 h-4 w-4' />
										Готово
									</Button>
								)}
							</div>
						</div>
					)}
				</div>
			</Card>
		</div>
	);
};
