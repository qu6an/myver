import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppWrapper from "../../components/AppWrapper";

const inter = Inter({
	subsets: ["latin", "cyrillic"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Личный кабинет | АВТОСЕРВИС ГОДА 2025",
	description:
		"Платформа управления автосервисом с геймификацией, аналитикой и мотивацией персонала",
	generator: "v0.app",
	icons: {
		icon: [
			{
				url: "/icon-light-32x32.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/icon-dark-32x32.png",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/icon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/apple-icon.png",
	},
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{children}
		</>
	);
}
