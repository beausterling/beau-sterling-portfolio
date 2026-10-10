
import { Clapperboard, Code, Cpu, Layers, LayoutGrid, Rocket } from 'lucide-react';

const About = () => {
  const skills = [
    { name: "Full-Stack Development", icon: <Code className="text-neon" size={24} /> },
    { name: "UI/UX Design", icon: <LayoutGrid className="text-neon" size={24} /> },
    { name: "Automation Workflows", icon: <Layers className="text-neon" size={24} /> },
    { name: "AI Integration", icon: <Cpu className="text-neon" size={24} /> },
    { name: "AI Filmmaking", icon: <Clapperboard className="text-neon" size={24} /> },
    { name: "MVP Scope & Launch", icon: <Rocket className="text-neon" size={24} /> },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-transparent via-dark-secondary/30 to-transparent relative">
      {/* Background elements (pre-baked gradients — no runtime blur) */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 glow-neon rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 glow-blue rounded-full" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Me Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-neon text-glow">About</span> <span className="text-neon text-glow">Me</span>
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p>
                I'm Beau Sterling, a design engineer and AI filmmaker in Seattle. I design and build whole products on my own, from the interaction model and interface to the code underneath, and I make short films and spec ads with generative AI.
              </p>
              
              <p>
                I studied filmmaking at the University of Washington (DXARTS), and that training shows up in everything I make. As a Junior Creative Partner at Quixotic Shorts, I take one portfolio piece a month from concept to final cut, generating it shot by shot with tools like Seedance, Kling, Veo, Magnific, ElevenLabs, and Suno, then scoring, grading, and editing it in Premiere. Recent work includes spec ads for GenHQ, The Wetlands Conservancy, and Meta.
              </p>
              
              <p>
                The two sides feed each other. I build the tools I wish I had in the edit, like Gumreel, an AI video toolkit with paid plans, and YT Clip, which I made to pull sound effects for my own projects. And because I live inside a creative workflow every day, I know what the people using my software actually need.
              </p>
            </div>
          </div>
          
          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-6 lg:text-center">
              My <span className="text-white">Skills</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="bg-dark p-6 rounded-lg border border-gray-800 hover:border-neon/30 transition-colors flex items-center gap-4 shadow-lg"
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
