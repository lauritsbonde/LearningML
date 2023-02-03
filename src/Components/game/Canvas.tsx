import React from 'react';

interface Props {
	draw: (ctx: any) => void;
	canvasRef: React.MutableRefObject<HTMLCanvasElement>;
}

const Canvas: React.FC<Props> = ({ draw, canvasRef }) => {
	return <canvas ref={canvasRef} style={{ position: 'relative', border: '2px solid black', boxSizing: 'border-box', zIndex: 0 }}></canvas>;
};

export default Canvas;
