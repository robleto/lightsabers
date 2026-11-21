import React from "react";
import saberArt from "../data/saberArt.json";

type ArtEntry = { width: number; height: number; inner: string };
const art = saberArt as Record<string, ArtEntry>;

interface SaberArtProps {
	src: string;
	className?: string;
	style?: React.CSSProperties;
	/** Where the drawing sits inside its box, as an SVG preserveAspectRatio value. */
	align?: string;
}

/**
 * Renders a saber illustration inline (rather than as an <img>) so CSS can
 * reach the blade shapes for the ignite animation and the lights-off glow.
 */
const SaberArt: React.FC<SaberArtProps> = ({ src, className, style, align = "xMidYMax meet" }) => {
	const entry = art[src];
	if (!entry) return null;
	return (
		<svg
			className={className}
			style={style}
			viewBox={`0 0 ${entry.width} ${entry.height}`}
			preserveAspectRatio={align}
			aria-hidden="true"
			focusable="false"
			dangerouslySetInnerHTML={{ __html: entry.inner }}
		/>
	);
};

export const artRatio = (src: string) => {
	const entry = art[src];
	return entry ? entry.width / entry.height : 0.07;
};

const GLOWS: Record<string, string> = {
	red: "#ff2b2b",
	blue: "#2f9bff",
	green: "#43f25a",
	purple: "#b24bff",
	yellow: "#ffd21f",
};

/**
 * One shared set of glow filters for every inlined saber. Blur sizes are in
 * the drawings' own units, so the glow scales with the saber.
 */
export const GlowFilters: React.FC = () => (
	<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
		<defs>
			{Object.entries(GLOWS).flatMap(([name, color]) =>
				[false, true].map((horizontal) => (
					<filter
						key={`${name}${horizontal ? "-h" : ""}`}
						id={`glow-${name}${horizontal ? "-h" : ""}`}
						x={horizontal ? "-70%" : "-450%"}
						y={horizontal ? "-450%" : "-14%"}
						width={horizontal ? "240%" : "1000%"}
						height={horizontal ? "1000%" : "128%"}
						colorInterpolationFilters="sRGB"
					>
						<feGaussianBlur in="SourceAlpha" stdDeviation="12" result="near" />
						<feGaussianBlur in="SourceAlpha" stdDeviation="48" result="far" />
						<feFlood floodColor={color} result="c" />
						<feComposite in="c" in2="near" operator="in" result="nearGlow" />
						<feComposite in="c" in2="far" operator="in" result="farGlow" />
						<feMerge>
							<feMergeNode in="farGlow" />
							<feMergeNode in="farGlow" />
							<feMergeNode in="nearGlow" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				))
			)}
		</defs>
	</svg>
);

export default SaberArt;
