import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Search, Edit, Trash2, Car, Upload } from "lucide-react";

import { BrandLogoUploader } from "./BrandLogoUploader";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

// Separate form component to prevent re-creation and focus loss
const BrandForm = ({
	formData,
	setFormData,
	onSubmit,
	onCancel,
	isEditing,
}: {
	formData: {
		name: string;
		category: string;
		logo_url: string;
		logo_key: string;
	};
	setFormData: (data: {
		name: string;
		category: string;
		logo_url: string;
		logo_key: string;
	}) => void;
	onSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
	isEditing: boolean;
}) => (
	<form onSubmit={onSubmit} className='space-y-6'>
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
			<div className='space-y-2'>
				<Label>Название бренда (латинскими буквами)</Label>
				<Input
					value={formData.name}
					onChange={(e) =>
						setFormData({ ...formData, name: e.target.value })
					}
					placeholder='Например: BMW, Mercedes'
					required
				/>
			</div>
			{/* <div className="space-y-2">
        <Label>Категория</Label>
        <Input
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
          placeholder="Например: Премиум, Массовые"
        />
      </div> */}
		</div>

		{/* Logo Uploader */}
		<div className='space-y-2'>
			<Label>Логотип бренда</Label>
			<BrandLogoUploader
				brandName={formData.name}
				currentLogoUrl={formData.logo_url}
				currentLogoKey={formData.logo_key}
				onLogoUploaded={(logoUrl, logoKey) =>
					setFormData({
						...formData,
						logo_url: logoUrl,
						logo_key: logoKey,
					})
				}
			/>
		</div>

		<div className='flex justify-end space-x-2'>
			<Button type='button' variant='outline' onClick={onCancel}>
				Отмена
			</Button>
			<Button type='submit' className='game-button-primary text-white'>
				{isEditing ? "Сохранить" : "Добавить"}
			</Button>
		</div>
	</form>
);

