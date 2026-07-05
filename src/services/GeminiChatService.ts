import { IChatService, Message, ChatContext } from '../models';

export class GeminiChatService implements IChatService {
  async sendMessage(content: string, history: Message[], context?: ChatContext): Promise<string> {
    const historyPayload = history.map(msg => ({ role: msg.role, content: msg.content }));
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content, history: historyPayload, context }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data.reply;
  }
}
