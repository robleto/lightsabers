"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/lightsabers/position.css";
import "../styles/lightsabers/mobile.css";
import "../styles/lightsabers/color.css";
import "../styles/lightsabers/outliers.css";
import "../styles/lights.css";
import lightsabersData from "../data/lightsabers.json";
import SaberArt, { GlowFilters, artRatio } from "./SaberArt";

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
	index: number;
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
	index,
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
			style={{ "--i": index } as React.CSSProperties}
			onClick={onActivate}
		>
			<span className="night" aria-hidden="true" />
			<SaberArt
				src={imgSrc}
				className="saber-art"
				style={{ aspectRatio: `auto ${artRatio(imgSrc)}`, "--i": index } as React.CSSProperties}
			/>
			<span className="sr-only">{altText}</span>
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

type IntroPhase = "title" | "fly" | "done";

// Intro timeline (ms from page load).
const FLY_AT = 1900;
const FLY_STAGGER = 55;

const LightsaberGallery: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [phase, setPhase] = useState<IntroPhase>("title");
	const timers = useRef<number[]>([]);

	const finishIntro = useCallback(() => {
		timers.current.forEach((t) => window.clearTimeout(t));
		timers.current = [];
		setPhase("done");
	}, []);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setPhase("done");
			return;
		}
		const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
		const root = document.documentElement;

		at(FLY_AT, () => {
			setPhase("fly");
			// With the lights off, the blades ignite as each saber lands.
			if (root.dataset.mode === "dark") {
				root.style.setProperty("--ignite-base", "850ms");
				root.classList.add("igniting");
				at(lightsabersData.length * 90 + 2200, () => {
					root.classList.remove("igniting");
					root.style.removeProperty("--ignite-base");
				});
			}
		});

		const flyEnd = FLY_AT + 1100 + (lightsabersData.length - 1) * FLY_STAGGER;
		at(flyEnd + 100, () => setPhase("done"));

		const skip = () => finishIntro();
		window.addEventListener("keydown", skip, { once: true });
		window.addEventListener("pointerdown", skip, { once: true });
		return () => {
			timers.current.forEach((t) => window.clearTimeout(t));
			window.removeEventListener("keydown", skip);
			window.removeEventListener("pointerdown", skip);
		};
	}, [finishIntro]);

	const handleActivate = (index: number) => {
		setActiveIndex(index === activeIndex ? null : index);
	};

	return (
		<div className={`w-full h-full flex-1 flex flex-col relative intro-${phase} ${phase !== "title" ? "intro-flown" : ""}`}>
			<GlowFilters />
			{phase !== "done" && (
				<div className="intro-overlay" aria-hidden={phase !== "title"}>
					<h2 className="intro-headline font-cinzel">
						<span className="w" style={{ "--w": 0 } as React.CSSProperties}>An</span>{" "}
						<span className="w" style={{ "--w": 1 } as React.CSSProperties}>elegant</span>{" "}
						<span className="w" style={{ "--w": 2 } as React.CSSProperties}>weapon</span>
						<br />
						<span className="w" style={{ "--w": 3 } as React.CSSProperties}>for</span>{" "}
						<span className="w" style={{ "--w": 4 } as React.CSSProperties}>a</span>{" "}
						<span className="w" style={{ "--w": 5 } as React.CSSProperties}>more</span>{" "}
						<span className="w" style={{ "--w": 6 } as React.CSSProperties}>civilized</span>{" "}
						<span className="w" style={{ "--w": 7 } as React.CSSProperties}>age.</span>
					</h2>
				</div>
			)}
			<div className="gallery-wrap w-full h-full flex flex-row overflow-x-auto">
				{lightsabersData.map((saber, index) => (
					<Lightsaber
						key={index}
						index={index}
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
			{activeIndex === null && phase === "done" && (
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
