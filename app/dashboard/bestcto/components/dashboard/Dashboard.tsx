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
