import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MusicPreset } from '@/lib/music-presets';
import { Waves, Music2, Sparkles, Piano, Radio } from 'lucide-react';

interface PresetSelectorProps {
  presets: MusicPreset[];
  selectedPresetId?: string;
  onSelectPreset: (preset: MusicPreset) => void;
}

const getCategoryIcon = (category: MusicPreset['category']) => {
  switch (category) {
    case 'ambient':
      return <Waves className="h-4 w-4" />;
    case 'beat':
      return <Radio className="h-4 w-4" />;
    case 'experimental':
      return <Sparkles className="h-4 w-4" />;
    case 'melodic':
      return <Piano className="h-4 w-4" />;
    case 'lofi':
      return <Music2 className="h-4 w-4" />;
    default:
      return <Music2 className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: MusicPreset['category']) => {
  switch (category) {
    case 'ambient':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'beat':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'experimental':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'melodic':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'lofi':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export const PresetSelector = ({ presets, selectedPresetId, onSelectPreset }: PresetSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-neon">Choose a Preset</h3>
      <div className="grid grid-cols-1 gap-3">
        {presets.map((preset) => {
          const isSelected = preset.id === selectedPresetId;

          return (
            <Card
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                isSelected
                  ? 'bg-neon/10 border-neon shadow-lg shadow-neon/20'
                  : 'bg-dark-secondary/50 border-gray-700 hover:border-neon/50'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`font-semibold text-sm ${isSelected ? 'text-neon' : 'text-gray-200'}`}>
                    {preset.name}
                  </h4>
                  <Badge className={`${getCategoryColor(preset.category)} border px-1.5 py-0.5 flex-shrink-0`}>
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(preset.category)}
                      <span className="text-[10px] capitalize">{preset.category}</span>
                    </span>
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">{preset.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
