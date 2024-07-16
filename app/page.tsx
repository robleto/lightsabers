import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Lightsaber from "./components/Lightsabers";
import lightsabers from "./data/lightsabers.json";

interface LightsaberData {
	color: string;
	imgSrc: string;
	altText: string;
	title: string;
	description: string;
	className?: string;
}

const LightsaberGallery: React.FC = () => {
	return (
		<div className="w-full h-full flex flex-col">
			<Header />

			<main className="flex-1 overflow-hidden">
				<div className="w-full h-full flex flex-row overflow-x-auto">
					{lightsabers.map((saber: LightsaberData, index: number) => (
						<Lightsaber
							key={index}
							color={saber.color}
							imgSrc={saber.imgSrc}
							altText={saber.altText}
							title={saber.title}
							description={saber.description}
							className={saber.className}
						/>
					))}
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default LightsaberGallery;
