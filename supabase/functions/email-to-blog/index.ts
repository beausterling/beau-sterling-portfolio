import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

interface CloudMailinData {
  envelope: {
    to: string;
    from: string;
  };
  headers: {
    Subject: string;
  };
  plain: string;
  html: string;
  attachments: Array<{
    file_name: string;
    content: string;
    content_type: string;
    size: number;
  }>;
}

// Content validation and sanitization
const validateAndSanitizeContent = (content: string): string => {
  if (!content || typeof content !== 'string') {
    return '';
  }

  // Remove potentially dangerous content
  return content
    .trim()
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .substring(0, 50000); // Limit content length
};

const validateAttachment = (attachment: any): boolean => {
  if (!attachment || typeof attachment !== 'object') return false;
  
  // Validate file size (max 10MB)
  if (attachment.size > 10 * 1024 * 1024) {
    console.log('Attachment too large:', attachment.size);
    return false;
  }
  
  // Validate content type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(attachment.content_type)) {
    console.log('Invalid content type:', attachment.content_type);
    return false;
  }
  
  // Validate filename
  if (!attachment.file_name || typeof attachment.file_name !== 'string') {
    console.log('Invalid filename');
    return false;
  }
  
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: { ...corsHeaders, ...securityHeaders } });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders, ...securityHeaders },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let cloudmailinData: CloudMailinData;
    try {
      cloudmailinData = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders, ...securityHeaders },
      });
    }
    
    console.log('Received CloudMailin data:', {
      from: cloudmailinData.envelope.from,
      subject: cloudmailinData.headers.Subject,
      hasAttachments: cloudmailinData.attachments?.length || 0
    });

    // Validate and sanitize title
    let title = cloudmailinData.headers?.Subject || 'Untitled Blog Post';
    title = validateAndSanitizeContent(title).substring(0, 200); // Limit title length
    
    // Validate and sanitize content
    let content = cloudmailinData.plain || cloudmailinData.html?.replace(/<[^>]*>/g, '') || '';
    content = validateAndSanitizeContent(content);

    // Ensure minimum content length
    if (content.length < 10) {
      return new Response(JSON.stringify({ error: "Content too short" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders, ...securityHeaders },
      });
    }

    let imageUrl = null;
    let imageAlt = null;

    // Handle image attachments with validation
    if (cloudmailinData.attachments && cloudmailinData.attachments.length > 0) {
      const imageAttachment = cloudmailinData.attachments.find(att => 
        att.content_type.startsWith('image/') && validateAttachment(att)
      );

      if (imageAttachment) {
        try {
          // Decode base64 content
          const imageBuffer = Uint8Array.from(atob(imageAttachment.content), c => c.charCodeAt(0));
          
          // Generate secure filename
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const extension = imageAttachment.file_name.split('.').pop()?.toLowerCase() || 'jpg';
          
          // Sanitize extension
          const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
          const safeExtension = allowedExtensions.includes(extension) ? extension : 'jpg';
          
          const filename = `${timestamp}.${safeExtension}`;

          // Upload to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filename, imageBuffer, {
              contentType: imageAttachment.content_type,
              upsert: false
            });

          if (uploadError) {
            console.error('Image upload error:', uploadError);
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('blog-images')
              .getPublicUrl(filename);
            
            imageUrl = publicUrl;
            imageAlt = imageAttachment.file_name;
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
        blogPost: {
          id: blogPost.id,
          title: blogPost.title,
          created_at: blogPost.created_at
        },
        message: 'Blog post created successfully' 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
          ...securityHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in email-to-blog function:', error);
    
    // Don't expose internal error details
    const errorMessage = error.message?.includes('duplicate') 
      ? 'Blog post with this title already exists'
      : 'Failed to create blog post';
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders, ...securityHeaders },
      }
    );
  }
};

serve(handler);