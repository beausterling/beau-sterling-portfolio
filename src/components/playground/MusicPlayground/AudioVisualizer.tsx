import { useRef, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    getAudioContext: () => AudioContext;
    getAnalyser: (fftSize?: number) => AnalyserNode;
  }
}

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export const AudioVisualizer = ({ isPlaying }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const isConnectedRef = useRef(false);
  const waveformDataRef = useRef<Uint8Array | null>(null);
  const frequencyDataRef = useRef<Uint8Array | null>(null);
  const isPlayingRef = useRef(isPlaying);

  // Keep isPlayingRef in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Connect to Strudel's audio analyser
  const connectAnalyser = useCallback(() => {
    if (isConnectedRef.current) return;

    try {
      // Use Strudel's built-in getAnalyser function
      // This returns an AnalyserNode that's already connected to the audio output
      const analyser = window.getAnalyser?.(2048);

      if (!analyser) {
        console.log('[Visualizer] getAnalyser not available yet');
        return;
      }

      // Configure the analyser
      analyser.smoothingTimeConstant = 0.8;

      analyserRef.current = analyser;
      waveformDataRef.current = new Uint8Array(analyser.frequencyBinCount);
      frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);
      isConnectedRef.current = true;

      console.log('[Visualizer] Connected to Strudel analyser, frequencyBinCount:', analyser.frequencyBinCount);
    } catch (err) {
      console.error('[Visualizer] Failed to connect:', err);
    }
  }, []);

  // Drawing function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get dimensions
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Resize canvas if needed
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }
    // Always reset transform to avoid cumulative scaling
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const width = rect.width;
    const height = rect.height;
    const centerY = height * 0.35;

    // Clear with dark background
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw center line
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)';
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    const analyser = analyserRef.current;
    const waveformData = waveformDataRef.current;
    const frequencyData = frequencyDataRef.current;
    const playing = isPlayingRef.current;

    if (playing && analyser && waveformData && frequencyData) {
      // Get audio data
      analyser.getByteTimeDomainData(waveformData);
      analyser.getByteFrequencyData(frequencyData);

      // Debug: Check if we're getting real data (not all 128s which means silence)
      const hasWaveformSignal = waveformData.some(v => v !== 128);
      const hasFreqSignal = frequencyData.some(v => v > 0);
      if (!hasWaveformSignal && !hasFreqSignal) {
        // Only log occasionally to avoid spam
        if (Math.random() < 0.01) {
          console.log('[Visualizer] No audio signal detected in data');
        }
      }

      // Draw waveform (top section)
      ctx.save();
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 2.5;
      ctx.beginShape?.() || ctx.beginPath();

      const sliceWidth = width / waveformData.length;
      let x = 0;

      for (let i = 0; i < waveformData.length; i++) {
        const v = (waveformData[i] - 128) / 128;
        const y = centerY + v * (height * 0.25);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();
      ctx.restore();

      // Draw mirrored waveform with lower opacity
      ctx.save();
      ctx.shadowColor = '#00ccff';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = 'rgba(0, 200, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      x = 0;
      for (let i = 0; i < waveformData.length; i++) {
        const v = (waveformData[i] - 128) / 128;
        const y = centerY - v * (height * 0.25);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();
      ctx.restore();

      // Draw frequency bars (bottom section)
      const barCount = 64;
      const barWidth = width / barCount;
      const barSpacing = 2;
      const spectrumY = height * 0.55;
      const spectrumHeight = height * 0.4;

      for (let i = 0; i < barCount; i++) {
        // Map to frequency bins (focus on lower frequencies)
        const freqIndex = Math.floor((i / barCount) * (frequencyData.length * 0.5));
        const amplitude = frequencyData[freqIndex];

        // Bar height based on amplitude
        const barHeight = (amplitude / 255) * spectrumHeight * 0.9 + 2;

        // Color gradient: green to cyan
        const hue = 140 + (i / barCount) * 40;

        ctx.save();
        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
        ctx.shadowBlur = 10;
        ctx.fillStyle = `hsla(${hue}, 80%, 55%, 0.85)`;

        ctx.fillRect(
          i * barWidth + barSpacing / 2,
          spectrumY + spectrumHeight - barHeight,
          barWidth - barSpacing,
          barHeight
        );
        ctx.restore();
      }
    } else {
      // Idle animation
      const time = Date.now() / 1000;
      const pulse = (Math.sin(time * 2) + 1) / 2;

      ctx.save();
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 10 + pulse * 10;
      ctx.strokeStyle = `rgba(0, 255, 136, ${0.3 + pulse * 0.2})`;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const wave = Math.sin((x / width) * Math.PI * 4 + time * 2) * (5 + pulse * 5);
        if (x === 0) {
          ctx.moveTo(x, centerY + wave);
        } else {
          ctx.lineTo(x, centerY + wave);
        }
      }

      ctx.stroke();
      ctx.restore();
    }

    // Continue animation loop
    animationIdRef.current = requestAnimationFrame(draw);
  }, []); // No dependencies - uses refs for all state

  // Effect to connect analyser when playing starts - poll until connected
  useEffect(() => {
    if (!isPlaying) return;

    // If already connected, nothing to do
    if (isConnectedRef.current && analyserRef.current) {
      console.log('[Visualizer] Already connected');
      return;
    }

    // Poll until we can connect
    const interval = setInterval(() => {
      const hasGetAnalyser = typeof window.getAnalyser === 'function';

      console.log('[Visualizer] Polling - getAnalyser available:', hasGetAnalyser, 'connected:', isConnectedRef.current);

      if (hasGetAnalyser && !isConnectedRef.current) {
        connectAnalyser();
        if (isConnectedRef.current) {
          console.log('[Visualizer] Successfully connected, stopping poll');
          clearInterval(interval);
        }
      }
    }, 100);

    // Also try immediately
    connectAnalyser();

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, connectAnalyser]);

  // Start/stop animation loop
  useEffect(() => {
    // Start animation
    animationIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [draw]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (analyserRef.current) {
        try {
          analyserRef.current.disconnect();
        } catch (e) {
          // Ignore disconnect errors
        }
      }
      isConnectedRef.current = false;
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[180px] md:min-h-[300px] rounded-xl overflow-hidden border border-gray-800 bg-[#0a0a0f]">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0"
        style={{ display: 'block' }}
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
