
import { Youtube } from 'lucide-react';
import FilmCard from './FilmCard';

const Films = () => {
  const films = [
    {
      title: "Meta Spec Ad",
      description: "A Meta spec ad for augmented reality headphones — a product that doesn't exist (yet). A speculative concept piece imagining how Meta might market the next leap in wearable audio, brought to life entirely with AI.",
      image: "/assets/ar-headphones-quixotic.webp",
      technologies: ["Suno AI", "ElevenLabs", "Magnific", "Veo 3.1", "Kling 3.0"],
      embedUrl: "https://player.vimeo.com/video/1162367981",
      watchUrl: "https://vimeo.com/1162367981",
      watchLabel: "Watch on Vimeo",
      clientName: "Quixotic Shorts",
      clientUrl: "https://quixoticshorts.com/",
    },
    {
      title: "AI Kid - Movie Trailer",
      description: "A story about an AI Kid who doesn’t fit in at school, then gets a software update and everyone loves him. A commentary on the rapid progression of AI image generation.",
      image: "https://img.youtube.com/vi/gqr2en_76M8/maxresdefault.jpg",
      technologies: ["Freepik", "Veo 3.1", "Suno AI", "ElevenLabs"],
      embedUrl: "https://www.youtube.com/embed/gqr2en_76M8",
      watchUrl: "https://youtu.be/gqr2en_76M8",
    },
    {
      title: "Liés Ensemble - Short Film",
      description: "An AI-generated short film for a compeition inside of GenHQ. A love story about a boy who was abandonned at a theme park.",
      image: "https://img.youtube.com/vi/J4i_dJcWq3I/maxresdefault.jpg",
      technologies: ["ElevenLabs", "Suno AI", "Kling AI", "Freepik"],
      embedUrl: "https://www.youtube.com/embed/J4i_dJcWq3I",
      watchUrl: "https://youtube.com/shorts/J4i_dJcWq3I",
    },
    {
      title: "SmartAss - Spec Ad",
      description: "Another exploration into AI-powered filmmaking, pushing the boundaries of what's possible with generative AI in video production.",
      image: "https://img.youtube.com/vi/nzvg_IbBuho/maxresdefault.jpg",
      technologies: ["Higgsfield", "Veo 3", "ElevenLabs", "Seedream"],
      embedUrl: "https://www.youtube.com/embed/nzvg_IbBuho",
      watchUrl: "https://youtu.be/nzvg_IbBuho",
    },
    {
      title: "Happy Egg - Spec Ad",
      description: "An experiment with AI generated video and Adobe After Effects speed ramping.",
      image: "https://img.youtube.com/vi/YDNvF-_YCCA/maxresdefault.jpg",
      technologies: ["Kling AI", "ElevenLabs", "After Effects", "Higgsfield"],
      embedUrl: "https://www.youtube.com/embed/YDNvF-_YCCA",
      watchUrl: "https://youtube.com/shorts/YDNvF-_YCCA",
    },
  ];

  return (
    <section id="films" className="py-24 relative bg-dark-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI <span className="text-neon text-glow">Film Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my creative AI film projects and visual storytelling.
          </p>
        </div>

        <div className="space-y-24">
          {films.map((film, index) => (
            <FilmCard
              key={film.title}
              {...film}
              reverse={index % 2 === 0}
            />
          ))}
        </div>

        <div className="text-center mt-20">
          <a
            href="https://www.youtube.com/@beau_sterling"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neon text-neon hover:bg-neon/10 transition-all rounded-lg shadow-lg shadow-neon/10"
          >
            <Youtube size={18} />
            Visit my YouTube channel
          </a>
        </div>
      </div>
    </section>
  );
};

export default Films;
