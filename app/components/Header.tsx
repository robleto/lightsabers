"use client";

import React from "react";
import "../styles/header.css";

const Header: React.FC = () => {
	return (
		<header className="header w-full bg-gray-800 text-white flex items-center justify-between px-6 py-2">
			<div className="flex items-baseline gap-3">
				<h1 className="font-cinzel text-lg tracking-[0.15em] uppercase">Lightsaber Gallery</h1>
				<span className="text-xs text-gray-400 font-lato font-light tracking-wide hidden sm:inline">
					An Illustrated Study of Iconic Jedi &amp; Sith Weapons
				</span>
			</div>
		</header>
	);
};

export default Header;
