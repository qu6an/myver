"use client";

import { useEffect } from "react";
import { AnimatedBackground } from "./components/animated-background";
import { Header } from "./components/header";
import { HeroSection } from "./components/hero-section";
import { ProjectsSection } from "./components/projects-section";
import { FeaturesSection } from "./components/features-section";
import { PartnersSection } from "./components/partners-section";
import { DashboardSection } from "./components/dashboard-section";
// import { SpecialOfferSection } from "./components/special-offer-section";
import { ExperienceSection } from "./components/experience-section";
import { FAQSection } from "./components/faq-section";
import { Footer } from "./components/footer";

export default function HomePage() {
	useEffect(() => {
		// Scroll animations
		const observerOptions = {
			threshold: 0.1,
			rootMargin: "0px 0px -50px 0px",
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
				}
			});
		}, observerOptions);

		const elements = document.querySelectorAll(".fade-in");
		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	return (
		<>
			<AnimatedBackground />
			<Header />
			<main>
				<HeroSection />
				<ProjectsSection />
				<FeaturesSection />
				<PartnersSection />
				<DashboardSection />
				{/* <SpecialOfferSection /> */}
				{/* <ExperienceSection /> */}
				<FAQSection />
			</main>
			<Footer />
		</>
	);
}
