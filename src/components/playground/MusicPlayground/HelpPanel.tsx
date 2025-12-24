import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, ExternalLink, Code2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const HelpPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const examples = [
    {
      title: 'Basic Sounds',
      code: 's("bd sd")',
      description: 'Play bass drum and snare',
    },
    {
      title: 'Repetition',
      code: 's("bd*4")',
      description: 'Repeat bass drum 4 times',
    },
    {
      title: 'Rests',
      code: 's("bd ~ sd ~")',
      description: '~ means silence/rest',
    },
    {
      title: 'Sequences',
      code: 's("<bd sd> <hh oh>")',
      description: 'Cycle through options with < >',
    },
    {
      title: 'Notes',
      code: 'note("c d e f")',
      description: 'Play musical notes',
    },
    {
      title: 'Scales',
      code: 'n("0 2 4 7").scale("C:minor")',
      description: 'Use scale degrees',
    },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-dark-secondary/30 rounded-lg border border-gray-700 hover:border-neon/50 transition-colors">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-neon" />
          <span className="font-semibold text-gray-200">Quick Reference & Tips</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-3">
        <div className="p-4 bg-dark-secondary/30 rounded-lg border border-gray-700 space-y-4">
          {/* Introduction */}
          <div>
            <p className="text-sm text-gray-300 mb-3">
              Strudel uses a special syntax to create patterns. Here are some quick examples to get you started:
            </p>
          </div>

          {/* Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examples.map((example, index) => (
              <div key={index} className="bg-dark/50 rounded p-3 border border-gray-800">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-semibold text-neon">{example.title}</h4>
                </div>
                <code className="block text-xs bg-black/50 p-2 rounded mb-1 text-gray-300 font-mono">
                  {example.code}
                </code>
                <p className="text-xs text-gray-400">{example.description}</p>
              </div>
            ))}
          </div>

          {/* Common Functions */}
          <div className="border-t border-gray-800 pt-4">
            <h4 className="text-sm font-semibold text-neon mb-2">Common Functions</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <Badge variant="outline" className="mb-1 text-blue-400 border-blue-500/30">
                  .slow(2)
                </Badge>
                <p className="text-gray-400">Make twice as slow</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-1 text-blue-400 border-blue-500/30">
                  .fast(2)
                </Badge>
                <p className="text-gray-400">Make twice as fast</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-1 text-green-400 border-green-500/30">
                  .lpf(800)
                </Badge>
                <p className="text-gray-400">Low-pass filter</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-1 text-green-400 border-green-500/30">
                  .delay(0.5)
                </Badge>
                <p className="text-gray-400">Add echo effect</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-1 text-purple-400 border-purple-500/30">
                  .room(0.8)
                </Badge>
                <p className="text-gray-400">Add reverb</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-1 text-purple-400 border-purple-500/30">
                  .gain(0.5)
                </Badge>
                <p className="text-gray-400">Adjust volume</p>
              </div>
            </div>
          </div>

          {/* Learn More Link */}
          <div className="border-t border-gray-800 pt-4">
            <a
              href="https://strudel.cc/learn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neon hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Full Strudel Documentation
            </a>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
