import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  published: boolean;
  image_url?: string;
  image_alt?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const { data: initialPosts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  // Real-time subscription for new posts
  useEffect(() => {
    const channel = supabase
      .channel('blog-posts-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'blog_posts'
        },
        (payload) => {
          const newPost = payload.new as BlogPost;
          if (newPost.published) {
            setPosts(prev => [newPost, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-dark-secondary border-gray-800">
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-glow">
            <span className="bg-gradient-to-r from-neon to-neon-glow bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts, updates, and insights from my journey as a frontend engineer
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <Card key={post.id} className="bg-dark-secondary border-gray-800 hover:border-neon/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-glow">
                      <span className="bg-gradient-to-r from-neon to-neon-glow bg-clip-text text-transparent">
                        {post.title}
                      </span>
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {format(new Date(post.created_at), 'MMMM d, yyyy • h:mm a')}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {post.image_url && (
                      <div className="relative rounded-lg overflow-hidden">
                        <img
                          src={post.image_url}
                          alt={post.image_alt || 'Blog post image'}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="prose prose-invert prose-green max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Custom styling for markdown elements
                          h1: ({ children }) => (
                            <h1 className="text-3xl font-bold text-glow bg-gradient-to-r from-neon to-neon-glow bg-clip-text text-transparent">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-2xl font-semibold text-glow bg-gradient-to-r from-neon to-neon-glow bg-clip-text text-transparent">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xl font-semibold text-glow bg-gradient-to-r from-neon to-neon-glow bg-clip-text text-transparent">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-gray-300 leading-relaxed">{children}</p>
                          ),
                          code: ({ children }) => (
                            <code className="bg-muted px-2 py-1 rounded text-neon">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto border border-border">
                              {children}
                            </pre>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-neon/50 pl-4 italic text-muted-foreground">
                              {children}
                            </blockquote>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              className="text-neon hover:text-neon-glow underline transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {post.content}
                      </ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;