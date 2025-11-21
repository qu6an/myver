"use client";
import { Button } from "../../components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { sendPasswordResetEmail } from "../actions";
import { toast } from "sonner";
const emailSchema = z.object({
	email: z.string().email({ message: "Неверный формат email" }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export const EmailForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const emailForm = useForm<EmailFormValues>({
		resolver: zodResolver(emailSchema),
		defaultValues: { email: "" },
	});
	const handleEmailSubmit = async (values: EmailFormValues) => {
		setIsSubmitting(true);
		const result = await sendPasswordResetEmail(values.email);

		if (result.error) {
			toast.error(result.error);
		} else {
			toast.success(result.success);
		}
		setIsSubmitting(false);
	};
	return (
		<Form {...emailForm}>
			<form
				onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
				className='space-y-4'
			>
				<FormField
					control={emailForm.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type='email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='w-full'
					disabled={isSubmitting}
				>
					{isSubmitting
						? "Отправка..."
						: "Отправить ссылку для сброса"}
				</Button>
			</form>
		</Form>
	);
};
