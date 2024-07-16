"use client";

import React from "react";
import "../styles/header.css";

const Header: React.FC = () => {
	return (
		<header className="header w-full bg-gray-800 text-white flex items-center px-4 py-2">
			<h1 className="text-lg font-bold">Lightsaber Gallery</h1>
		</header>
	);
};

export default Header;
