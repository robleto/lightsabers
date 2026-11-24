// Reads the saber SVGs in public/images and writes app/data/saberArt.json:
// the inner markup of each SVG, ready to inline, with every blade shape tagged
// so CSS can ignite and glow it. Re-run after adding or changing a saber SVG:
//   node scripts/annotate-sabers.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sabers = JSON.parse(readFileSync(join(root, "app/data/lightsabers.json"), "utf8"));

// Blade fills used in the illustrations, mapped to the site's color names.
const BLADE_FILLS = {
	"#FF3434": "red",
	"#519EBF": "blue",
	"#88DA68": "green",
	"#C24CF5": "purple",
	"#FCDB00": "yellow",
};
// Some drawings fill the blade with a radial gradient and carry its color in the stroke.
const STROKE_COLORS = {
	"#D75151": "red",
	"#55B0D2": "blue",
	"#BC48C6": "purple",
	"#D6D949": "yellow",
	"#7AFA87": "green",
};
// The darksaber is drawn as a solid near-black blade; it has no glow color.
BLADE_FILLS["#040405"] = "black";
const MIN_BLADE_LENGTH = 250; // ignore small accent shapes that share a blade color

// Bounding box of an absolute-command path (the Figma export uses M L H V C Z).
function pathBox(d) {
	const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g);
	const xs = [], ys = [];
	let cmd = "", i = 0, x = 0, y = 0;
	const num = () => parseFloat(tokens[i++]);
	while (i < tokens.length) {
		if (/[a-zA-Z]/.test(tokens[i])) cmd = tokens[i++];
		if (cmd === "Z" || cmd === "z") continue;
		if (cmd === "H") x = num();
		else if (cmd === "V") y = num();
		else if (cmd === "C") { xs.push(num()); ys.push(num()); xs.push(num()); ys.push(num()); x = num(); y = num(); }
		else if (cmd === "S" || cmd === "Q") { xs.push(num()); ys.push(num()); x = num(); y = num(); }
		else if (cmd === "M" || cmd === "L" || cmd === "T") { x = num(); y = num(); }
		else throw new Error(`Unsupported path command ${cmd}`);
		xs.push(x); ys.push(y);
	}
	return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
}

const out = {};
for (const saber of sabers) {
	const file = join(root, "public", saber.imgSrc);
	const svg = readFileSync(file, "utf8");
	const [, w, h] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
	const W = +w, H = +h;
	const prefix = saber.imgSrc.replace(/^.*\//, "").replace(/\.svg$/, "").replace(/[^a-z0-9]/gi, "");
	let inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").trim();

	// Namespace ids so several inlined SVGs can share one page.
	inner = inner
		.replace(/id="([^"]+)"/g, `id="${prefix}-$1"`)
		.replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
		.replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`);

	let blades = 0;
	// The emitter is the blade end nearest the middle of the drawing.
	const tagBlade = (d, color) => {
		const b = pathBox(d);
		const bw = b.x1 - b.x0, bh = b.y1 - b.y0;
		if (Math.max(bw, bh) < MIN_BLADE_LENGTH) return null;
		let dir;
		if (bh >= bw) dir = (b.y0 + b.y1) / 2 < H / 2 ? "up" : "down";
		else dir = (b.x0 + b.x1) / 2 < W / 2 ? "left" : "right";
		blades++;
		return `class="blade blade-${dir}" data-glow="${color}${bh >= bw ? "" : "-h"}"`;
	};

	// Gradient-filled blades: the color lives in the stroke.
	inner = inner.replace(/<path d="([^"]+)"([^>]*?)fill="url\(#([^)]+)\)"([^>]*?)stroke="(#[0-9A-F]{6})"/gi, (m, d, rest, grad, rest2, stroke) => {
		const color = STROKE_COLORS[stroke.toUpperCase()];
		const attrs = color && tagBlade(d, color);
		if (!attrs) return m;
		return `<path ${attrs} d="${d}"${rest}fill="url(#${grad})"${rest2}stroke="${stroke}"`;
	});

	// Solid-filled blades: the color lives in the fill.
	inner = inner.replace(/<path d="([^"]+)"([^>]*?)fill="(#[0-9A-F]{6})"/gi, (m, d, rest, fill) => {
		const color = BLADE_FILLS[fill.toUpperCase()];
		const attrs = color && tagBlade(d, color);
		if (!attrs) return m;
		return `<path ${attrs} d="${d}"${rest}fill="${fill}"`;
	});
	if (!blades) throw new Error(`No blade found in ${saber.imgSrc}`);
	out[saber.imgSrc] = { width: W, height: H, inner };
}

writeFileSync(join(root, "app/data/saberArt.json"), JSON.stringify(out, null, "\t") + "\n");
console.log(`Annotated ${Object.keys(out).length} sabers`);
