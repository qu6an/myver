"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../../types";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../../../components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { jobTitles } from "@/lib/job-titles";

interface JobFieldsProps {
	form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
	isNdflApproved: boolean;
}

export default function JobFields({ form, isNdflApproved }: JobFieldsProps) {
	return (
		<>
			<FormField
				control={form.control}
				name='job_title'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Должность</FormLabel>
						<Select
							onValueChange={field.onChange}
							value={field.value}
							disabled={isNdflApproved}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder='Выберите должность' />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{jobTitles.map((item) => (
									<SelectItem
										key={item.value}
										value={item.value}
									>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='organization'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Организация</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder='Название организации'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
