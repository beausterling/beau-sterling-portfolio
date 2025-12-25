
import ProjectCard from './ProjectCard';

const Projects = () => {
  const projects = [
    {
      title: "IdeasCower",
      description: "A satirical 'anti-incubator' web app that uses AI to humorously critique and deconstruct startup ideas. Featuring a dark cyberpunk aesthetic with custom animations, it generates daily 'doomed' startup concepts and provides entertaining fatal flaw analyses powered by Google Gemini.",
      image: "/lovable-uploads/ideascower.png",
      technologies: ["React", "TypeScript", "Vite", "TailwindCSS", "Supabase", "Google Gemini", "Deno"],
      websiteUrl: "https://ideascower.com/",
      githubUrl: "https://github.com/beausterling/ideascower",
    },
    {
      title: "ShopWell - Chrome Extension",
      description: "A free Chrome extension that helps people with chronic conditions shop safely online by using on-device AI to analyze product ingredients, allergens, and materials on Amazon and Walmart. Built for the chronic illness community, it provides condition-aware analysis for POTS, ME/CFS, and Celiac Disease while scanning for nine major allergens—all with guaranteed privacy since processing happens locally on your device.",
      image: "/lovable-uploads/shop-well.png",
      technologies: ["Chrome-AI", "JavaScript", "Node.js", "Google Cloud Functions", "Google Sheets API", "esbuild", "Netlify"],
      liveDemoUrl: "https://youtu.be/7qUNzIpvn9U?si=l88PY6CmemLe3m_V",
      githubUrl: "https://github.com/beausterling/shop-well-extension",
      websiteUrl: "https://shopwell-extension.com/",
      hackathonUrl: "https://devpost.com/software/shop-well",
      isVideo: true,
    },
    {
      title: "MyFutrSelf",
      description: "An AI Accountability app that allows users to talk to their future self who is designed to keep them accountable to their goals. The app creates personalized conversations with your future self to help maintain motivation and track progress towards your aspirations.",
      image: "/lovable-uploads/b83d40ad-af6e-4c22-9abf-96712d97b931.png",
      technologies: ["React", "TypeScript", "Vite", "TailwindCSS", "Supabase", "OpenAI", "ElevenLabs", "Clerk"],
      liveDemoUrl: "https://youtu.be/a5tNo3M3Lv0",
      liveDemoLabel: "Teaser",
      githubUrl: "https://github.com/beausterling/myfutrself-newest",
      websiteUrl: "https://myfutrself.com/",
      hackathonUrl: "https://devpost.com/software/myfutrself",
      isVideo: true,
    },
    {
      title: "VibeCheck-It",
      description: "A messaging analysis platform, that helps users understand their communication patterns and improve digital relationships across different channels. It includes a free demo on the home page and paid reports. The next phase will be a MacOS desktop app that integrates with iMessage and other messaging platforms.",
      image: "/lovable-uploads/3b170fdd-53d9-4427-ae77-525fda6f775b.png",
      technologies: ["Vite", "TypeScript", "React", "TailwindCSS", "OpenAI", "Supabase"],
      liveDemoUrl: "https://www.youtube.com/watch?v=EDiJC-QUxVc&t=137",
      websiteUrl: "https://vibecheckit.com/",
      githubUrl: "#",
      isVideo: true,
    },
    {
      title: "Sales-Maxing",
      description: "An AI-powered sales analytics platform that helps small businesses optimize their sales processes. The main feature is a call interface that records your conversation with the client or prospect, transcribes the audio, sends the conversation to Anthropic for analysis, and gets back a detailed feedback summary within seconds. The MVP for this was created for a 24-hour hackathon competition.",
      image: "/lovable-uploads/cbf30c20-d99b-4e9f-be19-822329622344.png",
      technologies: ["React", "TypeScript", "ElevenLabs", "Anthropic", "Supabase", "Lovable"],
      liveDemoUrl: "https://www.loom.com/share/14c492efe1df474285bcfc1fdb4abd34",
      websiteUrl: "https://sales-maxing.lovable.app/",
      githubUrl: "#",
      isVideo: true,
      embedVideo: true,
    },
    {
      title: "Moon Rhythms",
      description: "A wellness application that syncs users' self-care routines with lunar cycles. This app is not fully developed yet, but will take users birth data, generate complete astrological human design profiles, and use that data to inform a highly personalized life coach and relationship advisor.",
      image: "/lovable-uploads/cb80639d-ec36-4ec6-b58f-0b6ab2fece1e.png",
      technologies: ["React Native", "Node.js", "Supabase", "Lovable"],
      websiteUrl: "https://moonrhythms.io/",
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
