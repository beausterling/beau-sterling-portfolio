import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

// Input validation and sanitization
const validateContactInput = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string');
  } else if (data.name.trim().length < 1 || data.name.trim().length > 100) {
    errors.push('Name must be between 1 and 100 characters');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required and must be a string');
  } else if (!emailRegex.test(data.email.trim())) {
    errors.push('Email must be a valid email address');
  }

  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message is required and must be a string');
  } else if (data.message.trim().length < 10 || data.message.trim().length > 5000) {
    errors.push('Message must be between 10 and 5000 characters');
  }

  return { isValid: errors.length === 0, errors };
};

// Basic content sanitization
const sanitizeContent = (content: string): string => {
  return content
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

// Clean notification email template for Beau
const createNotificationEmail = (name: string, email: string, message: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0;">
    <!-- Header -->
    <div style="background-color: #2563eb; padding: 30px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0; color: #e2e8f0; font-size: 16px;">Beau Sterling - Frontend Engineer</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px;">
      <div style="border-left: 4px solid #2563eb; padding-left: 20px; margin-bottom: 25px;">
        <h2 style="color: #334155; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Contact Details</h2>
        <p style="margin: 8px 0; line-height: 1.5; color: #475569;"><strong style="color: #1e293b;">Name:</strong> ${name}</p>
        <p style="margin: 8px 0; line-height: 1.5; color: #475569;"><strong style="color: #1e293b;">Email:</strong> ${email}</p>
      </div>
      
      <div style="border-left: 4px solid #2563eb; padding-left: 20px;">
        <h2 style="color: #334155; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Message</h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
          <p style="margin: 0; line-height: 1.6; color: #475569; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; color: #64748b; font-size: 14px;">Portfolio Contact System</p>
    </div>
  </div>
</body>
</html>
`;

// Confirmation email template for the user
const createConfirmationEmail = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e9ecef;">
    <!-- Header -->
    <div style="background-color: #2563eb; padding: 30px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Thank You!</h1>
      <p style="margin: 10px 0 0 0; color: #e2e8f0; font-size: 16px;">Message Received Successfully</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px; color: #334155;">
      <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Hi ${name},</h2>
      
      <p style="margin: 0 0 20px 0; line-height: 1.6; font-size: 16px; color: #475569;">
        Thank you for reaching out! I've received your message and will get back to you as soon as possible.
      </p>
      
      <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 6px; border: 1px solid #e2e8f0;">
        <p style="margin: 0; line-height: 1.6; color: #334155;"><strong>What happens next?</strong></p>
        <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569;">
          <li style="margin: 5px 0;">I'll review your message carefully</li>
          <li style="margin: 5px 0;">You can expect a response within 24-48 hours</li>
          <li style="margin: 5px 0;">I'll reach out to discuss your project or question</li>
        </ul>
      </div>
      
      <p style="margin: 20px 0 0 0; line-height: 1.6;">
        Best regards,<br>
        <strong>Beau Sterling</strong><br>
        <span style="color: #666666;">Frontend Engineer</span>
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="margin: 0; color: #666666; font-size: 14px;">
        This is an automated confirmation. Please do not reply to this email.
      </p>
    </div>
  </div>
</body>
</html>
`;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { ...corsHeaders, ...securityHeaders } });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders, ...securityHeaders },
    });
  }

  try {
    // Parse and validate request body
    let requestData;
    try {
      requestData = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders, ...securityHeaders },
      });
    }

    // Validate input
    const validation = validateContactInput(requestData);
    if (!validation.isValid) {
      console.log("Validation failed:", validation.errors);
      return new Response(JSON.stringify({ error: "Invalid input", details: validation.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders, ...securityHeaders },
      });
    }

    // Sanitize inputs
    const name = sanitizeContent(requestData.name);
    const email = requestData.email.trim().toLowerCase();
    const message = sanitizeContent(requestData.message);

    console.log("Sending contact emails for:", { name, email: email.substring(0, 3) + "***" });

    // Send notification email to Beau
    const notificationResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["beaujsterling@gmail.com"],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: createNotificationEmail(name, email, message),
    });

    console.log("Notification email sent:", notificationResponse);

    // Send confirmation email to the user
    const confirmationResponse = await resend.emails.send({
      from: "Beau Sterling <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for your message!",
      html: createConfirmationEmail(name),
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
        ...securityHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending contact emails:", error);
    
    // Don't expose internal error details in production
    const errorMessage = error.message?.includes('rate limit') 
      ? 'Rate limit exceeded. Please try again later.'
      : 'Failed to send email. Please try again later.';
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders, ...securityHeaders },
      }
    );
  }
};

serve(handler);