import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CursorEffects } from '@/components/playground/CursorEffects';
import { MusicPlayground } from '@/components/playground/MusicPlayground';

const CursorPlayground = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse hash to determine active tab
  const getTabFromHash = () => {
    const hash = location.hash.replace('#', '');
    return hash === 'music' ? 'music' : 'cursor';
  };

  const [activeTab, setActiveTab] = useState(getTabFromHash());

  // Update URL hash when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`#${value}`, { replace: true });
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Header with Back button and Navigation Tabs */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-dark-secondary/90 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-3 md:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Back Button */}
          <Link to="/" className="cursor-auto">
            <button className="flex items-center gap-1 md:gap-2 px-3 py-2 bg-dark-secondary/80 backdrop-blur-sm text-gray-200 rounded-lg hover:bg-dark-secondary hover:text-neon transition-colors border border-gray-700 cursor-pointer text-sm">
              <ArrowLeft size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Back Home</span>
              <span className="sm:hidden">Back</span>
            </button>
          </Link>

          {/* Title - Hidden on mobile when tabs are visible */}
          <div className="hidden sm:block text-center flex-1">
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-neon text-glow">Playground</span>
            </h1>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="cursor-auto">
            <TabsList className="bg-dark/80 border border-gray-700">
              <TabsTrigger
                value="cursor"
                className="data-[state=active]:bg-neon data-[state=active]:text-dark text-gray-300 cursor-pointer"
              >
                Cursor Effects
              </TabsTrigger>
              <TabsTrigger
                value="music"
                className="data-[state=active]:bg-neon data-[state=active]:text-dark text-gray-300 cursor-pointer"
              >
                Music Lab
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tab Content */}
      <div className="h-full pt-[72px] sm:pt-[68px]">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full">
          <TabsContent value="cursor" className="h-full m-0 data-[state=inactive]:hidden">
            <CursorEffects />
          </TabsContent>

          <TabsContent value="music" className="h-full m-0 data-[state=inactive]:hidden overflow-y-auto bg-black">
            <MusicPlayground />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CursorPlayground;
