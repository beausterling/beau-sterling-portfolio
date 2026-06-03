
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Play, Globe } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface FilmCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  embedUrl: string;
  watchUrl: string;
  watchLabel?: string;
  clientName?: string;
  clientUrl?: string;
  reverse?: boolean;
}

const FilmCard = ({
  title,
  description,
  image,
  technologies,
  embedUrl,
  watchUrl,
  watchLabel = "Watch on YouTube",
  clientName,
  clientUrl,
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
            className="block rounded-lg overflow-hidden border border-gray-800 shadow-xl transition-transform duration-500 transform-gpu will-change-transform hover:scale-[1.03] relative group cursor-pointer"
          >
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-20 h-20 bg-neon/90 rounded-full flex items-center justify-center shadow-lg">
                <Play size={32} className="text-dark fill-dark ml-1" />
              </div>
            </div>

            {/* Single consolidated neon glow - only visible on hover */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 shadow-[0_0_25px_8px_rgba(61,245,132,0.7)] border border-neon pointer-events-none transition-opacity duration-500"></div>

            <img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
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

            <div className="flex flex-wrap gap-4">
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-neon transition-colors"
              >
                <ExternalLink size={16} />
                {watchLabel}
              </a>

              {clientName && clientUrl && (
                <a
                  href={clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-neon transition-colors"
                >
                  <Globe size={16} />
                  {clientName}
                </a>
              )}
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
