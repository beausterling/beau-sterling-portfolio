
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Apps', href: '#projects' },
    { name: 'Films', href: '#films' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Playground', href: '/cursor-playground' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled 
          ? 'py-3 bg-dark/90 backdrop-blur-md shadow-md' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center z-50">
          <span className="text-2xl font-bold text-neon text-glow tracking-tight">BS.</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-200 hover:text-neon transition-colors hover:text-glow duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>
        
        {/* Mobile Navigation Button */}
        <button
          className="md:hidden z-50 text-gray-200 hover:text-neon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-dark-secondary/95 backdrop-blur-sm flex flex-col items-center justify-center">
            <nav className="flex flex-col gap-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl text-gray-200 hover:text-neon transition-colors hover:text-glow"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
