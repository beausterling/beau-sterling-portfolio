
import { Github, Linkedin, Mail } from 'lucide-react';

// Custom X (formerly Twitter) icon
const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/beausterling", label: "GitHub" },
    { icon: <XIcon size={20} />, href: "https://x.com/beausterling_", label: "X" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/beau-sterling/", label: "LinkedIn" },
    { icon: <Mail size={20} />, href: "mailto:beaujsterling@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-dark py-10 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold text-neon text-glow tracking-tight">BS.</span>
            <p className="text-gray-400 mt-2">Building exceptional web experiences.</p>
          </div>
          
          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const isMailto = link.href.startsWith('mailto:');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  {...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-gray-400 hover:text-neon transition-colors p-2 hover:bg-dark-secondary rounded-full"
                >
                  {link.icon}
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Beau Sterling. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
