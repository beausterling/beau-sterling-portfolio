import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
if (!RESEND_API_KEY) {
  console.error("FATAL: RESEND_API_KEY environment variable is not set!");
}
const resend = new Resend(RESEND_API_KEY);

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
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Thank You - Beau Sterling</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .email-body { background-color: #0a0a0a !important; }
      .email-container { background-color: #1a1a1a !important; border-color: #333333 !important; }
      .email-text { color: #e5e5e5 !important; }
      .email-text-muted { color: #a1a1aa !important; }
      .email-header { background-color: #1a1a1a !important; border-bottom-color: #3DF584 !important; }
      .email-footer { background-color: #0a0a0a !important; border-top-color: #333333 !important; }
      .info-box { background-color: rgba(61, 245, 132, 0.1) !important; border-left-color: #3DF584 !important; }
      .social-link { color: #3DF584 !important; }
    }
    @media only screen and (max-width: 480px) {
      .email-container { width: 100% !important; }
      .email-header { padding: 30px 20px !important; }
      .email-content { padding: 20px !important; }
      .email-footer { padding: 20px !important; }
    }
  </style>
</head>
<body class="email-body" style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0;">
        <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-collapse: collapse;">

          <!-- Header -->
          <tr>
            <td class="email-header" style="background-color: #ffffff; border-bottom: 3px solid #3DF584; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1a1a1a; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Thank You!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; color: #666;">Message Received Successfully</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="email-content" style="padding: 30px;">
              <!-- Greeting -->
              <h2 class="email-text" style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #1a1a1a; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Hi ${name},</h2>

              <!-- Message -->
              <p class="email-text" style="margin: 0 0 20px 0; line-height: 1.6; font-size: 16px; color: #333;">
                Thank you for reaching out! I've received your message and will get back to you as soon as possible.
              </p>

              <!-- Info box -->
              <table class="info-box" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: rgba(61, 245, 132, 0.05); border-left: 4px solid #3DF584; margin: 20px 0; border-collapse: collapse;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; font-weight: 600; color: #1a1a1a; font-size: 16px;">What happens next?</p>
                    <p style="margin: 5px 0; line-height: 1.6; font-size: 15px; color: #666;">✓ I'll review your message carefully</p>
                    <p style="margin: 5px 0; line-height: 1.6; font-size: 15px; color: #666;">✓ You can expect a response within 24-48 hours</p>
                    <p style="margin: 5px 0; line-height: 1.6; font-size: 15px; color: #666;">✓ I'll reach out to discuss your project or question</p>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <p class="email-text" style="margin: 20px 0 0 0; line-height: 1.6; color: #333;">
                Best regards,<br>
                <strong style="color: #1a1a1a;">Beau Sterling</strong><br>
                <span class="email-text-muted" style="color: #666;">Creative AI Engineer & Full-Stack Developer</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="email-footer" style="background-color: #f5f5f5; border-top: 1px solid #e5e5e5; padding: 30px; text-align: center;">
              <!-- Social links -->
              <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">Connect with me:</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="https://linkedin.com/in/beausterling" class="social-link" style="color: #3DF584; text-decoration: none; font-weight: 500; font-size: 15px;">LinkedIn</a>
                  </td>
                  <td style="color: #ccc; font-size: 14px;">•</td>
                  <td style="padding: 0 10px;">
                    <a href="https://github.com/beausterling" class="social-link" style="color: #3DF584; text-decoration: none; font-weight: 500; font-size: 15px;">GitHub</a>
                  </td>
                </tr>
              </table>

              <!-- Disclaimer -->
              <p style="margin: 20px 0 0 0; font-size: 12px; color: #999;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
    console.log("Attempting to send notification email...");
    try {
      const notificationResponse = await resend.emails.send({
        from: "Portfolio Contact <info@vibecheckit.com>",
        to: ["beaujsterling@gmail.com"],
        replyTo: email,
        subject: `New Contact Form Message from ${name}`,
        html: createNotificationEmail(name, email, message),
      });
      console.log("Notification email sent successfully:", notificationResponse.data?.id || notificationResponse);
    } catch (notificationError: any) {
      console.error("Failed to send notification email:", notificationError);
      throw notificationError; // Re-throw to trigger main catch block
    }

    // Send confirmation email to the user
    console.log("Attempting to send confirmation email...");
    try {
      const confirmationResponse = await resend.emails.send({
        from: "Beau Sterling <info@vibecheckit.com>",
        to: [email],
        subject: "Thank you for your message!",
        html: createConfirmationEmail(name),
      });
      console.log("Confirmation email sent successfully:", confirmationResponse.data?.id || confirmationResponse);
    } catch (confirmationError: any) {
      console.error("Failed to send confirmation email:", confirmationError);
      // Don't throw - notification was sent successfully
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
        ...securityHeaders,
      },
    });
  } catch (error: any) {
    // Log comprehensive error details
    console.error("Error sending contact emails:", {
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
      name: error.name,
    });

    // Check if API key is set
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("CRITICAL: RESEND_API_KEY is not set!");
    } else {
      console.log("RESEND_API_KEY is set (length:", apiKey.length, ")");
    }

    // Provide specific error messages based on error type
    let errorMessage = 'Failed to send email. Please try again later.';

    if (error.statusCode === 401 || error.message?.includes('unauthorized')) {
      errorMessage = 'Email authentication failed.';
      console.error("CHECK RESEND_API_KEY - appears to be invalid");
    } else if (error.statusCode === 429 || error.message?.includes('rate limit')) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
    } else if (error.statusCode === 403 || error.message?.includes('forbidden')) {
      errorMessage = 'Email sending forbidden.';
      console.error("CHECK SENDER DOMAIN - may need verification");
    }

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