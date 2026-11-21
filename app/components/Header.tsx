"use client";

import React, { useEffect, useRef, useState } from "react";
import "../styles/header.css";

type Mode = "light" | "dark";
const SABER_COUNT = 12;

const Header: React.FC = () => {
	const [mode, setMode] = useState<Mode>("light");
	const igniteTimer = useRef<number>();

	// Pick up the choice the pre-paint script in layout.tsx already applied.
	useEffect(() => {
		if (document.documentElement.dataset.mode === "dark") setMode("dark");
	}, []);

	const toggle = () => {
		const next: Mode = mode === "light" ? "dark" : "light";
		const root = document.documentElement;
		root.dataset.mode = next;
		try {
			localStorage.setItem("saber-mode", next);
		} catch {}
		window.clearTimeout(igniteTimer.current);
		root.classList.remove("igniting");
		root.style.removeProperty("--ignite-base");
		if (next === "dark" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			void root.offsetWidth; // restart the animation if toggled quickly
			root.classList.add("igniting");
			igniteTimer.current = window.setTimeout(
				() => root.classList.remove("igniting"),
				SABER_COUNT * 90 + 1200
			);
		}
		setMode(next);
	};

	return (
		<header className="header w-full bg-gray-800 text-white flex items-center justify-between px-6 py-2">
			<div className="flex items-baseline gap-3">
				<h1 className="font-cinzel text-lg tracking-[0.15em] uppercase">Lightsaber Gallery</h1>
				<span className="text-xs text-gray-400 font-lato font-light tracking-wide hidden sm:inline">
					An Illustrated Study of Iconic Jedi &amp; Sith Weapons
				</span>
			</div>
			<button
				type="button"
				className="lights-toggle"
				onClick={toggle}
				aria-pressed={mode === "dark"}
				aria-label={mode === "dark" ? "Return to the light side" : "Turn to the dark side"}
				title={mode === "dark" ? "Light side" : "Dark side"}
			>
				<span className="lights-toggle-emblem emblem-jedi" aria-hidden="true" />
				<span className="lights-toggle-emblem emblem-sith" aria-hidden="true" />
				<span className="lights-toggle-knob" aria-hidden="true" />
			</button>
		</header>
	);
};

export default Header;
