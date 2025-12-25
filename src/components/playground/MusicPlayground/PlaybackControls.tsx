import { Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export const PlaybackControls = ({
  isPlaying,
  onPlay,
  onStop,
  disabled = false,
}: PlaybackControlsProps) => {
  return (
    <div className="flex justify-center p-4">
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
    </div>
  );
};
