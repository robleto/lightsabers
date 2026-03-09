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
	subtitle: string;
	description: string;
	designNotes: string;
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
	subtitle,
	description,
	designNotes,
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
				<h2 className="font-cinzel text-[150%] leading-[120%] font-normal tracking-[0.08em] uppercase mb-[0.3vmin]">
					{title}
				</h2>
				<p className="text-[75%] opacity-70 tracking-wide mb-[1.5vmin]">
					{subtitle}
				</p>
				<p className="mb-[1.5vmin]">{description}</p>
				<p className="text-[85%] opacity-60 italic leading-[140%] border-t border-white/20 pt-[1vmin]">
					{designNotes}
				</p>
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
		<div className="w-full h-full flex-1 flex flex-col relative">
			<div className="gallery-wrap w-full h-full flex flex-row overflow-x-auto">
				{lightsabersData.map((saber, index) => (
					<Lightsaber
						key={index}
						color={saber.color}
						imgSrc={saber.imgSrc}
						altText={saber.altText}
						title={saber.title}
						subtitle={saber.subtitle}
						description={saber.description}
						designNotes={saber.designNotes}
						className={saber.className}
						isActive={activeIndex === index}
						onActivate={() => handleActivate(index)}
					/>
				))}
			</div>
			{activeIndex === null && (
				<div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
					<span className="text-white/40 text-xs font-lato tracking-widest uppercase animate-pulse">
						Hover to explore
					</span>
				</div>
			)}
		</div>
	);
};

export default LightsaberGallery;
