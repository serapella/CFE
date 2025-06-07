import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/api/proxy/ingredients`;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const response = await fetch(apiUrl, {
    headers: {
      'CBE-API-KEY': apiKey || '',
    },
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Verwijder of blokkeer alle andere methodes. 