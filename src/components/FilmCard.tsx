
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface FilmCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  embedUrl: string;
  youtubeUrl: string;
  reverse?: boolean;
}

const FilmCard = ({
  title,
  description,
  image,
  technologies,
  embedUrl,
  youtubeUrl,
  reverse = false,
}: FilmCardProps) => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);

  const handleImageClick = () => {
    setVideoDialogOpen(true);
  };

  return (
    <>
      <div className={cn(
        'flex flex-col md:flex-row gap-8 items-center mb-20',
        reverse && 'md:flex-row-reverse'
      )}>
        {/* Film Thumbnail */}
        <div className="w-full md:w-1/2">
          <div
            onClick={handleImageClick}
            className="block rounded-lg overflow-hidden border border-gray-800 shadow-xl transition-all duration-500 hover:scale-[1.03] relative group cursor-pointer"
          >
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-20 h-20 bg-neon/90 rounded-full flex items-center justify-center shadow-lg">
                <Play size={32} className="text-dark fill-dark ml-1" />
              </div>
            </div>

            {/* Neon border effect using pseudo-element - only visible on hover */}
            <div className="absolute inset-0 rounded-lg -m-3 opacity-0 group-hover:opacity-100 shadow-[0_0_40px_15px_rgba(61,245,132,0.9)] border-[12px] border-neon pointer-events-none transition-all duration-500"></div>

            {/* Background glow effect - only visible on hover */}
            <div className="absolute inset-0 bg-neon opacity-0 group-hover:opacity-30 transition-all duration-500 blur-2xl"></div>

            {/* Additional inner glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-neon/40 to-transparent opacity-70 blur-md"></div>
            </div>

            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover rounded-lg relative z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Film Details */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="text-neon text-glow">{title}</span>
          </h3>

          <div className="bg-dark-secondary p-6 rounded-lg shadow-lg mb-4">
            <p className="text-gray-300 mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs bg-dark px-3 py-1 rounded-full text-neon border border-neon/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-neon transition-colors"
              >
                <ExternalLink size={16} />
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="max-w-4xl bg-dark-secondary border-gray-800">
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilmCard;
