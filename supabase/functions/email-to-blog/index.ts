import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType: string;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const emailData: EmailData = await req.json();
    
    console.log('Received email data:', {
      from: emailData.from,
      subject: emailData.subject,
      hasAttachments: emailData.attachments?.length || 0
    });

    // Extract title from subject
    const title = emailData.subject || 'Untitled Blog Post';
    
    // Use text content as primary, fall back to HTML without tags
    let content = emailData.text || emailData.html?.replace(/<[^>]*>/g, '') || '';
    
    // Clean up content
    content = content.trim();

    let imageUrl = null;
    let imageAlt = null;

    // Handle image attachments
    if (emailData.attachments && emailData.attachments.length > 0) {
      const imageAttachment = emailData.attachments.find(att => 
        att.contentType.startsWith('image/')
      );

      if (imageAttachment) {
        try {
          // Decode base64 content
          const imageBuffer = Uint8Array.from(atob(imageAttachment.content), c => c.charCodeAt(0));
          
          // Generate unique filename
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const extension = imageAttachment.filename.split('.').pop() || 'jpg';
          const filename = `${timestamp}.${extension}`;

          // Upload to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filename, imageBuffer, {
              contentType: imageAttachment.contentType,
              upsert: false
            });

          if (uploadError) {
            console.error('Image upload error:', uploadError);
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('blog-images')
              .getPublicUrl(filename);
            
            imageUrl = publicUrl;
            imageAlt = imageAttachment.filename;
            console.log('Image uploaded successfully:', publicUrl);
          }
        } catch (imageError) {
          console.error('Error processing image:', imageError);
        }
      }
    }

    // Insert blog post
    const { data: blogPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title,
        content,
        image_url: imageUrl,
        image_alt: imageAlt,
        published: true
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw insertError;
    }

    console.log('Blog post created successfully:', blogPost.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        blogPost: blogPost,
        message: 'Blog post created successfully' 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in email-to-blog function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);