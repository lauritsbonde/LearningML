import { useRef, useEffect } from 'react';

const useCanvas = (draw: (ctx: any) => void) => {
	const canvasRef = useRef({} as HTMLCanvasElement);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		canvas.width = Math.min(window.innerWidth * 0.4, 1000);
		canvas.height = Math.min(window.innerHeight * 0.5, 1000);

		const render = () => {
			draw(ctx);
		};

		const interval = setInterval(() => {
			render();
		}, 1000 / 30);

		render();

		return () => {
			clearInterval(interval);
		};
	}, [draw]);

	return canvasRef;
};

export default useCanvas;
