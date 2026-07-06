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

      let response;
      let lastError;
      const modelsToTry = ['gemini-3.5-flash', 'gemini-3.1-flash-lite'];

      for (const currentModel of modelsToTry) {
        let attempts = 3;
        let delay = 500; // ms

        for (let i = 0; i < attempts; i++) {
          try {
            console.log(`[Gemini API] Requesting ${currentModel}, attempt ${i + 1}/3...`);
            response = await ai.models.generateContent({
              model: currentModel,
              contents,
              config: {
                systemInstruction,
              },
            });
            break; // Success! Break the inner loop
          } catch (err: any) {
            lastError = err;
            console.warn(`[Gemini API] Attempt ${i + 1} failed on ${currentModel}: ${err.message || err}`);
            
            const isTransient = err.status === 503 || err.status === 429 || 
                                (err.message && (
                                  err.message.includes('503') || 
                                  err.message.includes('429') || 
                                  err.message.includes('high demand') || 
                                  err.message.includes('temporary') ||
                                  err.message.includes('UNAVAILABLE')
                                ));

            if (isTransient && i < attempts - 1) {
              console.log(`[Gemini API] Transient error. Retrying in ${delay}ms...`);
              await new Promise(resolve => setTimeout(resolve, delay));
              delay *= 2;
            } else {
              break; // Not transient or out of attempts for this model. Move to fallback model.
            }
          }
        }

        if (response) {
          break; // If we succeeded, break out of modelsToTry loop
        }
      }

      if (!response) {
        throw lastError || new Error('Failed to generate response after trying all fallback models and retries.');
      }

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
