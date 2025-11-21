import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "../../../components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Plus,
	Edit,
	Trash2,
	Search,
	Filter,
	Eye,
	FileImage,
	Upload,
	Download,
} from "lucide-react";

import { BrandLogoUploader } from "./BrandLogoUploader";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import {
	downloadQuestionsToExcel,
	loadAllQuestions,
} from "./excel-upload/download";

interface Question {
	id: string;
	question: string;
	answer_1: string;
	answer_2: string;
	answer_3: string;
	answer_4: string;
	correct_answer: string;
	brand: string;
	category: string;
	type: "EASY" | "LITE" | "LITE2" | "NORMAL" | "HARD" | "HARD2" | "TEST";
	logo_url?: string;
	created_at: string;
}

const questionTypes = [
	{ value: "EASY", label: "Легкий", color: "bg-green-500" },
	{ value: "LITE", label: "Простой", color: "bg-blue-500" },
	{ value: "LITE2", label: "Простой 2", color: "bg-cyan-500" },
	{ value: "NORMAL", label: "Средний", color: "bg-yellow-500" },
	{ value: "HARD", label: "Сложный", color: "bg-orange-500" },
	{ value: "HARD2", label: "Сложный 2", color: "bg-red-500" },
	{ value: "TEST", label: "Тестовый", color: "bg-purple-500" },
];

