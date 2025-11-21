"use client";

import { UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "../../../components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../../lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const documentTypes = [
	{ code: "01", name: "Паспорт гражданина СССР" },
	{ code: "03", name: "Свидетельство о рождении" },
	{ code: "10", name: "Паспорт иностранного гражданина" },
	{ code: "12", name: "Вид на жительство в Российской Федерации" },
	{
		code: "15",
		name: "Разрешение на временное проживание в Российской Федерации",
	},
	{
		code: "16",
		name: "Временное удостоверение личности лица без гражданства в РФ",
	},
	{
		code: "19",
		name: "Свидетельство о предоставлении временного убежища на территории РФ",
	},
	{ code: "21", name: "Паспорт гражданина Российской Федерации" },
	{ code: "22", name: "Загранпаспорт гражданина Российской Федерации" },
	{
		code: "23",
		name: "Свидетельство о рождении, выданное органом иностранного государства",
	},
	{ code: "62", name: "Вид на жительство иностранного гражданина" },
];

interface DocumentInfoSectionProps {
	form: UseFormReturn<any>;
}

export default function DocumentInfoSection({
	form,
}: DocumentInfoSectionProps) {
	return (
		<>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				<FormField
					control={form.control}
					name='birthDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Дата рождения</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-full justify-between text-left font-normal",
												!field.value &&
													"text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP", {
													locale: ru,
												})
											) : (
												<span>Выберите дату</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='w-full min-w-[280px] p-0'
									align='start'
								>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date: Date) =>
											date > new Date() ||
											date < new Date("1900-01-01")
										}
										initialFocus
										locale={ru}
										captionLayout='dropdown'
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='documentType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Вид документа</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Выберите тип документа' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{documentTypes.map((doc) => (
										<SelectItem
											key={doc.code}
											value={doc.code}
										>
											{doc.code} - {doc.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
				<FormField
					control={form.control}
					name='documentSeries'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Серия документа</FormLabel>
							<FormControl>
								<Input placeholder='0000' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='documentNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Номер документа</FormLabel>
							<FormControl>
								<Input placeholder='000000' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='documentIssueDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Дата выдачи</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-full justify-between text-left font-normal",
												!field.value &&
													"text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP", {
													locale: ru,
												})
											) : (
												<span>Выберите дату</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='w-full min-w-[280px] p-0'
									align='start'
								>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date: Date) =>
											date > new Date()
										}
										initialFocus
										locale={ru}
										captionLayout='dropdown'
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</>
	);
}
