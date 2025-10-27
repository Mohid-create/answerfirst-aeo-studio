// src/pages/api/competitors.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type CompetitorItem = {
  title: string;
  link: string;
  snippet: string;
  domain: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const q = (req.query.q as string) || '';
    if (!q) return res.status(400).json({ error: 'Missing query parameter q' });

    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Server misconfigured: missing SERPER_API_KEY' });

    const r = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q, num: 5 }),
    });

    if (!r.ok) {
      const text = await r.text();
      console.error('Serper error:', r.status, text);
      return res.status(502).json({ error: 'Search provider error', detail: text });
    }

    const data = await r.json();

    const results = (data.organic || []).map((item: any) => ({
      title: item.title || '',
      link: item.link || '',
      snippet: item.snippet || '',
      domain: (() => {
        try {
          return new URL(item.link).hostname;
        } catch {
          return item.link || '';
        }
      })(),
    })) as CompetitorItem[];

    return res.status(200).json({ results });
  } catch (err) {
    console.error('API /api/competitors error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
