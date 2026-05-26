import { NextResponse } from 'next/server';

// Simple in-memory rate limiting store
// Note: In serverless environments (like Vercel), this may reset across cold starts.
const rateLimitStore = new Map<string, { count: number; date: string }>();

const MAX_MESSAGES_PER_DAY = 20;
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';
const N8N_AUTH_KEY = process.env.N8N_AUTH_KEY || '';

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || !sessionId) {
      return NextResponse.json({ error: 'Missing message or sessionId' }, { status: 400 });
    }

    // Extract IP address from headers
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Check rate limit
    let userData = rateLimitStore.get(ip);

    // Reset if it's a new day
    if (!userData || userData.date !== today) {
      userData = { count: 0, date: today };
    }

    if (userData.count >= MAX_MESSAGES_PER_DAY) {
      return NextResponse.json({
        response: "I've reached my daily message limit! For further connection, please contact Alastier directly via email at alastier.catayoc@gmail.com, or reach out on WhatsApp/Telegram at +639357170116."
      });
    }

    // Increment count and store
    userData.count += 1;
    rateLimitStore.set(ip, userData);

    // Call n8n webhook
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (N8N_AUTH_KEY) {
      headers['X-N8N-Webhook-Secret'] = N8N_AUTH_KEY;
    }

    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, sessionId }),
    });

    if (!n8nResponse.ok) {
      console.error('n8n Webhook Error:', n8nResponse.statusText);
      // Revert the count if the webhook failed so they aren't penalized
      userData.count -= 1;
      rateLimitStore.set(ip, userData);
      return NextResponse.json({ response: "Aries is currently offline or experiencing issues. Please try again later." });
    }

    // Parse the response
    const textResponse = await n8nResponse.text();
    let finalResponse = "Message received.";

    try {
      const jsonResponse = JSON.parse(textResponse);
      // Attempt to intelligently extract the response text
      if (typeof jsonResponse === 'string') {
        finalResponse = jsonResponse;
      } else if (jsonResponse.output) {
        finalResponse = jsonResponse.output;
      } else if (jsonResponse.response) {
        finalResponse = jsonResponse.response;
      } else if (jsonResponse.message) {
        finalResponse = jsonResponse.message;
      } else if (Array.isArray(jsonResponse) && jsonResponse[0]?.output) {
        finalResponse = jsonResponse[0].output;
      } else if (Array.isArray(jsonResponse) && jsonResponse[0]?.message) {
        finalResponse = jsonResponse[0].message;
      } else {
        // Fallback for complex JSON, just extract first string value if possible
        finalResponse = Object.values(jsonResponse).find(val => typeof val === 'string') as string || "Okay, got it!";
      }
    } catch {
      // If it's just raw text
      finalResponse = textResponse;
    }

    return NextResponse.json({ response: finalResponse });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ response: "An unexpected error occurred. Please try again later." }, { status: 500 });
  }
}
