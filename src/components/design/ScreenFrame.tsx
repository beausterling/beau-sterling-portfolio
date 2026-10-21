import { cn } from '@/lib/utils';

interface ScreenFrameProps {
  src: string;
  alt: string;
  url: string;
  href?: string;
  className?: string;
}

// A screenshot in a minimal browser frame. The address bar shows the real URL
// so the reader knows exactly which live page they are looking at.
const ScreenFrame = ({ src, alt, url, href, className }: ScreenFrameProps) => {
  const frame = (
    <div className={cn('rounded-lg overflow-hidden border border-gray-800 bg-dark-secondary shadow-xl', className)}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
        <span className="h-2 w-2 rounded-full bg-gray-700" aria-hidden="true" />
        <span className="text-xs text-gray-400 truncate">{url}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-auto block" />
    </div>
  );

  if (!href) return frame;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon focus-visible:outline-offset-4"
    >
      {frame}
    </a>
  );
};

export default ScreenFrame;
