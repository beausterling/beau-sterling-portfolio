import { useRef, useEffect, useCallback } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  analyserNode: AnalyserNode | null;
}

export const AudioVisualizer = ({ isPlaying, analyserNode }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
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

    if (analyserNode && dataArrayRef.current && isPlaying) {
      // Get waveform data
      analyserNode.getByteTimeDomainData(dataArrayRef.current);
      const dataArray = dataArrayRef.current;
      const bufferLength = dataArray.length;

      // Draw glow effect (larger, more diffuse)
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 20;
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw main waveform
      ctx.beginPath();
      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0; // normalize to 0-2 range
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();

      // Draw reflection (mirrored, faded)
      ctx.shadowBlur = 10;
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const originalY = (v * height) / 2;
        const reflectedY = height - originalY; // mirror around center

        if (i === 0) {
          ctx.moveTo(x, reflectedY);
        } else {
          ctx.lineTo(x, reflectedY);
        }
        x += sliceWidth;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
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
    }

    // Continue animation loop
    animationIdRef.current = requestAnimationFrame(draw);
  }, [analyserNode, isPlaying]);

  // Setup canvas and data array
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle resize
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Setup analyser data array
  useEffect(() => {
    if (analyserNode) {
      dataArrayRef.current = new Uint8Array(analyserNode.frequencyBinCount);
    }
  }, [analyserNode]);

  // Start/stop animation
  useEffect(() => {
    // Always run the animation for idle state too
    animationIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [draw]);

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden border border-gray-800 bg-[#0a0a0f]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      {/* Corner glow accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-neon/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-neon/5 blur-3xl pointer-events-none" />
    </div>
  );
};