export const BrandsManager = () => {
	const [brands, setBrands] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [editingBrand, setEditingBrand] = useState<any>(null);
	const [formData, setFormData] = useState({
		name: "",
		category: "",
		logo_url: "",
		logo_key: "",
	});
	const supabase = createClient();

	useEffect(() => {
		loadBrands();
	}, []);

	const resetForm = () => {
		setFormData({
			name: "",
			category: "",
			logo_url: "",
			logo_key: "",
		});
		setEditingBrand(null);
	};

	const loadBrands = async () => {
		try {
			setIsLoading(true);
			const { data: brandsData, error } = await supabase
				.schema("game")
				.from("brands")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) throw error;

			// Get question counts for each brand
			const brandsWithCounts = await Promise.all(
				(brandsData || []).map(async (brand) => {
					// Count questions from all tables
					const [lite, easy, normal, hard, lite2, hard2] =
						await Promise.all([
							supabase
								.schema("game")
								.from("lite_questions")
								.select("id", { count: "exact", head: true })
								.eq("brand", brand.name),
							supabase
								.schema("game")
								.from("easy_questions")
								.select("id", { count: "exact", head: true })
								.eq("brand", brand.name),
							supabase
								.schema("game")
								.from("normal_questions")
								.select("id", { count: "exact", head: true })
								.eq("brand", brand.name),
							supabase
								.schema("game")
								.from("hard_questions")
								.select("id", { count: "exact", head: true })
								.eq("brand", brand.name),
							supabase
								.schema("game")
								.from("lite_questions2")
								.select("id", { count: "exact", head: true })
								.eq("brand", brand.name),
							supabase
								.schema("game")
								.from("hard_questions2")
								.select("id", { count: "exact", head: true })
								.eq("brand", brand.name),
						]);

					const questionsCount =
						(lite.count || 0) +
						(easy.count || 0) +
						(normal.count || 0) +
						(hard.count || 0) +
						(lite2.count || 0) +
						(hard2.count || 0);

					return {
						...brand,
						questionsCount,
						created_at: new Date(
							brand.created_at
						).toLocaleDateString(),
					};
				})
			);

			setBrands(brandsWithCounts);
		} catch (error) {
			console.error("Error loading brands:", error);
			toast.error("Ошибка", {
				description: "Не удалось загрузить бренды",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const syncBrandsFromQuestions = async () => {
		try {
			// Get all unique brands from question tables
			const allBrandsSet = new Set<string>();

			// Fetch brands from each question table separately to avoid dynamic table names
			const [
				liteResult,
				easyResult,
				normalResult,
				hardResult,
				lite2Result,
				hard2Result,
			] = await Promise.all([
				supabase
					.schema("game")
					.from("lite_questions")
					.select("brand")
					.not("brand", "is", null),
				supabase
					.schema("game")
					.from("easy_questions")
					.select("brand")
					.not("brand", "is", null),
				supabase
					.schema("game")
					.from("normal_questions")
					.select("brand")
					.not("brand", "is", null),
				supabase
					.schema("game")
					.from("hard_questions")
					.select("brand")
					.not("brand", "is", null),
				supabase
					.schema("game")
					.from("lite_questions2")
					.select("brand")
					.not("brand", "is", null),
				supabase
					.schema("game")
					.from("hard_questions2")
					.select("brand")
					.not("brand", "is", null),
			]);

			// Process results from each table
			[
				liteResult,
				easyResult,
				normalResult,
				hardResult,
				lite2Result,
				hard2Result,
			].forEach((result) => {
				if (result.data) {
					result.data.forEach((row: any) => {
						if (row.brand) {
							allBrandsSet.add(row.brand);
						}
					});
				}
			});

			const uniqueBrands = Array.from(allBrandsSet);

			// Get existing brands to avoid duplicates
			const { data: existingBrands, error: existingError } =
				await supabase.schema("game").from("brands").select("name");

			if (existingError) throw existingError;

			const existingBrandNames = new Set(
				existingBrands?.map((b: any) => b.name.toLowerCase()) || []
			);

			// Filter brands that don't exist yet
			const newBrands = uniqueBrands.filter(
				(brand) => !existingBrandNames.has(brand.toLowerCase())
			);

			if (newBrands.length === 0) {
				toast.success("Синхронизация завершена", {
					description: "Все бренды из вопросов уже есть в системе",
				});
				return;
			}

			// Add new brands
			const newBrandsData = newBrands.map((brandName) => ({
				name: brandName,
				category: "Авто", // Default category for auto brands
			}));

			const { error: insertError } = await supabase
				.schema("game")
				.from("brands")
				.insert(newBrandsData);

			if (insertError) throw insertError;

			toast.success("Синхронизация завершена", {
				description: `Добавлено ${newBrands.length} новых брендов из вопросов`,
			});

			// Reload brands
			loadBrands();
		} catch (error) {
			console.error("Error syncing brands from questions:", error);
			toast.error("Ошибка", {
				description: "Не удалось синхронизировать бренды из вопросов",
			});
		}
	};

	const filteredBrands = brands.filter((brand) => {
		return (
			brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			brand.category.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (editingBrand) {
				// Update existing brand
				const { error } = await supabase
					.schema("game")
					.from("brands")
					.update({
						name: formData.name,
						category: formData.category,
						logo_url: formData.logo_url,
						logo_key: formData.logo_key,
					})
					.eq("id", editingBrand.id);

				if (error) throw error;

				toast("Бренд обновлен", {
					description: "Изменения успешно сохранены",
				});
				setIsEditDialogOpen(false);
			} else {
				// Add new brand
				const { error } = await supabase
					.schema("game")
					.from("brands")
					.insert({
						name: formData.name,
						category: formData.category,
						logo_url: formData.logo_url,
						logo_key: formData.logo_key,
					});

				if (error) throw error;

				toast("Бренд добавлен", {
					description: "Новый бренд успешно создан",
				});
				setIsAddDialogOpen(false);
			}

			resetForm();
			loadBrands(); // Reload brands list
		} catch (error: any) {
			console.error("Error saving brand:", error);
			toast.error("Ошибка", {
				description: error.message || "Не удалось сохранить бренд",
			});
		}
	};

	const handleEdit = (brand: any) => {
		setFormData({
			name: brand.name,
			category: brand.category,
			logo_url: brand.logo_url || "",
			logo_key: brand.logo_key || "",
		});
		setEditingBrand(brand);
		setIsEditDialogOpen(true);
	};

	const handleDelete = async (id: string, logo_key?: string) => {
		try {
			// Если есть логотип, удаляем его из storage
			if (logo_key) {
				console.log(logo_key);

				const { error } = await supabase.storage
					.from("brand-logos")
					.remove([logo_key]);
				console.log("Delete error:", error);
			}
			const { error } = await supabase
				.schema("game")
				.from("brands")
				.delete()
				.eq("id", id);

			if (error) throw error;
			toast("Бренд удален", {
				description: "Бренд успешно удален из базы",
			});

			loadBrands(); // Reload brands list
		} catch (error: any) {
			console.error("Error deleting brand:", error);
			toast.error("Ошибка", {
				description: error.message || "Не удалось удалить бренд",
			});
		}
	};

	if (isLoading) {
		return (
			<div className='flex h-64 items-center justify-center'>
				<div className='text-white'>Загрузка брендов...</div>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-wrap items-center justify-between gap-2'>
				<div>
					<h2 className='text-2xl font-bold text-white'>
						Управление брендами
					</h2>
					<p className='text-muted-foreground'>
						Всего брендов: {brands.length}
					</p>
				</div>

				<div className='flex flex-wrap gap-2'>
					<Button
						onClick={syncBrandsFromQuestions}
						variant='outline'
						className='border-border text-white'
					>
						<Upload className='mr-2 h-4 w-4' />
						Синхронизировать бренды
					</Button>

					<Dialog
						open={isAddDialogOpen}
						onOpenChange={setIsAddDialogOpen}
					>
						<DialogTrigger asChild>
							<Button className='game-button-primary text-white'>
								<Plus className='mr-2 h-4 w-4' />
								Добавить бренд
							</Button>
						</DialogTrigger>
						<DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto'>
							<DialogHeader>
								<DialogTitle>Добавить новый бренд</DialogTitle>
							</DialogHeader>
							<BrandForm
								formData={formData}
								setFormData={setFormData}
								onSubmit={handleSubmit}
								onCancel={() => {
									resetForm();
									setIsAddDialogOpen(false);
								}}
								isEditing={false}
							/>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			{/* Search */}
			<Card className='game-card p-4'>
				<div className='space-y-2'>
					<Label>Поиск</Label>
					<div className='relative'>
						<Search className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
						<Input
							placeholder='Поиск по названию или категории...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='pl-10'
						/>
					</div>
				</div>
			</Card>

			{/* Brands Table */}
			<Card className='game-card'>
				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							<TableRow className='border-border'>
								<TableHead className='text-white'>
									Логотип
								</TableHead>
								<TableHead className='text-white'>
									Название
								</TableHead>
								<TableHead className='text-white'>
									Категория
								</TableHead>
								<TableHead className='text-white'>
									Вопросов
								</TableHead>
								<TableHead className='text-white'>
									Дата создания
								</TableHead>
								<TableHead className='w-32 text-white'>
									Действия
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredBrands.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={6}
										className='text-muted-foreground py-8 text-center'
									>
										{searchTerm
											? "По вашему запросу ничего не найдено"
											: "Нет добавленных брендов"}
									</TableCell>
								</TableRow>
							) : (
								filteredBrands.map((brand) => (
									<TableRow
										key={brand.id}
										className='border-border'
									>
										<TableCell>
											<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-white p-1'>
												{brand.logo_url ? (
													<img
														src={brand.logo_url}
														alt={`${brand.name} logo`}
														className='max-h-full max-w-full object-contain'
													/>
												) : (
													<Car className='text-muted-foreground h-6 w-6' />
												)}
											</div>
										</TableCell>
										<TableCell>
											<span className='font-medium text-white'>
												{brand.name}
											</span>
										</TableCell>
										<TableCell>
											<Badge
												variant='outline'
												className='border-border text-white'
											>
												{brand.category}
											</Badge>
										</TableCell>
										<TableCell>
											<span className='text-muted-foreground'>
												{brand.questionsCount || 0}
											</span>
										</TableCell>
										<TableCell>
											<span className='text-muted-foreground'>
												{brand.created_at}
											</span>
										</TableCell>
										<TableCell>
											<div className='flex space-x-2'>
												<Button
													size='sm'
													variant='outline'
													onClick={() =>
														handleEdit(brand)
													}
												>
													<Edit className='h-3 w-3' />
												</Button>
												<Button
													size='sm'
													variant='outline'
													onClick={() =>
														handleDelete(
															brand.id,
															brand.logo_key
														)
													}
													className='border-red-400 text-red-400 hover:bg-red-400 hover:text-white'
												>
													<Trash2 className='h-3 w-3' />
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

			{/* Edit Dialog */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto'>
					<DialogHeader>
						<DialogTitle>Редактировать бренд</DialogTitle>
					</DialogHeader>
					<BrandForm
						formData={formData}
						setFormData={setFormData}
						onSubmit={handleSubmit}
						onCancel={() => {
							resetForm();
							setIsEditDialogOpen(false);
						}}
						isEditing={true}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};
