"use client";

import React, { useState } from "react";
import "../styles/lightsabers/position.css";
import "../styles/lightsabers/mobile.css";
import "../styles/lightsabers/color.css";
import "../styles/lightsabers/outliers.css";
import lightsabersData from "../data/lightsabers.json";

interface LightsaberProps {
	color: string;
	imgSrc: string;
	altText: string;
	title: string;
	description: string;
	className?: string;
	isActive: boolean;
	onActivate: () => void;
}

const colorClassMap: { [key: string]: { bg: string; text: string } } = {
	blue: { bg: "bg-blue-gradient", text: "text-blue-copy" },
	purple: { bg: "bg-purple-gradient", text: "text-purple-copy" },
	red: { bg: "bg-red-gradient", text: "text-red-copy" },
	yellow: { bg: "bg-yellow-gradient", text: "text-yellow-copy" },
	green: { bg: "bg-green-gradient", text: "text-green-copy" },
};

const Lightsaber: React.FC<LightsaberProps> = ({
	color,
	imgSrc,
	altText,
	title,
	description,
	className,
	isActive,
	onActivate,
}) => {
	const colorClasses = colorClassMap[color];

	return (
		<div
			className={`item ${
				colorClasses.bg
			} flex-1 h-full overflow-hidden flex justify-center items-center transition-all duration-800 ease ${
				isActive ? "active" : ""
			} ${className}`}
			onClick={onActivate}
		>
			<img src={imgSrc} alt={altText} className="flex-1 object-contain" />
			<div
				className={`copy font-lato font-light leading-[125%] text-[clamp(12px,2.5vw,16px)] ${colorClasses.text}`}
			>
				<h2 className="text-[150%] leading-[125%] font-medium mb-[1vmin]">
					{title}
				</h2>
				<p>{description}</p>
			</div>
		</div>
	);
};

const LightsaberGallery: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const handleActivate = (index: number) => {
		setActiveIndex(index === activeIndex ? null : index);
	};

	return (
		<div className="w-full h-full flex flex-col">
			<main className="flex-1 h-full">
				<div className="gallery-wrap w-full h-full flex flex-row overflow-x-auto">
					{lightsabersData.map((saber, index) => (
						<Lightsaber
							key={index}
							color={saber.color}
							imgSrc={saber.imgSrc}
							altText={saber.altText}
							title={saber.title}
							description={saber.description}
							className={saber.className}
							isActive={activeIndex === index}
							onActivate={() => handleActivate(index)}
						/>
					))}
				</div>
			</main>
		</div>
	);
};

export default LightsaberGallery;
