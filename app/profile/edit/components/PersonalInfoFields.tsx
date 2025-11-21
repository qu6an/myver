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

interface PersonalInfoFieldsProps {
	form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
	isNdflApproved: boolean;
}

export default function PersonalInfoFields({
	form,
	isNdflApproved,
}: PersonalInfoFieldsProps) {
	return (
		<>
			<FormField
				control={form.control}
				name='last_name'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Фамилия</FormLabel>
						<FormControl>
							<Input
								{...field}
								disabled={isNdflApproved}
								placeholder='Иванов'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='first_name'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Имя</FormLabel>
						<FormControl>
							<Input
								{...field}
								disabled={isNdflApproved}
								placeholder='Иван'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='middle_name'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Отчество</FormLabel>
						<FormControl>
							<Input
								{...field}
								disabled={isNdflApproved}
								placeholder='Иванович'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='email'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input
								{...field}
								disabled
								type='email'
								placeholder='email@example.com'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='birthDay'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Дата рождения</FormLabel>
						<FormControl>
							<Input
								type='date'
								disabled={isNdflApproved}
								value={
									field.value
										? new Date(field.value)
												.toISOString()
												.split("T")[0]
										: ""
								}
								onChange={(e) => {
									if (e.target.value) {
										field.onChange(
											new Date(e.target.value)
										);
									} else {
										field.onChange(undefined);
									}
								}}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='gender'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Пол</FormLabel>
						<Select
							onValueChange={field.onChange}
							value={field.value}
							disabled={isNdflApproved}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder='Выберите пол' />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value='male'>Мужской</SelectItem>
								<SelectItem value='female'>Женский</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>

			{/* <FormField
        control={form.control}
        name="idSystem"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Идентификатор в системе</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={isNdflApproved}
                placeholder="123456EVERYCAR..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
		</>
	);
}
