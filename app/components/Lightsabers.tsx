import React from "react";
import "../styles/lightsabers.css";

interface LightsaberProps {
	color: string;
	imgSrc: string;
	altText: string;
	title: string;
	description: string;
	className?: string;
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
}) => {
	const colorClasses = colorClassMap[color];

	return (
		<div
			className={`item ${colorClasses.bg} flex-1 h-full overflow-hidden flex justify-center items-center transition-all duration-800 ease ${className}`}
		>
			<img
				src={imgSrc}
				alt={altText}
				className="flex-1 max-h-[66vmin] object-contain"
			/>
			<div
				className={`copy hidden font-lato font-light leading-[125%] text-[clamp(12px,2.5vw,16px)] ${colorClasses.text}`}
			>
				<h2 className="text-[150%] leading-[125%] font-medium mb-[1vmin]">
					{title}
				</h2>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default Lightsaber;