// Separate form component to prevent re-creation and focus loss
const QuestionForm = ({
	formData,
	setFormData,
	onSubmit,
	onCancel,
	isEditing,
	questionTypes,
}: {
	formData: any;
	setFormData: (data: any) => void;
	onSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
	isEditing: boolean;
	questionTypes: any[];
}) => (
	<form onSubmit={onSubmit} className='space-y-4'>
		<div className='space-y-2'>
			<Label>Вопрос</Label>
			<Textarea
				value={formData.question}
				onChange={(e) =>
					setFormData({ ...formData, question: e.target.value })
				}
				placeholder='Введите текст вопроса...'
				required
				className='min-h-[80px]'
			/>
		</div>

		<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
			<div className='space-y-2'>
				<Label>Ответ A</Label>
				<Input
					value={formData.answer_1}
					onChange={(e) =>
						setFormData({ ...formData, answer_1: e.target.value })
					}
					placeholder='Первый вариант ответа'
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label>Ответ B</Label>
				<Input
					value={formData.answer_2}
					onChange={(e) =>
						setFormData({ ...formData, answer_2: e.target.value })
					}
					placeholder='Второй вариант ответа'
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label>Ответ C</Label>
				<Input
					value={formData.answer_3}
					onChange={(e) =>
						setFormData({ ...formData, answer_3: e.target.value })
					}
					placeholder='Третий вариант ответа'
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label>Ответ D</Label>
				<Input
					value={formData.answer_4}
					onChange={(e) =>
						setFormData({ ...formData, answer_4: e.target.value })
					}
					placeholder='Четвертый вариант ответа'
					required
				/>
			</div>
		</div>

		<div className='space-y-2'>
			<Label>Правильный ответ</Label>
			<Select
				value={formData.correct_answer}
				onValueChange={(value) =>
					setFormData({ ...formData, correct_answer: value })
				}
			>
				<SelectTrigger>
					<SelectValue placeholder='Выберите правильный ответ' />
				</SelectTrigger>
				<SelectContent>
					{formData.answer_1 && (
						<SelectItem value={formData.answer_1}>
							{formData.answer_1}
						</SelectItem>
					)}
					{formData.answer_2 && (
						<SelectItem value={formData.answer_2}>
							{formData.answer_2}
						</SelectItem>
					)}
					{formData.answer_3 && (
						<SelectItem value={formData.answer_3}>
							{formData.answer_3}
						</SelectItem>
					)}
					{formData.answer_4 && (
						<SelectItem value={formData.answer_4}>
							{formData.answer_4}
						</SelectItem>
					)}
				</SelectContent>
			</Select>
		</div>

		<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
			<div className='space-y-2'>
				<Label>Бренд</Label>
				<Input
					value={formData.brand}
					onChange={(e) =>
						setFormData({ ...formData, brand: e.target.value })
					}
					placeholder='Например: BMW, Mercedes'
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label>Категория</Label>
				<Input
					value={formData.category}
					onChange={(e) =>
						setFormData({ ...formData, category: e.target.value })
					}
					placeholder={"Описание категории"}
				/>
			</div>

			<div className='space-y-2'>
				<Label>Сложность</Label>
				<Select
					value={formData.type}
					onValueChange={(value: any) =>
						setFormData({ ...formData, type: value })
					}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{questionTypes.map((type) => (
							<SelectItem key={type.value} value={type.value}>
								{type.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>

		{/* Brand Logo Upload */}
		{formData.brand && (
			<BrandLogoUploader
				brandName={formData.brand}
				currentLogoUrl={formData.logo_url}
				onLogoUploaded={(logoUrl) =>
					setFormData({ ...formData, logo_url: logoUrl })
				}
			/>
		)}

		<div className='flex justify-end space-x-2 pt-4'>
			<Button type='button' variant='outline' onClick={onCancel}>
				Отмена
			</Button>
			<Button type='submit' className='game-button-primary text-white'>
				{isEditing ? "Сохранить" : "Добавить"}
			</Button>
		</div>
	</form>
);

export const QuestionsManager = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [testQuestions, setTestQuestions] = useState<Question[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentTab, setCurrentTab] = useState("main");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedType, setSelectedType] = useState("all");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [editingQuestion, setEditingQuestion] = useState<Question | null>(
		null
	);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 20;
	const [formData, setFormData] = useState({
		question: "",
		answer_1: "",
		answer_2: "",
		answer_3: "",
		answer_4: "",
		correct_answer: "",
		brand: "",
		category: "",
		type: "LITE" as any,
		logo_url: "",
	});
	const supabase = createClient();

	const categories = [
		...new Set(
			(currentTab === "main" ? questions : testQuestions).map(
				(q) => q.category
			)
		),
	].filter(Boolean);

	useEffect(() => {
		if (currentTab === "main") {
			loadQuestions();
		} else {
			loadTestQuestions();
		}
	}, [currentTab]);

	const resetForm = () => {
		setFormData({
			question: "",
			answer_1: "",
			answer_2: "",
			answer_3: "",
			answer_4: "",
			correct_answer: "",
			brand: "",
			category: "",
			type: "LITE",
			logo_url: "",
		});
		setEditingQuestion(null);
	};

	// Function to delete all questions
	const deleteAllQuestions = async () => {
		const isTest = currentTab === "test";
		const confirmationMessage = `Вы уверены, что хотите удалить ВСЕ ${
			isTest ? "тестовые" : "основные"
		} вопросы? Это действие нельзя отменить.`;

		if (!confirm(confirmationMessage)) {
			return;
		}

		try {
			setIsLoading(true);

			const tablesToDelete = isTest
				? ["test_questions"]
				: [
						"lite_questions",
						"easy_questions",
						"normal_questions",
						"hard_questions",
						"lite_questions2",
						"hard_questions2",
				  ];

			const errors: string[] = [];

			for (const table of tablesToDelete) {
				const { error } = await supabase
					.schema("game")
					.from(table as any)
					.delete()
					.not("id", "is", null);

				if (error) {
					errors.push(
						`Ошибка при удалении из таблицы ${table}: ${error.message}`
					);
				}
			}

			if (errors.length > 0) {
				throw new Error(errors.join("; "));
			}

			toast.success(
				`Все ${isTest ? "тестовые" : "основные"} вопросы удалены`,
				{
					description: `Вопросы были успешно удалены.`,
				}
			);

			if (isTest) {
				loadTestQuestions();
			} else {
				loadQuestions();
			}
		} catch (error: any) {
			console.error("Error deleting questions:", error);
			toast.error("Ошибка при удалении вопросов", {
				description: error.message || "Не удалось удалить вопросы",
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Function to download all questions to Excel
	const downloadAllQuestions = async () => {
		try {
			setIsLoading(true);
			const allQuestions = await loadAllQuestions();
			await downloadQuestionsToExcel(allQuestions);
		} catch (error: any) {
			console.error("Error downloading all questions:", error);
			toast.error("Ошибка при экспорте вопросов", {
				description:
					error.message || "Не удалось экспортировать вопросы",
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Function to sync brand logos from the brands table to the questions tables
	const syncBrandLogos = async () => {
		try {
			toast.info("Начинаем синхронизацию логотипов...");

			const { data: brands, error: brandsError } = await supabase
				.schema("game")
				.from("brands")
				.select("name, logo_url")
				.not("logo_url", "is", null);

			if (brandsError) throw brandsError;

			if (!brands || brands.length === 0) {
				toast.info("Нет брендов с логотипами для синхронизации.");
				return;
			}

			const brandLogoMap = new Map<string, string>();
			for (const brand of brands) {
				if (brand.name && brand.logo_url) {
					brandLogoMap.set(brand.name, brand.logo_url);
				}
			}

			const questionTables = [
				"easy_questions",
				"lite_questions",
				"lite_questions2",
				"normal_questions",
				"hard_questions",
				"hard_questions2",
				"test_questions",
			];

			const errors: string[] = [];

			for (const table of questionTables) {
				for (const [brandName, logoUrl] of brandLogoMap) {
					const { error: updateError } = await supabase
						.schema("game")
						.from(table as any)
						.update({ logo_url: logoUrl })
						.eq("brand", brandName);

					if (updateError) {
						errors.push(
							`Ошибка в таблице ${table} для бренда ${brandName}: ${updateError.message}`
						);
					}
				}
			}

			toast.success("Синхронизация логотипов завершена.", {
				description:
					"Логотипы в вопросах были обновлены в соответствии с таблицей брендов.",
			});

			if (errors.length > 0) {
				console.error("Errors during brand logo sync:", errors);
				toast.error("Ошибки во время синхронизации", {
					description: `Обнаружено ошибок: ${errors.length}. Подробности в консоли.`,
				});
			}

			loadQuestions();
		} catch (error: any) {
			console.error("Error syncing brand logos:", error);
			toast.error("Критическая ошибка синхронизации", {
				description:
					error.message ||
					"Не удалось синхронизировать логотипы брендов",
			});
		}
	};

	const loadQuestions = async () => {
		try {
			setIsLoading(true);
			const tablePromises = [
				{ table: "lite_questions", type: "LITE" },
				{ table: "easy_questions", type: "EASY" },
				{ table: "normal_questions", type: "NORMAL" },
				{ table: "hard_questions", type: "HARD" },
				{ table: "lite_questions2", type: "LITE2" },
				{ table: "hard_questions2", type: "HARD2" },
				{ table: "test_questions", type: "TEST" },
			].map(async ({ table, type }) => {
				const { data, error } = await supabase
					.schema("game")
					.from(table as any)
					.select("*")
					.order("created_at", { ascending: false });
				if (error) throw error;
				return (data || []).map((q: any) => ({
					...q,
					type,
					tableName: table,
				}));
			});
			const results = await Promise.all(tablePromises);
			const allQuestions = results.flat();
			setQuestions(allQuestions);
		} catch (error) {
			console.error("Error loading questions:", error);
			toast("Ошибка", {
				description: "Не удалось загрузить вопросы",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const loadTestQuestions = async () => {
		try {
			setIsLoading(true);
			const { data, error } = await supabase
				.schema("game")
				.from("test_questions")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) throw error;

			setTestQuestions(
				(data || []).map((q: any) => ({
					...q,
					tableName: "test_questions",
				}))
			);
		} catch (error) {
			console.error("Error loading test questions:", error);
			toast("Ошибка", {
				description: "Не удалось загрузить тестовые вопросы",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const activeQuestions = currentTab === "main" ? questions : testQuestions;

	const filteredQuestions = activeQuestions.filter((question) => {
		const matchesSearch =
			question.question
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			question.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
			question.category.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType =
			selectedType === "all" || question.type === selectedType;
		const matchesCategory =
			selectedCategory === "all" ||
			question.category === selectedCategory;
		return matchesSearch && matchesType && matchesCategory;
	});

	const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedType, selectedCategory]);

	const getTableName = (type: string, isTest = false) => {
		if (isTest) {
			return "test_questions";
		}
		const typeMap: { [key: string]: string } = {
			LITE: "lite_questions",
			EASY: "easy_questions",
			NORMAL: "normal_questions",
			HARD: "hard_questions",
			LITE2: "lite_questions2",
			HARD2: "hard_questions2",
		};
		return typeMap[type] || "lite_questions";
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const isTest = currentTab === "test";
			if (editingQuestion) {
				const originalTableName =
					(editingQuestion as any).tableName ||
					getTableName(editingQuestion.type, isTest);
				const newTableName = getTableName(formData.type, isTest);

				if (originalTableName !== newTableName) {
					const { error: insertError } = await supabase
						.schema("game")
						.from(newTableName as any)
						.insert({ ...formData });
					if (insertError) throw insertError;

					const { error: deleteError } = await supabase
						.schema("game")
						.from(originalTableName as any)
						.delete()
						.eq("id", editingQuestion.id);
					if (deleteError) throw deleteError;
				} else {
					const { error } = await supabase
						.schema("game")
						.from(originalTableName as any)
						.update({ ...formData })
						.eq("id", editingQuestion.id);
					if (error) throw error;
				}

				toast("Вопрос обновлен", {
					description: "Изменения успешно сохранены",
				});
				setIsEditDialogOpen(false);
			} else {
				const tableName = getTableName(formData.type, isTest);
				const { error } = await supabase
					.schema("game")
					.from(tableName as any)
					.insert({ ...formData });

				if (error) throw error;

				toast("Вопрос добавлен", {
					description: "Новый вопрос успешно создан",
				});
				setIsAddDialogOpen(false);
			}

			resetForm();
			if (isTest) {
				loadTestQuestions();
			} else {
				loadQuestions();
			}
		} catch (error: any) {
			console.error("Error saving question:", error);
			toast("Ошибка", {
				description: error.message || "Не удалось сохранить вопрос",
			});
		}
	};

	const handleEdit = (question: Question) => {
		setFormData({
			question: question.question,
			answer_1: question.answer_1,
			answer_2: question.answer_2,
			answer_3: question.answer_3,
			answer_4: question.answer_4,
			correct_answer: question.correct_answer,
			brand: question.brand,
			category: question.category,
			type: question.type,
			logo_url: question.logo_url || "",
		});
		setEditingQuestion(question);
		setIsEditDialogOpen(true);
	};

	const handleDelete = async (question: Question) => {
		try {
			const isTest = currentTab === "test";
			const tableName =
				(question as any).tableName ||
				getTableName(question.type, isTest);
			const { error } = await supabase
				.schema("game")
				.from(tableName as any)
				.delete()
				.eq("id", question.id);

			if (error) throw error;

			toast("Вопрос удален", {
				description: "Вопрос успешно удален из базы",
			});

			if (isTest) {
				loadTestQuestions();
			} else {
				loadQuestions();
			}
		} catch (error: any) {
			console.error("Error deleting question:", error);
			toast("Ошибка", {
				description: error.message || "Не удалось удалить вопрос",
			});
		}
	};

	const getTypeInfo = (type: string) => {
		return questionTypes.find((t) => t.value === type) || questionTypes[0];
	};

	return (
		<div className='space-y-6'>
			<div className='flex flex-col items-start justify-between space-y-4 lg:flex-row lg:items-center lg:space-y-0'>
				<div>
					<h2 className='text-2xl font-bold text-white'>
						Управление вопросами
					</h2>
					<p className='text-muted-foreground'>
						Всего вопросов: {activeQuestions.length}
					</p>
				</div>

				<div className='flex flex-wrap gap-2'>
					<Button
						onClick={syncBrandLogos}
						variant='outline'
						className='border-border text-white'
					>
						<Upload className='mr-2 h-4 w-4' />
						Синхронизировать логотипы
					</Button>

					<Button
						onClick={downloadAllQuestions}
						variant='outline'
						className='border-border text-white'
					>
						<Download className='mr-2 h-4 w-4' />
						Скачать все вопросы
					</Button>
					<Button
						onClick={deleteAllQuestions}
						variant='outline'
						className='game-button-tetrary text-white'
					>
						<Trash2 className='mr-2 h-4 w-4' />
						Удалить все вопросы
					</Button>
					<Dialog
						open={isAddDialogOpen}
						onOpenChange={setIsAddDialogOpen}
					>
						<DialogTrigger asChild>
							<Button className='game-button-primary text-white'>
								<Plus className='mr-2 h-4 w-4' />
								Добавить вопрос
							</Button>
						</DialogTrigger>
						<DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto'>
							<DialogHeader>
								<DialogTitle>Добавить новый вопрос</DialogTitle>
							</DialogHeader>
							<QuestionForm
								formData={formData}
								setFormData={setFormData}
								onSubmit={handleSubmit}
								onCancel={() => {
									setIsAddDialogOpen(false);
									resetForm();
								}}
								isEditing={false}
								questionTypes={questionTypes}
							/>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<Tabs
				value={currentTab}
				onValueChange={setCurrentTab}
				className='w-full'
			>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='main'>Основные вопросы</TabsTrigger>
					<TabsTrigger value='test'>Тестовые вопросы</TabsTrigger>
				</TabsList>
				<TabsContent value='main' className='space-y-6'>
					{renderContent()}
				</TabsContent>
				<TabsContent value='test' className='space-y-6'>
					{renderContent()}
				</TabsContent>
			</Tabs>
		</div>
	);

	function renderContent() {
		return (
			<>
				<Card className='game-card p-4'>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
						<div className='space-y-2'>
							<Label>Поиск</Label>
							<div className='relative'>
								<Search className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
								<Input
									placeholder='Поиск по тексту, бренду, категории...'
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									className='pl-10'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<Label>Сложность</Label>
							<Select
								value={selectedType}
								onValueChange={setSelectedType}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>
										Все уровни
									</SelectItem>
									{questionTypes.map((type) => (
										<SelectItem
											key={type.value}
											value={type.value}
										>
											{type.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className='space-y-2'>
							<Label>Категория</Label>
							<Select
								value={selectedCategory}
								onValueChange={setSelectedCategory}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent className='max-h-96 max-w-2xs overflow-auto md:max-w-max'>
									<SelectItem value='all'>
										Все категории
									</SelectItem>
									{categories.map((category) => (
										<SelectItem
											key={category}
											value={category}
											className='text-wrap'
										>
											{category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className='space-y-2'>
							<Label>Действия</Label>
							<Button
								variant='outline'
								onClick={() => {
									setSearchTerm("");
									setSelectedType("all");
									setSelectedCategory("all");
								}}
								className='w-full'
							>
								<Filter className='mr-2 h-4 w-4' />
								Сбросить фильтры
							</Button>
						</div>
					</div>
				</Card>

				<Card className='game-card'>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow className='border-border'>
									<TableHead className='text-white'>
										Вопрос
									</TableHead>
									<TableHead className='text-white'>
										Бренд
									</TableHead>
									<TableHead className='text-white'>
										Категория
									</TableHead>
									<TableHead className='text-white'>
										Сложность
									</TableHead>
									<TableHead className='text-white'>
										Дата
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
											colSpan={6}
											className='py-8 text-center'
										>
											Загрузка вопросов...
										</TableCell>
									</TableRow>
								) : paginatedQuestions.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={6}
											className='text-muted-foreground py-8 text-center'
										>
											Вопросы не найдены
										</TableCell>
									</TableRow>
								) : (
									paginatedQuestions.map((question) => {
										const typeInfo = getTypeInfo(
											question.type
										);
										return (
											<TableRow
												key={question.id}
												className='border-border'
											>
												<TableCell>
													<div className='max-w-md'>
														<p className='line-clamp-2 font-medium text-white'>
															{question.question}
														</p>
														<p className='text-game-secondary mt-1 text-sm'>
															Ответ:{" "}
															{
																question.correct_answer
															}
														</p>
													</div>
												</TableCell>
												<TableCell>
													<div className='flex items-center space-x-2'>
														{question.logo_url && (
															<div className='flex h-8 w-8 items-center justify-center rounded-md bg-white p-1'>
																<img
																	src={
																		question.logo_url
																	}
																	alt={`${question.brand} logo`}
																	className='max-h-full max-w-full object-contain'
																/>
															</div>
														)}
														<Badge
															variant='outline'
															className='border-border text-white'
														>
															{question.brand}
														</Badge>
													</div>
												</TableCell>
												<TableCell>
													<span className='text-muted-foreground'>
														{question.category}
													</span>
												</TableCell>
												<TableCell>
													<Badge
														className={`${typeInfo.color} text-white`}
													>
														{typeInfo.label}
													</Badge>
												</TableCell>
												<TableCell>
													<span className='text-muted-foreground'>
														{new Date(
															question.created_at
														).toLocaleDateString()}
													</span>
												</TableCell>
												<TableCell>
													<div className='flex space-x-2'>
														<Button
															size='sm'
															variant='outline'
															onClick={() =>
																handleEdit(
																	question
																)
															}
														>
															<Edit className='h-3 w-3' />
														</Button>
														<Button
															size='sm'
															variant='outline'
															onClick={() =>
																handleDelete(
																	question
																)
															}
															className='border-red-400 text-red-400 hover:bg-red-400 hover:text-white'
														>
															<Trash2 className='h-3 w-3' />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										);
									})
								)}
							</TableBody>
						</Table>
					</div>
				</Card>

				{totalPages > 1 && (
					<div className='flex justify-center'>
						<Pagination>
							<PaginationContent className='text-muted-foreground'>
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
										} else if (
											currentPage >=
											totalPages - 2
										) {
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
					{Math.min(endIndex, filteredQuestions.length)} из{" "}
					{filteredQuestions.length} вопросов
				</div>

				<Dialog
					open={isEditDialogOpen}
					onOpenChange={setIsEditDialogOpen}
				>
					<DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto'>
						<DialogHeader>
							<DialogTitle>Редактировать вопрос</DialogTitle>
						</DialogHeader>
						<QuestionForm
							formData={formData}
							setFormData={setFormData}
							onSubmit={handleSubmit}
							onCancel={() => {
								setIsEditDialogOpen(false);
								resetForm();
							}}
							isEditing={true}
							questionTypes={questionTypes}
						/>
					</DialogContent>
				</Dialog>
			</>
		);
	}
};
