import { ArrowDown } from 'lucide-react';
const Hero = () => {
  return <section id="home" className="min-h-screen flex flex-col justify-center relative star-bg overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark to-dark" />
      
      {/* Glowing orb effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-neon/5 blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-[80px]" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-neon mb-2 opacity-0 animate-fade-in">👋 Hi there! I'm Beau Sterling</p>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 opacity-0 animate-fade-in" style={{
          animationDelay: '200ms'
        }}>
            A <span className="text-neon animate-glow-slow">Creative AI</span>. I Help Startups <span className="text-neon animate-glow-slow">Launch</span> And <span className="text-neon animate-glow-slow">Grow</span> Their Products
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 opacity-0 animate-fade-in" style={{
          animationDelay: '400ms'
        }}>With expert knowledge in frontend engineering, AI automation, and app development, I deliver quality results that help startups and small businesses succeed in today's digital landscape.</p>
          
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{
          animationDelay: '600ms'
        }}>
            <a href="#projects" className="px-6 py-3 bg-neon text-dark font-medium rounded-lg hover:bg-neon/90 transition-colors shadow-lg shadow-neon/20">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 border border-neon text-neon hover:bg-neon/10 transition-all rounded-lg shadow-lg shadow-neon/10">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#projects" className="flex flex-col items-center text-gray-400 hover:text-neon">
          <span className="mb-2 text-sm">Scroll</span>
          <ArrowDown size={20} />
        </a>
      </div>
    </section>;
};
export default Hero;