
import FilmCard from './FilmCard';

const Films = () => {
  const films = [
    {
      title: "AI Film Project 1",
      description: "An AI-generated film exploring creative storytelling through artificial intelligence. This project showcases the intersection of technology and visual arts.",
      image: "https://img.youtube.com/vi/gqr2en_76M8/maxresdefault.jpg",
      technologies: ["AI Generation", "Video Production", "Creative Direction"],
      embedUrl: "https://www.youtube.com/embed/gqr2en_76M8",
      youtubeUrl: "https://youtu.be/gqr2en_76M8",
    },
    {
      title: "AI Film Short 1",
      description: "A short-form AI film experiment demonstrating the power of AI in creating compelling visual narratives in a condensed format.",
      image: "https://img.youtube.com/vi/J4i_dJcWq3I/maxresdefault.jpg",
      technologies: ["AI Generation", "Short Form", "Visual Effects"],
      embedUrl: "https://www.youtube.com/embed/J4i_dJcWq3I",
      youtubeUrl: "https://youtube.com/shorts/J4i_dJcWq3I",
    },
    {
      title: "AI Film Project 2",
      description: "Another exploration into AI-powered filmmaking, pushing the boundaries of what's possible with generative AI in video production.",
      image: "https://img.youtube.com/vi/nzvg_IbBuho/maxresdefault.jpg",
      technologies: ["AI Generation", "Video Production", "Post-Production"],
      embedUrl: "https://www.youtube.com/embed/nzvg_IbBuho",
      youtubeUrl: "https://youtu.be/nzvg_IbBuho",
    },
    {
      title: "AI Film Short 2",
      description: "A creative short film showcasing innovative uses of AI in visual storytelling and cinematography.",
      image: "https://img.youtube.com/vi/YDNvF-_YCCA/maxresdefault.jpg",
      technologies: ["AI Generation", "Short Form", "Cinematography"],
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
