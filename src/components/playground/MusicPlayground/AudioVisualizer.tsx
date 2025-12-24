import { useRef, useEffect } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export const AudioVisualizer = ({ isPlaying }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  // Draw idle animation when not playing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resize
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const centerY = height / 2;

      // Clear canvas with dark background
      ctx.fillStyle = 'rgba(10, 10, 15, 1)';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Draw center line
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)';
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Idle state - draw flat line with subtle pulse
      const time = Date.now() / 1000;
      const pulse = Math.sin(time * 2) * 0.5 + 0.5;

      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 10 + pulse * 10;
      ctx.strokeStyle = `rgba(0, 255, 136, ${0.3 + pulse * 0.2})`;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(0, centerY);

      // Draw subtle wave
      for (let x = 0; x < width; x++) {
        const wave = Math.sin((x / width) * Math.PI * 4 + time * 2) * (5 + pulse * 5);
        ctx.lineTo(x, centerY + wave);
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      // Continue animation loop
      animationIdRef.current = requestAnimationFrame(draw);
    };

    // Start animation
    animationIdRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden border border-gray-800 bg-[#0a0a0f]">
      {/* Canvas for idle animation */}
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0"
        style={{ display: isPlaying ? 'none' : 'block' }}
      />

      {/* Container for Strudel's scope - it will inject canvas here */}
      <div
        id="strudel-scope"
        className="w-full h-full absolute inset-0"
        style={{ display: isPlaying ? 'block' : 'none' }}
      />

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/20" />

      {/* Corner glow accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-neon/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-neon/5 blur-3xl pointer-events-none" />

      {/* Status indicator */}
      {isPlaying && (
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
          <span className="text-xs text-neon/70">Playing</span>
        </div>
      )}
    </div>
  );
};
