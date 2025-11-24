import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
}

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

const CursorPlayground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorStyle, setCursorStyle] = useState<'circle' | 'star' | 'heart' | 'ring' | 'glow' | 'emoji'>('circle');
  const [trailStyle, setTrailStyle] = useState<'none' | 'particles' | 'rainbow' | 'bubbles' | 'snake' | 'firework'>('particles');
  const [clickStyle, setClickStyle] = useState<'ripple' | 'explosion' | 'rings' | 'starburst' | 'confetti' | 'fire'>('ripple');
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Use refs for animation data to avoid state update issues
  const particlesRef = useRef<Particle[]>([]);
  const trailRef = useRef<TrailPoint[]>([]);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B400', '#F06292'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setMousePos(newPos);

      // Add trail point
      if (trailStyle !== 'none') {
        trailRef.current.push({ x: newPos.x, y: newPos.y, opacity: 1 });
        if (trailRef.current.length > 20) {
          trailRef.current.shift();
        }
      }

      // Create trail particles
      if (trailStyle === 'particles' || trailStyle === 'firework') {
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            id: particleIdRef.current++,
            x: newPos.x + (Math.random() - 0.5) * 20,
            y: newPos.y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 0,
            maxLife: 30,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 1,
          });
        }
      }

      if (trailStyle === 'bubbles' && Math.random() > 0.7) {
        particlesRef.current.push({
          id: particleIdRef.current++,
          x: newPos.x,
          y: newPos.y,
          vy: -2,
          life: 0,
          maxLife: 60,
          size: Math.random() * 20 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.6,
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const clickPos = { x: e.clientX, y: e.clientY };

      switch (clickStyle) {
        case 'explosion':
          for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const speed = Math.random() * 5 + 3;
            particlesRef.current.push({
              id: particleIdRef.current++,
              x: clickPos.x,
              y: clickPos.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 0,
              maxLife: 40,
              size: Math.random() * 6 + 3,
              color: colors[Math.floor(Math.random() * colors.length)],
              opacity: 1,
            });
          }
          break;

        case 'confetti':
          for (let i = 0; i < 40; i++) {
            particlesRef.current.push({
              id: particleIdRef.current++,
              x: clickPos.x,
              y: clickPos.y,
              vx: (Math.random() - 0.5) * 10,
              vy: Math.random() * -8 - 2,
              life: 0,
              maxLife: 60,
              size: Math.random() * 8 + 4,
              color: colors[Math.floor(Math.random() * colors.length)],
              opacity: 1,
            });
          }
          break;

        case 'starburst':
          for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            particlesRef.current.push({
              id: particleIdRef.current++,
              x: clickPos.x,
              y: clickPos.y,
              vx: Math.cos(angle) * 8,
              vy: Math.sin(angle) * 8,
              life: 0,
              maxLife: 35,
              size: 12,
              color: colors[Math.floor(Math.random() * colors.length)],
              opacity: 1,
            });
          }
          break;

        case 'fire':
          for (let i = 0; i < 25; i++) {
            particlesRef.current.push({
              id: particleIdRef.current++,
              x: clickPos.x + (Math.random() - 0.5) * 20,
              y: clickPos.y + (Math.random() - 0.5) * 20,
              vx: (Math.random() - 0.5) * 4,
              vy: Math.random() * -6 - 2,
              life: 0,
              maxLife: 40,
              size: Math.random() * 10 + 5,
              color: ['#FF6B00', '#FF8800', '#FFAA00', '#FF0000', '#FFD700'][Math.floor(Math.random() * 5)],
              opacity: 1,
            });
          }
          break;

        case 'ripple':
          for (let i = 0; i < 3; i++) {
            particlesRef.current.push({
              id: particleIdRef.current++,
              x: clickPos.x,
              y: clickPos.y,
              life: i * 10,
              maxLife: 50,
              size: 0,
              color: colors[Math.floor(Math.random() * colors.length)],
              opacity: 1,
            });
          }
          break;

        case 'rings':
          for (let i = 0; i < 5; i++) {
            particlesRef.current.push({
              id: particleIdRef.current++,
              x: clickPos.x,
              y: clickPos.y,
              life: i * 5,
              maxLife: 40,
              size: 0,
              color: colors[Math.floor(Math.random() * colors.length)],
              opacity: 1,
            });
          }
          break;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [trailStyle, clickStyle]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw trail
      if (trailStyle === 'rainbow' || trailStyle === 'snake') {
        trailRef.current.forEach((point, i) => {
          const opacity = (i / trailRef.current.length) * 0.8;
          const size = (i / trailRef.current.length) * 20 + 5;
          const hue = (i / trailRef.current.length) * 360;

          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = trailStyle === 'rainbow'
            ? `hsla(${hue}, 100%, 60%, ${opacity})`
            : `rgba(61, 245, 132, ${opacity})`;
          ctx.fill();
        });
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life++;

        if (particle.vx !== undefined) particle.x += particle.vx;
        if (particle.vy !== undefined) {
          particle.y += particle.vy;
          if (clickStyle === 'confetti' || trailStyle === 'bubbles') {
            particle.vy += 0.2; // Gravity
          }
        }

        const progress = particle.life / particle.maxLife;
        particle.opacity = 1 - progress;

        if (particle.life >= particle.maxLife) return false;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        if (clickStyle === 'ripple' || clickStyle === 'rings') {
          // Expanding ring
          const currentSize = progress * 100;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (clickStyle === 'starburst') {
          // Star shape
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const x = particle.x + Math.cos(angle) * particle.size;
            const y = particle.y + Math.sin(angle) * particle.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Circle particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }

        ctx.restore();
        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [trailStyle, clickStyle]);

  // Render custom cursor
  const renderCursor = () => {
    const baseClass = "pointer-events-none fixed z-50 transition-transform duration-100";
    const style = { left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' };

    switch (cursorStyle) {
      case 'circle':
        return (
          <div className={baseClass} style={style}>
            <div className="w-8 h-8 rounded-full border-4 border-neon bg-neon/20 shadow-lg shadow-neon/50"></div>
          </div>
        );

      case 'star':
        return (
          <div className={baseClass} style={style}>
            <div className="text-4xl animate-spin" style={{ animationDuration: '2s' }}>⭐</div>
          </div>
        );

      case 'heart':
        return (
          <div className={baseClass} style={style}>
            <div className="text-4xl animate-pulse text-pink-500">💖</div>
          </div>
        );

      case 'ring':
        return (
          <div className={baseClass} style={style}>
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-purple-500 animate-ping absolute"></div>
              <div className="w-12 h-12 rounded-full border-4 border-blue-500"></div>
            </div>
          </div>
        );

      case 'glow':
        return (
          <div className={baseClass} style={style}>
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-2xl blur-sm"></div>
            <div className="w-4 h-4 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        );

      case 'emoji':
        return (
          <div className={baseClass} style={style}>
            <div className="text-3xl">🚀</div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden cursor-none">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {renderCursor()}

      {/* Back button */}
      <Link to="/" className="absolute top-4 left-4 z-40 cursor-auto">
        <button className="flex items-center gap-2 px-4 py-2 bg-dark-secondary/80 backdrop-blur-sm text-gray-200 rounded-lg hover:bg-dark-secondary hover:text-neon transition-colors border border-gray-700 cursor-pointer">
          <ArrowLeft size={20} />
          Back Home
        </button>
      </Link>

      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 text-center cursor-auto">
        <h1 className="text-4xl font-bold text-neon text-glow mb-2">Cursor Playground</h1>
        <p className="text-gray-400">Move your mouse and click to interact!</p>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-dark-secondary/90 backdrop-blur-md p-6 rounded-lg border border-gray-700 max-w-4xl w-full mx-4 cursor-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cursor Style */}
          <div>
            <h3 className="text-neon font-semibold mb-3 text-sm">Cursor Style</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['circle', 'star', 'heart', 'ring', 'glow', 'emoji'] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setCursorStyle(style)}
                  className={`px-3 py-2 rounded text-xs transition-all cursor-pointer ${
                    cursorStyle === style
                      ? 'bg-neon text-dark font-semibold'
                      : 'bg-dark text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Trail Style */}
          <div>
            <h3 className="text-neon font-semibold mb-3 text-sm">Movement Trail</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['none', 'particles', 'rainbow', 'bubbles', 'snake', 'firework'] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setTrailStyle(style)}
                  className={`px-3 py-2 rounded text-xs transition-all cursor-pointer ${
                    trailStyle === style
                      ? 'bg-neon text-dark font-semibold'
                      : 'bg-dark text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Click Effect */}
          <div>
            <h3 className="text-neon font-semibold mb-3 text-sm">Click Effect</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['ripple', 'explosion', 'rings', 'starburst', 'confetti', 'fire'] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setClickStyle(style)}
                  className={`px-3 py-2 rounded text-xs transition-all cursor-pointer ${
                    clickStyle === style
                      ? 'bg-neon text-dark font-semibold'
                      : 'bg-dark text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursorPlayground;
