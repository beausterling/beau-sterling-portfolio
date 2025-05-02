
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
        <div className="rounded-lg overflow-hidden border border-gray-800 shadow-xl transition-all duration-500 hover:scale-[1.03] relative group">
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
