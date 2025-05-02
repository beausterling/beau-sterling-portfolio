
import ProjectCard from './ProjectCard';

const Projects = () => {
  const projects = [
    {
      title: "VibeCheck-It",
      description: "A mood tracking application that helps users monitor their emotional well-being over time. Includes data visualization, mood patterns, and insights to help users understand their emotional trends.",
      image: "/lovable-uploads/3b170fdd-53d9-4427-ae77-525fda6f775b.png",
      technologies: ["React", "TypeScript", "Chart.js", "TailwindCSS", "Firebase"],
      liveDemoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Sales Maxing",
      description: "An AI-powered sales analytics platform that helps small businesses optimize their sales processes. Features include customer segmentation, sales forecasting, and actionable insights.",
      image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=1000&auto=format&fit=crop",
      technologies: ["Next.js", "TypeScript", "TensorFlow.js", "Prisma", "PostgreSQL"],
      liveDemoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Moon Rhythms",
      description: "A wellness application that syncs users' self-care routines with lunar cycles. Includes personalized recommendations, calendar integrations, and community features.",
      image: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=1000&auto=format&fit=crop",
      technologies: ["React Native", "Expo", "Node.js", "Express", "MongoDB"],
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
