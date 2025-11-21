import type React from "react";

import BreadCrumbs from "./components/BreadCrumbs";
import Footer from "./components/Footer";

export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* Breadcrumb */}
			<BreadCrumbs />

			{/* Main Content */}
			<main>{children}</main>

			{/* Footer */}
			<Footer />
		</>
	);
}
