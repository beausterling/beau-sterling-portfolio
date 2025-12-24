import { useState, useEffect, useRef, useCallback } from 'react';

interface UseStrudelReturn {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  volume: number;
  play: () => Promise<void>;
  stop: () => void;
  setVolume: (volume: number) => void;
  evaluatePattern: (pattern: string) => Promise<void>;
  strudelReady: boolean;
  analyserNode: AnalyserNode | null;
}

declare global {
  interface Window {
    initStrudel: () => Promise<void>;
    hush: () => void;
    note: any;
    s: any;
    n: any;
    stack: any;
    silence: any;
    setcps: (cps: number) => void;
    getAudioContext: () => AudioContext;
    _strudelAnalyser?: AnalyserNode;
    _strudelMasterGain?: GainNode;
  }
}

// Store original AudioContext constructor
const OriginalAudioContext = typeof window !== 'undefined'
  ? (window.AudioContext || (window as any).webkitAudioContext)
  : null;

// Flag to track if we've patched
let audioContextPatched = false;

// Patch AudioContext to intercept audio for visualization
function patchAudioContext() {
  if (audioContextPatched || !OriginalAudioContext) return;
  audioContextPatched = true;

  (window as any).AudioContext = function(...args: any[]) {
    // Create real context
    const ctx = new OriginalAudioContext(...args);

    // Create analyser chain
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.85;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 1;

    // Connect: masterGain -> analyser -> real destination
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);

    // Store globally so hook can access
    window._strudelAnalyser = analyser;
    window._strudelMasterGain = masterGain;

    // Return proxy that redirects destination to our masterGain
    return new Proxy(ctx, {
      get(target, prop) {
        if (prop === 'destination') {
          return masterGain;
        }
        const value = (target as any)[prop];
        if (typeof value === 'function') {
          return value.bind(target);
        }
        return value;
      }
    });
  };

  // Also patch webkitAudioContext for Safari
  (window as any).webkitAudioContext = (window as any).AudioContext;
}

export const useStrudel = (): UseStrudelReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.5);
  const [strudelReady, setStrudelReady] = useState(false);

  const gainNodeRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const currentPatternRef = useRef<string | null>(null);
  const replanRef = useRef<any>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  // Initialize Strudel
  useEffect(() => {
    const loadStrudel = async () => {
      try {
        setIsLoading(true);

        // Check if Strudel is already loaded
        if (typeof window !== 'undefined' && window.initStrudel) {
          await window.initStrudel();
          // Get analyser from global if available
          if (window._strudelAnalyser) {
            setAnalyserNode(window._strudelAnalyser);
            analyserNodeRef.current = window._strudelAnalyser;
          }
          if (window._strudelMasterGain) {
            gainNodeRef.current = window._strudelMasterGain;
          }
          setStrudelReady(true);
          setIsLoading(false);
          return;
        }

        // CRITICAL: Patch AudioContext BEFORE loading the script
        // This intercepts when superdough creates its AudioContext
        patchAudioContext();

        // Now load Strudel - when it creates AudioContext, it gets our patched version
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@strudel/web@1.0.3';
        script.async = true;

        script.onload = async () => {
          try {
            if (window.initStrudel) {
              // Initialize Strudel
              await window.initStrudel();

              // Get audio context for ref FIRST so it's available for resume calls
              if (window.getAudioContext) {
                audioContextRef.current = window.getAudioContext();
              }

              // Get the analyser and gain from our patched constructor
              if (window._strudelAnalyser) {
                setAnalyserNode(window._strudelAnalyser);
                analyserNodeRef.current = window._strudelAnalyser;
              }
              if (window._strudelMasterGain) {
                gainNodeRef.current = window._strudelMasterGain;
              }

              setStrudelReady(true);
            } else {
              setError('Strudel initialization function not found');
            }
          } catch (err) {
            setError('Failed to initialize Strudel audio');
          }
          setIsLoading(false);
        };

        script.onerror = () => {
          setError('Failed to load Strudel library');
          setIsLoading(false);
        };

        document.body.appendChild(script);
      } catch (err) {
        setError('Failed to initialize Strudel');
        setIsLoading(false);
      }
    };

    loadStrudel();

    return () => {
      // Cleanup on unmount
      if (window.hush) {
        window.hush();
      }
    };
  }, []);

  const play = useCallback(async () => {
    try {
      if (!strudelReady) {
        setError('Strudel not ready yet');
        return;
      }

      if (!currentPatternRef.current) {
        setError('No pattern to play');
        return;
      }

      setError(null);

      // Resume AudioContext if suspended (required by browser autoplay policy)
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Evaluate and play the pattern
      try {
        // Use Function constructor to safely evaluate pattern code
        // The pattern code uses Strudel globals like note(), s(), etc.
        const evalPattern = new Function(`return ${currentPatternRef.current}`);
        const pattern = evalPattern();

        if (pattern && typeof pattern.play === 'function') {
          replanRef.current = pattern.play();
          setIsPlaying(true);
        } else {
          setError('Invalid pattern - must return a playable pattern');
        }
      } catch (evalErr: any) {
        setError(`Pattern syntax error: ${evalErr.message}`);
      }
    } catch (err) {
      setError('Failed to start playback');
      setIsPlaying(false);
    }
  }, [strudelReady]);

  const stop = useCallback(() => {
    try {
      // Use Strudel's hush() to stop all sounds
      if (window.hush) {
        window.hush();
      }

      replanRef.current = null;
      setIsPlaying(false);
      setError(null);
    } catch (err) {
      setError('Failed to stop playback');
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);

    // Apply volume through gain node if available
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = clampedVolume;
    }
  }, []);

  const evaluatePattern = useCallback(async (pattern: string) => {
    try {
      if (!strudelReady) {
        setError('Strudel not ready yet');
        return;
      }

      setError(null);

      // Store the pattern string
      currentPatternRef.current = pattern;

      // If currently playing, restart with new pattern
      if (isPlaying) {
        // Stop current playback
        if (window.hush) {
          window.hush();
        }

        // Resume AudioContext if suspended (required by browser autoplay policy)
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        // Play new pattern
        try {
          const evalPattern = new Function(`return ${pattern}`);
          const newPattern = evalPattern();

          if (newPattern && typeof newPattern.play === 'function') {
            replanRef.current = newPattern.play();
          }
        } catch (evalErr: any) {
          setError(`Pattern syntax error: ${evalErr.message}`);
          setIsPlaying(false);
        }
      }
    } catch (err) {
      setError('Failed to evaluate pattern. Check syntax.');
    }
  }, [strudelReady, isPlaying]);

  return {
    isPlaying,
    isLoading,
    error,
    volume,
    play,
    stop,
    setVolume,
    evaluatePattern,
    strudelReady,
    analyserNode,
  };
};
