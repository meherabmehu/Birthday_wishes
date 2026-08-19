const TOPICS = {
  wish: 'a short, fresh birthday wish',
  heart: 'a short romantic reassurance',
  capsule: 'a heartfelt future time-capsule message',
  cat: 'a cute cat-themed romantic message',
  floating: 'a very short floating birthday or love wish'
};

function cors(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8'
  };
}

export default {
  async fetch(request, env) {
    const headers = cors(env);
    if (request.method === 'OPTIONS') return new Response(null, { headers });
    if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'POST only' }), { status: 405, headers });
    try {
      const { type = 'wish', previous = '' } = await request.json();
      const topic = TOPICS[type] || TOPICS.wish;
      const prompt = `Write exactly one ${topic} in natural, elegant English for Zannatul Ferdoush Nisa. It is from her partner Meherab, who has loved her for three years and hopes to marry her, InshaAllah. Keep it respectful, warm, romantic, fresh, and under 35 words. Vary the way you address her: rotate naturally among Nisa, Cute Billi, Zannatul, my love, and my future wife. Never use the same name in two consecutive messages and do not overuse any one name. Do not use Bangla, Banglish, markdown, quotation marks, or emojis. Avoid repeating this previous message: ${previous || 'none'}.`;
      const groq = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: env.GROQ_MODEL || 'openai/gpt-oss-20b', messages: [{ role: 'system', content: 'You write elegant, concise English romantic birthday messages. You vary names naturally and never write Bangla or Banglish.' }, { role: 'user', content: prompt }], temperature: 0.7, reasoning_effort: 'low', reasoning_format: 'hidden', max_completion_tokens: 320 })
      });
      if (!groq.ok) {
        const detail = (await groq.text()).slice(0, 500);
        console.error('Groq upstream error:', groq.status, detail);
        throw new Error(`Groq error ${groq.status}`);
      }
      const data = await groq.json();
      const rawContent = data.choices?.[0]?.message?.content;
      const message = typeof rawContent === 'string' ? rawContent.trim() : (Array.isArray(rawContent) ? rawContent.map((part) => part.text || '').join('').trim() : '');
      if (!message) { console.error('Groq returned no visible message:', JSON.stringify(data).slice(0, 1000)); throw new Error('No generated message'); }
      return new Response(JSON.stringify({ message }), { headers });
    } catch (error) {
      console.error('Cute Billi AI Worker error:', error?.message || error);
      return new Response(JSON.stringify({ error: 'Could not generate a message right now.' }), { status: 500, headers });
    }
  }
};
