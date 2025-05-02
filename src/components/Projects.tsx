
import ProjectCard from './ProjectCard';

const Projects = () => {
  const projects = [
    {
      title: "VibeCheck-It",
      description: "A messaging analysis platform, that helps users understand their communication patterns and improve digital relationships across different channels. It includes a free demo on the home page and paid reports. The next phase will be a MacOS desktop app that integrates with iMessage and other messaging platforms.",
      image: "/lovable-uploads/3b170fdd-53d9-4427-ae77-525fda6f775b.png",
      technologies: ["Vite", "TypeScript", "React", "TailwindCSS", "OpenAI", "Supabase"],
      liveDemoUrl: "https://vibecheckit.com/",
      githubUrl: "#",
    },
    {
      title: "Sales-Maxing",
      description: "An AI-powered sales analytics platform that helps small businesses optimize their sales processes. The main feature is a call interface that records your conversation with the client or prospect, transcribes the audio, sends the conversation to Anthropic for analysis, and gets back a detailed feedback summary within seconds. The MVP for this was created for a 24-hour hackathon competition.",
      image: "/lovable-uploads/cbf30c20-d99b-4e9f-be19-822329622344.png",
      technologies: ["React", "TypeScript", "ElevenLabs", "Anthropic", "Supabase"],
      liveDemoUrl: "https://www.loom.com/share/14c492efe1df474285bcfc1fdb4abd34?sid=0389a70f-bc94-4169-8dbc-d0dbfb60502c",
      githubUrl: "#",
      isVideo: true,
    },
    {
      title: "Moon Rhythms",
      description: "A wellness application that syncs users' self-care routines with lunar cycles. This app is not fully developed yet, but will take users birth data, generate complete astrological human design profiles, and use that data to inform a highly personalized life coach and relationship advisor.",
      image: "/lovable-uploads/cb80639d-ec36-4ec6-b58f-0b6ab2fece1e.png",
      technologies: ["React Native", "Node.js", "Supabase"],
      liveDemoUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-neon text-glow">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in frontend development, UI/UX design, and building applications that solve real problems.
          </p>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title}
              {...project}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
