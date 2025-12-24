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
  .s("sine")
  .lpf(800)
  .delay(0.5)
  .room(0.8)
  .slow(4)`,
  },
  {
    id: 'basic-beat',
    name: 'Basic Beat',
    description: 'Simple kick and snare pattern - great for beginners',
    category: 'beat',
    pattern: `s("bd sd [~ bd] sd")
  .bank("RolandTR808")`,
  },
  {
    id: 'glitchy-textures',
    name: 'Glitchy Textures',
    description: 'Experimental, generative sounds with random variations',
    category: 'experimental',
    pattern: `s("~ [glitch:3 glitch:1]*2 ~ glitch:5")
  .speed(rand.range(0.5, 2))
  .pan(sine)`,
  },
  {
    id: 'melodic-arpeggio',
    name: 'Melodic Arpeggio',
    description: 'Musical, scale-based pattern with evolving filter',
    category: 'melodic',
    pattern: `n("<0 2 4 7>*8")
  .scale("C:minor")
  .s("sawtooth")
  .lpf(sine.range(400, 4000).slow(8))
  .decay(0.1)
  .sustain(0)`,
  },
  {
    id: 'lofi-groove',
    name: 'Lo-fi Groove',
    description: 'Warm, vinyl-style beat with melodic elements',
    category: 'lofi',
    pattern: `stack(
  s("bd ~ bd ~").bank("RolandTR808"),
  s("~ sd ~ sd").bank("RolandTR808").room(0.3),
  n("0 3 7 5").scale("C:minor").s("piano").lpf(2000)
).slow(2)`,
  },
  {
    id: 'spacey-pads',
    name: 'Spacey Pads',
    description: 'Ethereal, evolving textures that fill the space',
    category: 'ambient',
    pattern: `note("<c3 eb3 g3> <d3 f3 a3> <e3 g3 b3>")
  .s("sawtooth")
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
