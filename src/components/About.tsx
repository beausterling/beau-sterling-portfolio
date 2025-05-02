
import { Code, Cpu, Layers, LineChart, LayoutGrid, Rocket } from 'lucide-react';

const About = () => {
  const skills = [
    { name: "Frontend Development", icon: <Code className="text-neon" size={24} /> },
    { name: "UI/UX Design", icon: <LayoutGrid className="text-neon" size={24} /> },
    { name: "Mobile App Development", icon: <Layers className="text-neon" size={24} /> },
    { name: "AI Integration", icon: <Cpu className="text-neon" size={24} /> },
    { name: "Data Visualization", icon: <LineChart className="text-neon" size={24} /> },
    { name: "MVP Development", icon: <Rocket className="text-neon" size={24} /> },
  ];

  return (
    <section id="about" className="py-24 bg-dark-secondary relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-neon/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 blur-[80px] rounded-full" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Me Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-neon text-glow">About</span> <span className="text-neon text-glow">Me</span>
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p>
                I'm Beau Sterling, a passionate frontend developer and app builder dedicated to creating exceptional digital experiences that help startups and small businesses achieve their goals.
              </p>
              
              <p>
                With a deep understanding of modern web technologies and UI/UX principles, I specialize in building responsive, performant, and visually appealing applications that users love to interact with.
              </p>
              
              <p>
                My approach combines technical expertise with business understanding, allowing me to develop solutions that not only look great but also drive real results for my clients.
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
