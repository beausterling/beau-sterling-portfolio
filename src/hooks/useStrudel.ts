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
    webaudioOutput: GainNode;
    scope: any;
  }
}

export const useStrudel = (): UseStrudelReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.5);
  const [strudelReady, setStrudelReady] = useState(false);

  const currentPatternRef = useRef<string | null>(null);
  const replanRef = useRef<any>(null);

  // Initialize Strudel
  useEffect(() => {
    const loadStrudel = async () => {
      try {
        setIsLoading(true);

        // Check if Strudel is already loaded
        if (typeof window !== 'undefined' && window.initStrudel) {
          console.log('[Strudel] Already loaded, initializing...');
          await window.initStrudel();
          setStrudelReady(true);
          setIsLoading(false);
          console.log('[Strudel] Ready!');
          return;
        }

        // Load Strudel dynamically
        console.log('[Strudel] Loading from CDN...');
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@strudel/web@1.0.3';
        script.async = true;

        script.onload = async () => {
          try {
            if (window.initStrudel) {
              console.log('[Strudel] Script loaded, initializing...');
              await window.initStrudel();
              setStrudelReady(true);
              console.log('[Strudel] Ready!');
            } else {
              console.error('[Strudel] initStrudel not found after script load');
              setError('Strudel initialization function not found');
            }
          } catch (err) {
            console.error('[Strudel] Init error:', err);
            setError('Failed to initialize Strudel audio');
          }
          setIsLoading(false);
        };

        script.onerror = () => {
          console.error('[Strudel] Failed to load script');
          setError('Failed to load Strudel library');
          setIsLoading(false);
        };

        document.body.appendChild(script);
      } catch (err) {
        console.error('[Strudel] Load error:', err);
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
      // Use window.getAudioContext() directly to get the current context
      const ctx = window.getAudioContext?.();
      console.log('[Strudel] AudioContext state:', ctx?.state);

      if (ctx?.state === 'suspended') {
        console.log('[Strudel] Resuming AudioContext...');
        await ctx.resume();
        console.log('[Strudel] AudioContext resumed:', ctx.state);
      }

      // Evaluate and play the pattern
      try {
        console.log('[Strudel] Evaluating pattern:', currentPatternRef.current.substring(0, 50) + '...');

        // Use Function constructor to safely evaluate pattern code
        // The pattern code uses Strudel globals like note(), s(), etc.
        const evalPattern = new Function(`return ${currentPatternRef.current}`);
        const pattern = evalPattern();

        if (pattern && typeof pattern.play === 'function') {
          console.log('[Strudel] Playing pattern...');
          replanRef.current = pattern.play();
          setIsPlaying(true);
          console.log('[Strudel] Playback started');
        } else {
          console.error('[Strudel] Invalid pattern - no play method');
          setError('Invalid pattern - must return a playable pattern');
        }
      } catch (evalErr: any) {
        console.error('[Strudel] Pattern evaluation error:', evalErr);
        setError(`Pattern syntax error: ${evalErr.message}`);
      }
    } catch (err) {
      console.error('[Strudel] Play error:', err);
      setError('Failed to start playback');
      setIsPlaying(false);
    }
  }, [strudelReady]);

  const stop = useCallback(() => {
    try {
      console.log('[Strudel] Stopping playback...');
      // Use Strudel's hush() to stop all sounds
      if (window.hush) {
        window.hush();
      }

      replanRef.current = null;
      setIsPlaying(false);
      setError(null);
      console.log('[Strudel] Playback stopped');
    } catch (err) {
      console.error('[Strudel] Stop error:', err);
      setError('Failed to stop playback');
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);

    // Apply volume through Strudel's output gain if available
    if (window.webaudioOutput) {
      window.webaudioOutput.gain.value = clampedVolume;
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
        console.log('[Strudel] Switching pattern while playing...');

        // Stop current playback
        if (window.hush) {
          window.hush();
        }

        // Resume AudioContext if suspended
        const ctx = window.getAudioContext?.();
        if (ctx?.state === 'suspended') {
          await ctx.resume();
        }

        // Play new pattern
        try {
          const evalPattern = new Function(`return ${pattern}`);
          const newPattern = evalPattern();

          if (newPattern && typeof newPattern.play === 'function') {
            replanRef.current = newPattern.play();
            console.log('[Strudel] Pattern switched successfully');
          }
        } catch (evalErr: any) {
          console.error('[Strudel] Pattern switch error:', evalErr);
          setError(`Pattern syntax error: ${evalErr.message}`);
          setIsPlaying(false);
        }
      }
    } catch (err) {
      console.error('[Strudel] Evaluate error:', err);
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
  };
};
