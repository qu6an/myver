"use client";

import React, { useState, useEffect } from "react";
import { useNotificationContext } from "./NotificationProvider";
import { useCardState } from "../../hooks/useCardState";

interface EventCardProps {
	id?: string;
	title: string;
	description: string;
	icon: string | React.ComponentType<any>;
	iconColor: string;
	badge?: string;
	date?: string;
	location?: string;
	primaryButtonText?: string;
	secondaryButtonText?: string;
	eventType?: "workshop" | "exclusive" | "conference";
	onPrimaryClick?: () => void;
	onSecondaryClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
	id,
	title,
	description,
	icon,
	iconColor,
	badge,
	date,
	location,
	primaryButtonText = "Записаться",
	secondaryButtonText = "Расписание",
	eventType = "workshop",
	onPrimaryClick,
	onSecondaryClick,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const { addNotification } = useNotificationContext();
	const { initializeCard, getCardState, toggleBookmarked } = useCardState();
	const cardState = id ? getCardState(id) : undefined;

	// Инициализируем состояние карточки при монтировании компонента
	useEffect(() => {
		if (id) {
			initializeCard(id);
		}
	}, [id, initializeCard]);

	const handlePrimaryClick = () => {
		if (onPrimaryClick) {
			onPrimaryClick();
			// addNotification('Действие выполнено', `Вы записались на мероприятие "${title}"`, 'success'); // Уведомления отключены
		}
	};

	const handleSecondaryClick = () => {
		if (onSecondaryClick) {
			onSecondaryClick();
			// addNotification('Действие выполнено', `Открыто расписание мероприятия "${title}"`, 'info'); // Уведомления отключены
		}
	};

	const handleCardClick = () => {
		// addNotification('Информация', `Вы открыли мероприятие "${title}"`, 'info'); // Уведомления отключены
	};

	const handleBookmarkClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (id) {
			toggleBookmarked(id);
			const isBookmarkedNow = !cardState?.isBookmarked;
			// addNotification('Закладка', `Мероприятие "${title}" ${isBookmarkedNow ? 'добавлено в' : 'удалено из'} избранного`, isBookmarkedNow ? 'success' : 'info'); // Уведомления отключены
		} else {
			// addNotification('Ошибка', 'ID мероприятия не определено', 'error'); // Уведомления отключены
		}
	};

	const eventTypeColors = {
		workshop: "border-l-indigo-500 bg-indigo-50",
		exclusive: "border-l-rose-500 bg-rose-50",
		conference: "border-l-emerald-500 bg-emerald-50",
	};

	const eventTypeIconColors = {
		workshop: "text-indigo-500 bg-indigo-100",
		exclusive: "text-rose-500 bg-rose-10",
		conference: "text-emerald-500 bg-emerald-100",
	};

	return (
		<div
			className={`event-card bg-white rounded-3xl p-6 shadow-lg border border-gray-200 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 ${
				eventTypeColors[eventType]
			} ${isHovered ? "cursor-pointer" : ""}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleCardClick}
		>
			{badge && (
				<div className='event-badge absolute top-4 right-4 bg-indigo-400 text-white rounded-full px-3 py-1 text-xs font-bold'>
					{badge}
				</div>
			)}

			<div
				className={`event-header flex items-start justify-between mb-4 relative`}
			>
				<div
					className={`event-icon w-12 h-12 rounded-xl flex items-center justify-center text-xl ${eventTypeIconColors[eventType]}`}
				>
					{typeof icon === "string" ? (
						<i className={icon}></i>
					) : (
						React.createElement(icon)
					)}
				</div>
				<button
					className='event-bookmark absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-lg cursor-pointer hover:bg-gray-10 transition-colors z-10'
					onClick={handleBookmarkClick}
				>
					<i
						className={`fas ${
							cardState?.isBookmarked
								? "fa-bookmark text-amber-500"
								: "fa-bookmark text-gray-300"
						}`}
					></i>
				</button>
			</div>

			<h3 className='event-title text-xl font-bold text-gray-900 mb-2'>
				{title}
			</h3>
			<p className='event-description text-gray-600 mb-5 flex-grow'>
				{description}
			</p>

			<div
				className='event-meta flex gap-4 mb-5 text-sm text-gray-500 cursor-pointer'
				onClick={(e) => {
					e.stopPropagation();
					// addNotification('Мероприятие', `Дата: ${date || 'Не указана'}, Место: ${location || 'Не указано'}`, 'info'); // Уведомления отключены
				}}
			>
				{date && (
					<div className='event-meta-item flex items-center gap-1.5'>
						<i className='fas fa-clock'></i>
						<span>{date}</span>
					</div>
				)}
				{location && (
					<div className='event-meta-item flex items-center gap-1.5'>
						<i className='fas fa-map-marker-alt'></i>
						<span>{location}</span>
					</div>
				)}
			</div>

			<div className='event-actions flex gap-2.5'>
				<button
					className={`btn btn-primary flex-1 py-2.5 px-4 rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 ${iconColor.replace(
						"text-",
						"bg-"
					)} hover:opacity-90`}
					onClick={(e) => {
						e.stopPropagation();
						handlePrimaryClick();
					}}
				>
					{primaryButtonText}
				</button>
				<button
					className='btn btn-outline flex-1 py-2.5 px-4 rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 text-indigo-60 border border-indigo-600 hover:bg-indigo-100/50'
					onClick={(e) => {
						e.stopPropagation();
						handleSecondaryClick();
					}}
				>
					{secondaryButtonText}
				</button>
			</div>
		</div>
	);
};

export default EventCard;
