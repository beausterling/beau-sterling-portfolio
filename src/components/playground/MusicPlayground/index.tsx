import { useState, useEffect } from 'react';
import { BaseTrackSelector } from './PresetSelector';
import { PlaybackControls } from './PlaybackControls';
import { HelpPanel } from './HelpPanel';
import { AudioVisualizer } from './AudioVisualizer';
import { useStrudel } from '@/hooks/useStrudel';
import { musicPresets, MusicPreset } from '@/lib/music-presets';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle, ChevronDown, ChevronUp, Code, Music } from 'lucide-react';

export const MusicPlayground = () => {
  const { isPlaying, isLoading, error, volume, play, stop, setVolume, evaluatePattern, strudelReady } =
    useStrudel();

  const [currentPattern, setCurrentPattern] = useState(musicPresets[0].pattern);
  const [selectedTrack, setSelectedTrack] = useState<MusicPreset>(musicPresets[0]);
  const [hasChanges, setHasChanges] = useState(false);
  const [showTracksOnMobile, setShowTracksOnMobile] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  // Load pattern from localStorage on mount
  useEffect(() => {
    const savedPattern = localStorage.getItem('strudel-pattern');
    const savedTrackId = localStorage.getItem('strudel-preset-id');

    if (savedPattern) {
      setCurrentPattern(savedPattern);
      setHasChanges(true);
    }

    if (savedTrackId) {
      const track = musicPresets.find((p) => p.id === savedTrackId);
      if (track) {
        setSelectedTrack(track);
      }
    }
  }, []);

  // Save pattern to localStorage when it changes
  useEffect(() => {
    if (hasChanges) {
      localStorage.setItem('strudel-pattern', currentPattern);
      localStorage.setItem('strudel-preset-id', selectedTrack.id);
    }
  }, [currentPattern, selectedTrack.id, hasChanges]);

  // Evaluate pattern when Strudel is ready or pattern changes
  useEffect(() => {
    if (strudelReady && currentPattern) {
      evaluatePattern(currentPattern);
    }
  }, [strudelReady, currentPattern, evaluatePattern]);

  const handleTrackSelect = (track: MusicPreset) => {
    setSelectedTrack(track);
    setCurrentPattern(track.pattern);
    setHasChanges(false);
    // Don't stop - let evaluatePattern handle seamless switching
    // The useEffect above will call evaluatePattern with the new pattern
  };

  const handlePatternChange = (newPattern: string) => {
    setCurrentPattern(newPattern);
    setHasChanges(true);
  };

  const handleResetToTrack = () => {
    setCurrentPattern(selectedTrack.pattern);
    setHasChanges(false);
  };

  const handleUpdatePattern = async () => {
    await evaluatePattern(currentPattern);
  };

  return (
    <div className="h-full w-full flex flex-col p-4 md:p-6 gap-4">
      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">
          Music <span className="text-neon text-glow">Lab</span>
        </h2>
        <p className="text-xs md:text-sm text-gray-500 hidden md:block">
          Algorithmic music with code
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
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
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-3">
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* HERO: Large Visualizer - Strudel's scope renders here */}
          <div className="flex-1 min-h-[250px] md:min-h-[350px]">
            <AudioVisualizer isPlaying={isPlaying} />
          </div>

          {/* Playback Controls - Centered below visualizer */}
          <div className="flex justify-center">
            <PlaybackControls
              isPlaying={isPlaying}
              volume={volume}
              onPlay={play}
              onStop={stop}
              onVolumeChange={setVolume}
              disabled={!strudelReady}
            />
          </div>

          {/* Desktop: Side-by-side layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-4">
            {/* Base Tracks - Left side (1/3 width) */}
            <div className="border border-gray-800 rounded-lg p-4 bg-dark-secondary/20">
              <div className="flex items-center gap-2 mb-4">
                <Music className="h-4 w-4 text-neon" />
                <h3 className="text-sm font-semibold">Base Tracks</h3>
              </div>
              <BaseTrackSelector
                tracks={musicPresets}
                selectedTrackId={selectedTrack.id}
                onSelectTrack={handleTrackSelect}
                compact
              />
            </div>

            {/* Pattern Editor - Right side (2/3 width) */}
            <div className="md:col-span-2 border border-gray-800 rounded-lg p-4 bg-dark-secondary/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-neon" />
                  <h3 className="text-sm font-semibold">Pattern Editor</h3>
                  {hasChanges && (
                    <span className="text-xs text-yellow-500">(modified)</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {hasChanges && (
                    <Button
                      onClick={handleResetToTrack}
                      variant="outline"
                      size="sm"
                      className="text-xs border-gray-700 text-gray-400 hover:text-gray-200"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Reset
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
                  className="w-full h-48 p-4 bg-black/50 border border-gray-700 rounded-lg font-mono text-sm text-gray-300 focus:border-neon focus:outline-none resize-none"
                  placeholder="Enter your Strudel pattern here..."
                  spellCheck={false}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  Lines: {currentPattern.split('\n').length}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Collapsible Sections */}
          <div className="md:hidden space-y-2">
            {/* Base Tracks Section */}
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowTracksOnMobile(!showTracksOnMobile)}
                className="w-full flex items-center justify-between p-3 bg-dark-secondary/30 hover:bg-dark-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-neon" />
                  <span className="text-sm font-medium">Base Tracks</span>
                  <span className="text-xs text-gray-500">({selectedTrack.name})</span>
                </div>
                {showTracksOnMobile ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>
              {showTracksOnMobile && (
                <div className="p-3 border-t border-gray-800">
                  <BaseTrackSelector
                    tracks={musicPresets}
                    selectedTrackId={selectedTrack.id}
                    onSelectTrack={handleTrackSelect}
                  />
                </div>
              )}
            </div>

            {/* Code Editor Section */}
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="w-full flex items-center justify-between p-3 bg-dark-secondary/30 hover:bg-dark-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-neon" />
                  <span className="text-sm font-medium">Pattern Editor</span>
                  {hasChanges && (
                    <span className="text-xs text-yellow-500">(modified)</span>
                  )}
                </div>
                {showEditor ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>
              {showEditor && (
                <div className="p-3 border-t border-gray-800 space-y-3">
                  <div className="flex items-center justify-end gap-2">
                    {hasChanges && (
                      <Button
                        onClick={handleResetToTrack}
                        variant="outline"
                        size="sm"
                        className="text-xs border-gray-700 text-gray-400 hover:text-gray-200"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Reset
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

                  <div className="relative">
                    <textarea
                      value={currentPattern}
                      onChange={(e) => handlePatternChange(e.target.value)}
                      className="w-full h-48 p-4 bg-black/50 border border-gray-700 rounded-lg font-mono text-sm text-gray-300 focus:border-neon focus:outline-none resize-none"
                      placeholder="Enter your Strudel pattern here..."
                      spellCheck={false}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                      Lines: {currentPattern.split('\n').length}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Help Panel */}
          <HelpPanel />
        </>
      )}
    </div>
  );
};
