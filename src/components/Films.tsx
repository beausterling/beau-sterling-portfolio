
import { Youtube } from 'lucide-react';

const Films = () => {
  return (
    <section id="films" className="py-24 relative bg-dark-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI <span className="text-neon text-glow">Film Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my creative AI film projects and visual storytelling on YouTube.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-dark-secondary border border-neon/20 rounded-lg p-8 hover:border-neon/40 transition-all duration-300">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-neon/10 rounded-full flex items-center justify-center">
                <Youtube size={40} className="text-neon" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">YouTube Channel</h3>
                <p className="text-gray-400 mb-6">
                  Watch my latest AI film projects and creative experiments
                </p>
                <a
                  href="YOUR_YOUTUBE_CHANNEL_URL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-dark font-semibold rounded-lg hover:bg-neon/90 transition-colors duration-200"
                >
                  <Youtube size={20} />
                  Visit My Channel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Films;
