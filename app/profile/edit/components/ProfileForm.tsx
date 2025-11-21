"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "../../../components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema, InsertProfile } from "../../types";

import PersonalInfoFields from "./PersonalInfoFields";
import ContactFields from "./ContactFields";
import JobFields from "./JobFields";
import LocationFields from "./LocationFields";
import DescriptionField from "./DescriptionField";
import { toast } from "sonner";

interface ProfileFormProps {
	initialData: InsertProfile;
	isNdflApproved?: boolean;
	onSubmit: (
		data: InsertProfile
	) => Promise<{ success?: boolean; error?: string } | void>;
}

export default function ProfileForm({
	initialData,
	isNdflApproved = false,
	onSubmit,
}: ProfileFormProps) {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: initialData.email || "",
			phone: initialData.phone || "",
			city: initialData.city || "",
			region: initialData.region || "",
			country: initialData.country || "",
			gender: initialData.gender || undefined,
			birthDay: initialData.birthDay || undefined,
			// idSystem: initialData.idSystem || '',
			first_name: initialData.first_name || "",
			last_name: initialData.last_name || "",
			middle_name: initialData.middle_name || "",
			organization: initialData.organization || "",
			description: initialData.description || "",
			job_title: initialData.job_title || undefined,
		},
	});

	// Обработчик отправки формы
	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		// Убираем форматирование из номера телефона перед отправкой
		const phoneWithoutFormat = data.phone.replace(/\D/g, "");
		const cleanedData = {
			...data,
			phone: phoneWithoutFormat,
		};

		const result = await onSubmit(cleanedData);

		if (result && "success" in result && result.success) {
			// При успешном сохранении перенаправляем на страницу профиля
			toast.success("Профиль успешно сохранён!");
			router.push("/profile");
			router.refresh(); // Обновляем, чтобы отобразить новые данные
		} else if (result && "error" in result) {
			// Обрабатываем ошибки
			toast.error(result.error);
			console.error("Ошибка при сохранении профиля:", result.error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2'
			>
				<PersonalInfoFields
					form={form}
					isNdflApproved={isNdflApproved}
				/>
				<ContactFields form={form} />
				<JobFields form={form} isNdflApproved={isNdflApproved} />
				<LocationFields form={form} />
				<DescriptionField form={form} />

				<div className='flex justify-end gap-2 md:col-span-2'>
					<Button type='submit'>Сохранить</Button>
				</div>
			</form>
		</Form>
	);
}
