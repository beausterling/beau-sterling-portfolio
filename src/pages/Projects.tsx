import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const Footer = lazy(() => import("@/components/Footer"));

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main>
        <section className="pt-32 pb-24 relative">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-neon/5 blur-[100px]" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-neon transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Back to home
            </Link>

            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                All <span className="text-neon text-glow">Projects</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A complete look at the products, prototypes, and experiments
                I've shipped.
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
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ProjectsPage;
