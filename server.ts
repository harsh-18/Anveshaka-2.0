import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
      }

      const { message, history, context } = req.body;

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const contents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({ role: msg.role, parts: [{ text: msg.content }] });
        }
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      let systemInstruction = `You are an analytical assistant for 'Anveshaka', a decision intelligence dashboard for local healthcare access. 
Answer questions using a professional, concise, and analytical tone. 
Base your responses on general public health knowledge and the hypothetical context of local healthcare data (resource deficits, response patterns, equipment availability, staff shortages, etc.).`;

      if (context) {
        systemInstruction += `\n\nCurrent viewing context: State: ${context.state}, District: ${context.district}.`;
        if (context.metrics) {
          systemInstruction += `\nDistrict Metrics: ${JSON.stringify(context.metrics)}`;
        }
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
        },
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Error generating chat response:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
