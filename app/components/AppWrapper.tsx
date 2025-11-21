"use client";

import React from "react";
import { NotificationProvider } from "./NotificationProvider"; // Уведомления отключены, но провайдер остается для совместимости
import { SearchProvider } from "../../contexts/SearchContext";

interface AppWrapperProps {
	children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
	return (
		<NotificationProvider>
			{" "}
			{/* Уведомления отключены, но провайдер остается для совместимости */}
			<SearchProvider>{children}</SearchProvider>
		</NotificationProvider>
	);
};

export default AppWrapper;
