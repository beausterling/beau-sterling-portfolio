
import { cn } from '@/lib/utils';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  reverse?: boolean;
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  liveDemoUrl,
  githubUrl,
  reverse = false,
}: ProjectCardProps) => {
  return (
    <div className={cn(
      'flex flex-col md:flex-row gap-8 items-center mb-20',
      reverse && 'md:flex-row-reverse'
    )}>
      {/* Project Image */}
      <div className="w-full md:w-1/2">
        <div className="rounded-lg overflow-hidden border border-gray-800 shadow-xl transition-transform hover:scale-[1.02] duration-300 relative">
          {/* Neon border effect using pseudo-element */}
          <div className="absolute inset-0 rounded-lg -m-0.5 shadow-[0_0_10px_2px_rgba(61,245,132,0.5)] border-2 border-neon pointer-events-none"></div>
          
          <img 
            src={image} 
            alt={title} 
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-50"></div>
        </div>
      </div>
      
      {/* Project Details */}
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
            {liveDemoUrl && (
              <a 
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-neon transition-colors"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            
            {githubUrl && (
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-neon transition-colors"
              >
                <Github size={16} />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
