"use client";

import React, { useRef, useState } from "react";
import "../styles/lightsabers.css";

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
  const panelRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = () => {
    onActivate();
  };

  const handleTouchEnd = () => {
    // No need to remove the active class, it's managed by the parent component
  };

  const colorClasses = colorClassMap[color];

  return (
    <div
      ref={panelRef}
      className={`item ${colorClasses.bg} flex-1 h-full overflow-hidden flex justify-center items-center transition-all duration-800 ease ${isActive ? "active" : ""} ${className}`}
      onTouchStart={handleTouchStart}
      onClick={handleTouchStart}
    >
      <img src={imgSrc} alt={altText} className="flex-1 object-contain" />
      <div className={`copy font-lato font-light leading-[125%] text-[clamp(12px,2.5vw,16px)] ${colorClasses.text}`}>
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

  const lightsabers = [
    {
      color: "red",
      imgSrc: "https://assets.codepen.io/28337/darth-vader.svg",
      altText: "Darth Vader",
      title: "Darth Vader",
      description: "Vader's lightsaber shares similarities with his previous hilt as Anakin Skywalker, but has been customized with a more aggressive design, dual cry
