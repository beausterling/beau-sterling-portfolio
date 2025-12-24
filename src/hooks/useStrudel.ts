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
    strudel: any;
    initStrudel: any;
  }
}

export const useStrudel = (): UseStrudelReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.5);
  const [strudelReady, setStrudelReady] = useState(false);

  const audioContextRef = useRef<any>(null);
  const currentPatternRef = useRef<any>(null);

  // Initialize Strudel
  useEffect(() => {
    const initStrudel = async () => {
      try {
        setIsLoading(true);

        // Check if Strudel is loaded
        if (typeof window !== 'undefined' && window.strudel) {
          setStrudelReady(true);
          setIsLoading(false);
          return;
        }

        // Load Strudel dynamically
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@strudel.cycles/embed@0.4.0';
        script.async = true;

        script.onload = () => {
          setStrudelReady(true);
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

    initStrudel();

    return () => {
      // Cleanup
      stop();
    };
  }, []);

  const play = useCallback(async () => {
    try {
      if (!strudelReady) {
        setError('Strudel not ready yet');
        return;
      }

      setError(null);
      setIsPlaying(true);

      // If there's a current pattern, start it
      if (currentPatternRef.current) {
        // Strudel specific play logic will go here
        console.log('Playing pattern');
      }
    } catch (err) {
      setError('Failed to start playback');
      setIsPlaying(false);
    }
  }, [strudelReady]);

  const stop = useCallback(() => {
    try {
      setIsPlaying(false);

      // Stop current pattern
      if (currentPatternRef.current) {
        console.log('Stopping pattern');
        currentPatternRef.current = null;
      }
    } catch (err) {
      setError('Failed to stop playback');
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);

    // Apply volume to audio context if available
    if (audioContextRef.current) {
      // Strudel volume control will go here
      console.log('Setting volume:', clampedVolume);
    }
  }, []);

  const evaluatePattern = useCallback(async (pattern: string) => {
    try {
      if (!strudelReady) {
        setError('Strudel not ready yet');
        return;
      }

      setError(null);

      // Store the pattern
      currentPatternRef.current = pattern;

      console.log('Evaluating pattern:', pattern);

      // If playing, the pattern will be evaluated
      // Actual Strudel evaluation will happen here
    } catch (err) {
      setError('Failed to evaluate pattern. Check syntax.');
    }
  }, [strudelReady]);

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
