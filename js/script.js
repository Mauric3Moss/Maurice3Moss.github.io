const root = document.documentElement;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!prefersReducedMotion.matches) {
	window.addEventListener("pointermove", (event) => {
		const x = (event.clientX / window.innerWidth) * 100;
		const y = (event.clientY / window.innerHeight) * 100;

		root.style.setProperty("--pointer-x", `${x}%`);
		root.style.setProperty("--pointer-y", `${y}%`);
		root.style.setProperty("--cursor-glow-x", `${event.clientX}px`);
		root.style.setProperty("--cursor-glow-y", `${event.clientY}px`);
	});
}

document.querySelectorAll("a[href^='#']").forEach((link) => {
	link.addEventListener("click", (event) => {
		const targetId = link.getAttribute("href").slice(1);
		const target = document.getElementById(targetId);

		if (!target) {
			return;
		}

		event.preventDefault();
		target.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
	});
});
