"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MyPointsCard from "./cards/MyPointsCard";
import AllTestsCard from "./cards/AllTestsCard";
import TeamCard from "./cards/TeamCard";
import PathToVictoryCard from "./cards/PathToVictoryCard";
import PartnerCard from "./cards/PartnerCard";
import WorkshopCard from "./cards/WorkshopCard";
import PrizesCard from "./cards/PrizesCard";
import MotivationCard from "./cards/MotivationCard";
import QuizCard from "./cards/QuizCard";
import CertificationCard from "./cards/CertificationCard";
import TeamRankingCard from "../TeamRankingCard";
import RankingTable from "../RankingTable";

export default function Dashboard() {
	const [notification, setNotification] = useState<{
		message: string;
		visible: boolean;
	}>({
		message: "",
		visible: false,
	});

	const showNotification = (message: string) => {
		setNotification({ message, visible: true });
		setTimeout(
			() => setNotification({ message: "", visible: false }),
			3000
		);
	};

	const rankingRows = [
		{ position: 1, name: 'Иванов Сергей', autoservice: 'АвтоМир', city: 'Москва', score: 415, progress: 100 },
		{ position: 2, name: 'Петрова Анна', autoservice: 'ТехноСервис', city: 'Москва', score: 390, progress: 94 },
		{ position: 3, name: 'Смирнов Дмитрий', autoservice: 'СервисПлюс', city: 'Москва', score: 375, progress: 90 },
		{ position: 4, name: 'Волков Алексей', autoservice: 'Вилгуд', city: 'Москва', score: 360, progress: 87, isCurrentUser: true },
		{ position: 5, name: 'Кузнецов Игорь', autoservice: 'АвтоМастер', city: 'Москва', score: 345, progress: 83 },
		{ position: 6, name: 'Михайлова Ольга', autoservice: 'ПрофиСервис', city: 'Москва', score: 330, progress: 80 },
		{ position: 7, name: 'Попов Андрей', autoservice: 'МоторСити', city: 'Москва', score: 315, progress: 76 },
		{ position: 8, name: 'Соколова Елена', autoservice: 'АвтоСфера', city: 'Москва', score: 30, progress: 72 },
		{ position: 9, name: 'Лебедев Михаил', autoservice: 'СервисГрупп', city: 'Москва', score: 290, progress: 70 },
		{ position: 10, name: 'Ковалева Татьяна', autoservice: 'АвтоДок', city: 'Москва', score: 280, progress: 67 },
	];

	return (
		<div className='main-content flex-1 ml-0  transition-all duration-300'>
			<div className='breadcrumbs text-sm text-gray-600 mb-2'>
				<span>Главная / Личный кабинет / АВТОСЕРВИС ГОДА 2025</span>
			</div>

			<main className='flex-1 p-4 md:p-6 lg:p-8'>
				<motion.div
					className='grid grid-cols-1 lg:grid-cols-3 gap-6'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{/* Left Column - Main Content */}
					<div className='lg:col-span-2 space-y-6'>
						<MyPointsCard onNotify={showNotification} />
						<TeamRankingCard onNotify={showNotification} />
						<AllTestsCard onNotify={showNotification} />
						<PathToVictoryCard onNotify={showNotification} />
						<TeamCard onNotify={showNotification} />
					</div>

					{/* Right Column - Sidebar Content */}
					<div className='space-y-6'>
						<PartnerCard />
						<WorkshopCard onNotify={showNotification} />
						<PrizesCard />
						<MotivationCard onNotify={showNotification} />
						<QuizCard onNotify={showNotification} />
					</div>
				</motion.div>

				{/* Ranking Section */}
				<motion.div
					className='mt-6'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<RankingTable rows={rankingRows} />
				</motion.div>

				{/* Full Width Cards */}
				<motion.div
					className='mt-6'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<CertificationCard onNotify={showNotification} />
				</motion.div>
			</main>
		</div>
	);
}
