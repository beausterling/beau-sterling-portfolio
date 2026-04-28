import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { projects, featuredProjects } from "@/lib/projects";

interface ProjectsProps {
  featuredOnly?: boolean;
}

const Projects = ({ featuredOnly = false }: ProjectsProps) => {
  const visible = featuredOnly ? featuredProjects : projects;

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-neon text-glow">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in
            frontend development, UI/UX design, and building applications that
            solve real problems.
          </p>
        </div>

        <div className="space-y-24">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>

        {featuredOnly && projects.length > featuredProjects.length && (
          <div className="text-center mt-20">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-neon text-neon hover:bg-neon/10 transition-all rounded-lg shadow-lg shadow-neon/10"
            >
              See all {projects.length} projects
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
