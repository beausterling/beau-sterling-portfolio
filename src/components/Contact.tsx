
import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot field - should remain empty for real users
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check for rate limiting
        if (response.status === 429) {
          toast({
            title: "Too many requests",
            description: "Please wait a few minutes before sending another message.",
            variant: "destructive",
          });
          return;
        }
        throw new Error(data.error || 'Failed to send message');
      }

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: '', email: '', message: '', website: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background element */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-neon/5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-neon text-glow">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-xl">
            Have a project in mind or want to discuss how we can work together? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-800 focus:border-neon/50 focus:outline-none focus:ring-1 focus:ring-neon/50 rounded-lg transition-colors"
                    placeholder="John Doe"
                  />
                  <MessageSquare className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-800 focus:border-neon/50 focus:outline-none focus:ring-1 focus:ring-neon/50 rounded-lg transition-colors"
                    placeholder="johndoe@example.com"
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-dark-secondary border border-gray-800 focus:border-neon/50 focus:outline-none focus:ring-1 focus:ring-neon/50 rounded-lg transition-colors resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            {/* Honeypot field - hidden from real users, bots will fill it */}
            <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
              <label htmlFor="website" className="sr-only">Website (leave blank)</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-neon text-dark font-medium rounded-lg hover:bg-neon/90 transition-colors shadow-lg shadow-neon/20 flex items-center gap-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
