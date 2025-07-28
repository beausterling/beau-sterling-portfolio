-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published BOOLEAN NOT NULL DEFAULT true,
  image_url TEXT,
  image_alt TEXT
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can read blog posts)
CREATE POLICY "Blog posts are publicly viewable" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Create policy for insert (will be used by edge function)
CREATE POLICY "Allow edge function to insert blog posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (true);

-- Create policy for updates (will be used by edge function)
CREATE POLICY "Allow edge function to update blog posts" 
ON public.blog_posts 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Create policies for blog image uploads
CREATE POLICY "Blog images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-images');

CREATE POLICY "Allow edge function to upload blog images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'blog-images');

-- Enable realtime for blog_posts table
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;