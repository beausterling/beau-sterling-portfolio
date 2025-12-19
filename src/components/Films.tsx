
import FilmCard from './FilmCard';

const Films = () => {
  const films = [
    {
      title: "AI Kid - Movie Trailer",
      description: "A story about an AI Kid who doesn’t fit in at school, then gets a software update and everyone loves him. A commentary on the rapid progression of AI image generation.",
      image: "https://img.youtube.com/vi/gqr2en_76M8/maxresdefault.jpg",
      technologies: ["Freepik", "Veo 3.1", "Suno AI", "ElevenLabs"],
      embedUrl: "https://www.youtube.com/embed/gqr2en_76M8",
      youtubeUrl: "https://youtu.be/gqr2en_76M8",
    },
    {
      title: "Liés Ensemble - Short Film",
      description: "An AI-generated short film for a compeition inside of GenHQ. A love story about a boy who was abandonned at a theme park.",
      image: "https://img.youtube.com/vi/J4i_dJcWq3I/maxresdefault.jpg",
      technologies: ["ElevenLabs", "Suno AI", "Kling AI", "Freepik"],
      embedUrl: "https://www.youtube.com/embed/J4i_dJcWq3I",
      youtubeUrl: "https://youtube.com/shorts/J4i_dJcWq3I",
    },
    {
      title: "SmartAss - Spec Ad",
      description: "Another exploration into AI-powered filmmaking, pushing the boundaries of what's possible with generative AI in video production.",
      image: "https://img.youtube.com/vi/nzvg_IbBuho/maxresdefault.jpg",
      technologies: ["Higgsfield", "Veo 3", "ElevenLabs", "Seedream"],
      embedUrl: "https://www.youtube.com/embed/nzvg_IbBuho",
      youtubeUrl: "https://youtu.be/nzvg_IbBuho",
    },
    {
      title: "Happy Egg - Spec Ad",
      description: "An experiment with AI generated video and Adobe After Effects speed ramping.",
      image: "https://img.youtube.com/vi/YDNvF-_YCCA/maxresdefault.jpg",
      technologies: ["Kling AI", "ElevenLabs", "After Effects", "Higgsfield"],
      embedUrl: "https://www.youtube.com/embed/YDNvF-_YCCA",
      youtubeUrl: "https://youtube.com/shorts/YDNvF-_YCCA",
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
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Films;
