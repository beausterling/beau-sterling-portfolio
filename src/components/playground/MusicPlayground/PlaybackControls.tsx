import { Play, Square, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface PlaybackControlsProps {
  isPlaying: boolean;
  volume: number;
  onPlay: () => void;
  onStop: () => void;
  onVolumeChange: (volume: number) => void;
  disabled?: boolean;
}

export const PlaybackControls = ({
  isPlaying,
  volume,
  onPlay,
  onStop,
  onVolumeChange,
  disabled = false,
}: PlaybackControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-dark-secondary/50 rounded-lg border border-gray-700">
      {/* Play/Stop Button */}
      <Button
        onClick={isPlaying ? onStop : onPlay}
        disabled={disabled}
        size="lg"
        className={`min-w-[120px] ${
          isPlaying
            ? 'bg-neon hover:bg-neon/90 text-dark'
            : 'bg-neon/20 hover:bg-neon/30 text-neon border border-neon/50'
        }`}
      >
        {isPlaying ? (
          <>
            <Square className="mr-2 h-4 w-4" fill="currentColor" />
            Stop
          </>
        ) : (
          <>
            <Play className="mr-2 h-5 w-5" />
            Play
          </>
        )}
      </Button>

      {/* Volume Control */}
      <div className="flex items-center gap-3 flex-1 w-full sm:w-auto min-w-[200px]">
        <Volume2 className="h-5 w-5 text-gray-400" />
        <Slider
          value={[volume * 100]}
          onValueChange={(values) => onVolumeChange(values[0] / 100)}
          max={100}
          step={1}
          className="flex-1"
          disabled={disabled}
        />
        <span className="text-sm text-gray-400 min-w-[3ch]">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
};
