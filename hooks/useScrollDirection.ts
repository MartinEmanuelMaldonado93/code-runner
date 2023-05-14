import { useState, useEffect } from 'react';
const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';
type Direction = 'up' | 'down';
type props = { thresholdPixels?: number, initialDirection: Direction, off?: boolean }

export default function useScrollDirection({ initialDirection, thresholdPixels, off }: props) {
	const [scrollDir, setScrollDir] = useState(initialDirection);

	useEffect(() => {
		const threshold = thresholdPixels || 0;
		let lastScrollY = window.scrollY;
		let ticking = false;

		const updateScrollDir = () => {
			const { scrollY } = window;

			if (Math.abs(scrollY - lastScrollY) < threshold) {
				// We haven't exceeded the threshold
				ticking = false;
				return;
			}

			const currentDirection = scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP;

			setScrollDir(currentDirection);
			lastScrollY = scrollY > 0 ? scrollY : 0;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateScrollDir);
				ticking = true;
			}
		};

		/**
		 * Bind the scroll handler if `off` is set to false.
		 * If `off` is set to true reset the scroll direction.
		 */
		!off ? window.addEventListener('scroll', onScroll) : setScrollDir(initialDirection);

		return () => window.removeEventListener('scroll', onScroll);
	}, [initialDirection, thresholdPixels, off]);

	return scrollDir;
}
