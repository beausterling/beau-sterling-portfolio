import { useState, useEffect } from 'react';
import { PresetSelector } from './PresetSelector';
import { PlaybackControls } from './PlaybackControls';
import { HelpPanel } from './HelpPanel';
import { useStrudel } from '@/hooks/useStrudel';
import { musicPresets, MusicPreset } from '@/lib/music-presets';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';

export const MusicPlayground = () => {
  const { isPlaying, isLoading, error, volume, play, stop, setVolume, evaluatePattern, strudelReady } =
    useStrudel();

  const [currentPattern, setCurrentPattern] = useState(musicPresets[0].pattern);
  const [selectedPreset, setSelectedPreset] = useState<MusicPreset>(musicPresets[0]);
  const [hasChanges, setHasChanges] = useState(false);

  // Load pattern from localStorage on mount
  useEffect(() => {
    const savedPattern = localStorage.getItem('strudel-pattern');
    const savedPresetId = localStorage.getItem('strudel-preset-id');

    if (savedPattern) {
      setCurrentPattern(savedPattern);
      setHasChanges(true);
    }

    if (savedPresetId) {
      const preset = musicPresets.find((p) => p.id === savedPresetId);
      if (preset) {
        setSelectedPreset(preset);
      }
    }
  }, []);

  // Save pattern to localStorage when it changes
  useEffect(() => {
    if (hasChanges) {
      localStorage.setItem('strudel-pattern', currentPattern);
      localStorage.setItem('strudel-preset-id', selectedPreset.id);
    }
  }, [currentPattern, selectedPreset.id, hasChanges]);

  const handlePresetSelect = (preset: MusicPreset) => {
    setSelectedPreset(preset);
    setCurrentPattern(preset.pattern);
    setHasChanges(false);

    // Stop current playback when changing presets
    if (isPlaying) {
      stop();
    }
  };

  const handlePatternChange = (newPattern: string) => {
    setCurrentPattern(newPattern);
    setHasChanges(true);
  };

  const handleResetToPreset = () => {
    setCurrentPattern(selectedPreset.pattern);
    setHasChanges(false);
  };

  const handleUpdatePattern = async () => {
    await evaluatePattern(currentPattern);
  };

  return (
    <div className="h-full w-full space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">
          Music <span className="text-neon text-glow">Lab</span>
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
          Create algorithmic music with code. Edit the pattern below and hear it change in real-time.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="animate-spin h-8 w-8 border-4 border-neon border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400">Loading Strudel...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-400">Error</h4>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* Playback Controls */}
          <PlaybackControls
            isPlaying={isPlaying}
            volume={volume}
            onPlay={play}
            onStop={stop}
            onVolumeChange={setVolume}
            disabled={!strudelReady}
          />

          {/* Preset Selector */}
          <PresetSelector
            presets={musicPresets}
            selectedPresetId={selectedPreset.id}
            onSelectPreset={handlePresetSelect}
          />

          {/* Code Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neon">Pattern Editor</h3>
              <div className="flex gap-2">
                {hasChanges && (
                  <Button
                    onClick={handleResetToPreset}
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-700 text-gray-400 hover:text-gray-200"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reset to Preset
                  </Button>
                )}
                <Button
                  onClick={handleUpdatePattern}
                  size="sm"
                  className="text-xs bg-neon/20 hover:bg-neon/30 text-neon border border-neon/50"
                >
                  Update Pattern
                </Button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={currentPattern}
                onChange={(e) => handlePatternChange(e.target.value)}
                className="w-full h-64 md:h-80 p-4 bg-black/50 border border-gray-700 rounded-lg font-mono text-sm text-gray-300 focus:border-neon focus:outline-none resize-none"
                placeholder="Enter your Strudel pattern here..."
                spellCheck={false}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                Lines: {currentPattern.split('\n').length}
              </div>
            </div>

            {/* Pattern Info */}
            <div className="bg-dark-secondary/30 rounded-lg p-3 border border-gray-800">
              <p className="text-xs text-gray-400">
                <span className="text-neon font-semibold">Tip:</span> Patterns update automatically when you click
                "Update Pattern". Press Play to hear your creation!
              </p>
            </div>
          </div>

          {/* Visualizer Placeholder */}
          <div className="bg-dark-secondary/30 rounded-lg border border-gray-700 p-8 min-h-[200px] flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-gray-500">
                {isPlaying ? (
                  <>
                    <div className="h-8 w-2 bg-neon animate-pulse"></div>
                    <div className="h-12 w-2 bg-neon/70 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-10 w-2 bg-neon/80 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-14 w-2 bg-neon animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="h-8 w-2 bg-neon/60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </>
                ) : (
                  <p className="text-gray-500">Visualizer will appear when playing</p>
                )}
              </div>
            </div>
          </div>

          {/* Help Panel */}
          <HelpPanel />
        </>
      )}
    </div>
  );
};
