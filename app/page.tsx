import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LightsaberGallery from "./components/Lightsabers";

const Page: React.FC = () => {
	return (
		<div className="w-full h-full flex flex-col overflow-imagesauto">
			<Header />
			<div className="flex-1 flex min-h-screen flex-col">
				<LightsaberGallery />
			</div>
			<Footer />
		</div>
	);
};

export default Page;
