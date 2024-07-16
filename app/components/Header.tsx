import React from "react";
import "../styles/header.css";

const Header: React.FC = () => {
	return (
		<header className="header w-full font-lato bg-gray-800 text-white flex items-center px-4 py-2">
			<h1 className="text-lg font-medium">Lightsaber Gallery</h1>
		</header>
	);
};

export default Header;
