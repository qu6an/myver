import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Save, Settings } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

interface EndGameSettings {
	id: string;
	title: string;
	description: string;
	text: string;
	text_link: string;
	link: string;
}

export const EndGameSettingsManager = () => {
	const [settings, setSettings] = useState<EndGameSettings>({
		id: "",
		title: "",
		description: "",
		text: "",
		text_link: "",
		link: "",
	});
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const supabase = createClient();

	useEffect(() => {
		loadSettings();
	}, []);

	const loadSettings = async () => {
		try {
			setLoading(true);
			const { data, error } = await supabase
				.schema("game")
				.from("info_win_game")
				.select("*")
				.limit(1)
				.single();

			if (error && error.code !== "PGRST116") {
				throw error;
			}

			if (data) {
				setSettings({
					id: data.id,
					title: data.title || "Поздравляем с прохождением игры!",
					description:
						data.description || "Спасибо за участие в EVERYCAR!",
					text: data.text || "Увидимся в следующей игре!",
					text_link: data.text_link || "Посмотреть полный рейтинг",
					link: data.link || "/leaderboard",
				});
			}
		} catch (error) {
			console.error("Error loading end game settings:", error);
			toast.error("Ошибка", {
				description: "Не удалось загрузить настройки",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleSave = async () => {
		try {
			setSaving(true);

			const settingsData = {
				title: settings.title,
				description: settings.description,
				text: settings.text,
				text_link: settings.text_link,
				link: settings.link,
			};

			if (settings.id) {
				// Update existing settings

				const { error } = await supabase
					.schema("game")
					.from("info_win_game")
					.update(settingsData)
					.eq("id", settings.id);

				if (error) throw error;
			} else {
				// Create new settings
				const { data, error } = await supabase
					.schema("game")
					.from("info_win_game")
					.insert(settingsData)
					.select()
					.single();

				if (error) throw error;

				setSettings((prev) => ({ ...prev, id: data.id }));
			}

			toast("Успех", {
				description: "Настройки сохранены",
			});
		} catch (error) {
			console.error("Error saving settings:", error);
			toast.error("Ошибка", {
				description: "Не удалось сохранить настройки",
			});
		} finally {
			setSaving(false);
		}
	};

	const handleInputChange = (field: keyof EndGameSettings, value: string) => {
		setSettings((prev) => ({ ...prev, [field]: value }));
	};

	if (loading) {
		return (
			<div className='flex h-64 items-center justify-center'>
				<div className='text-white'>Загрузка настроек...</div>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex items-center space-x-3'>
				<Settings className='text-game-primary h-6 w-6' />
				<div>
					<h2 className='text-2xl font-bold text-white'>
						Настройки окончания игры
					</h2>
					<p className='text-muted-foreground'>
						Настройте сообщения, которые видят игроки после
						завершения игры
					</p>
				</div>
			</div>

			<Card className='game-card p-6'>
				<div className='space-y-6'>
					{/* Title */}
					<div className='space-y-2'>
						<Label className='text-white'>Заголовок</Label>
						<Input
							value={settings.title}
							onChange={(e) =>
								handleInputChange("title", e.target.value)
							}
							placeholder='Поздравляем с прохождением игры!'
							className='bg-muted border-border text-white'
						/>
						<p className='text-muted-foreground text-xs'>
							Главный заголовок в модальном окне
						</p>
					</div>

					{/* Description */}
					<div className='space-y-2'>
						<Label className='text-white'>Описание</Label>
						<Textarea
							value={settings.description}
							onChange={(e) =>
								handleInputChange("description", e.target.value)
							}
							placeholder='Спасибо за участие в EVERYCAR!'
							className='bg-muted border-border min-h-[80px] text-white'
						/>
						<p className='text-muted-foreground text-xs'>
							Описание под заголовком
						</p>
					</div>

					{/* Additional Text */}
					<div className='space-y-2'>
						<Label className='text-white'>
							Дополнительный текст
						</Label>
						<Textarea
							value={settings.text}
							onChange={(e) =>
								handleInputChange("text", e.target.value)
							}
							placeholder='Увидимся в следующей игре!'
							className='bg-muted border-border min-h-[60px] text-white'
						/>
						<p className='text-muted-foreground text-xs'>
							Дополнительное сообщение в выделенном блоке
						</p>
					</div>

					{/* Link Text */}
					<div className='space-y-2'>
						<Label className='text-white'>Текст кнопки</Label>
						<Input
							value={settings.text_link}
							onChange={(e) =>
								handleInputChange("text_link", e.target.value)
							}
							placeholder='Посмотреть полный рейтинг'
							className='bg-muted border-border text-white'
						/>
						<p className='text-muted-foreground text-xs'>
							Текст на кнопке перехода к рейтингу
						</p>
					</div>

					{/* Link URL */}
					<div className='space-y-2'>
						<Label className='text-white'>Ссылка</Label>
						<Input
							value={settings.link}
							onChange={(e) =>
								handleInputChange("link", e.target.value)
							}
							placeholder='/leaderboard'
							className='bg-muted border-border text-white'
						/>
						<p className='text-muted-foreground text-xs'>
							URL для перехода (по умолчанию: /leaderboard)
						</p>
					</div>

					{/* Save Button */}
					<div className='flex justify-end pt-4'>
						<Button
							onClick={handleSave}
							disabled={saving}
							className='game-button-primary text-white'
						>
							<Save className='mr-2 h-4 w-4' />
							{saving ? "Сохранение..." : "Сохранить настройки"}
						</Button>
					</div>
				</div>
			</Card>

			{/* Preview Card */}
			<Card className='game-card p-6'>
				<div className='space-y-4'>
					<h3 className='flex items-center text-lg font-semibold text-white'>
						<Settings className='mr-2 h-4 w-4' />
						Предварительный просмотр
					</h3>

					<div className='bg-muted/20 border-border rounded-lg border p-4'>
						<div className='space-y-3 text-center'>
							<h4 className='text-xl font-bold text-white'>
								{settings.title}
							</h4>
							<p className='text-muted-foreground text-sm'>
								{settings.description}
							</p>

							{settings.text && (
								<div className='bg-game-primary/10 border-game-primary/30 mt-4 rounded-lg border p-3'>
									<p className='text-sm text-white'>
										{settings.text}
									</p>
								</div>
							)}

							<Button
								className='game-button-primary mt-4 text-white'
								disabled
							>
								{settings.text_link}
							</Button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};
