export interface MusicPreset {
  id: string;
  name: string;
  description: string;
  pattern: string;
  category: 'ambient' | 'beat' | 'experimental' | 'melodic' | 'lofi';
}

export const musicPresets: MusicPreset[] = [
  {
    id: 'chill-ambient',
    name: 'Chill Ambient',
    description: 'Slow, atmospheric pad sounds perfect for relaxation',
    category: 'ambient',
    pattern: `note("c3 eb3 g3 bb3")
  .sound("sine")
  .lpf(800)
  .delay(0.5)
  .room(0.8)
  .slow(4)`,
  },
  {
    id: 'basic-beat',
    name: 'Basic Beat',
    description: 'Simple rhythmic pattern with synthesis - great for beginners',
    category: 'beat',
    pattern: `stack(
  note("c1 ~ c1 ~").sound("sine").lpf(200).gain(0.8),
  note("~ e4 ~ e4").sound("square").lpf(2000).gain(0.3).decay(0.05)
)`,
  },
  {
    id: 'glitchy-textures',
    name: 'Glitchy Textures',
    description: 'Experimental, generative sounds with random variations',
    category: 'experimental',
    pattern: `note("c4 [e4 g4]*2 ~ b4")
  .sound("square")
  .lpf(sine.range(500, 3000).slow(2))
  .pan(sine.slow(4))
  .decay(0.1)
  .delay(0.3)`,
  },
  {
    id: 'melodic-arpeggio',
    name: 'Melodic Arpeggio',
    description: 'Musical, scale-based pattern with evolving filter',
    category: 'melodic',
    pattern: `n("<0 2 4 7>*8")
  .scale("C:minor")
  .sound("sawtooth")
  .lpf(sine.range(400, 4000).slow(8))
  .decay(0.1)
  .sustain(0)`,
  },
  {
    id: 'lofi-groove',
    name: 'Lo-fi Groove',
    description: 'Warm, mellow beat with melodic elements',
    category: 'lofi',
    pattern: `stack(
  note("c2 ~ c2 ~").sound("triangle").lpf(300).gain(0.7),
  note("~ g3 ~ g3").sound("sine").decay(0.1).gain(0.4),
  n("0 3 7 5").scale("C:minor").sound("sine").lpf(2000).gain(0.5)
).slow(2)`,
  },
  {
    id: 'spacey-pads',
    name: 'Spacey Pads',
    description: 'Ethereal, evolving textures that fill the space',
    category: 'ambient',
    pattern: `note("<c3 eb3 g3> <d3 f3 a3> <e3 g3 b3>")
  .sound("sawtooth")
  .lpf(sine.range(200, 2000).slow(16))
  .room(0.9)
  .delay(0.7)
  .slow(8)`,
  },
];

export const getPresetById = (id: string): MusicPreset | undefined => {
  return musicPresets.find((preset) => preset.id === id);
};

export const getPresetsByCategory = (category: MusicPreset['category']): MusicPreset[] => {
  return musicPresets.filter((preset) => preset.category === category);
};
