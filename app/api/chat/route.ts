import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { messages as messagesTable } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { auth } from '@/auth';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini Client here heavily to support history
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
       // Allow for demo
    }

    const { sessionId, message } = await req.json();

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 1. Save User Message
    await db.insert(messagesTable).values({
        sessionId,
        role: 'user',
        content: message,
    });

    // 2. Fetch Chat History
    const history = await db.query.messages.findMany({
        where: eq(messagesTable.sessionId, sessionId),
        orderBy: [asc(messagesTable.createdAt)],
    });

    // 3. Construct Gemini Prompt with History
    // Simple approach: Feed last N messages or full history context
    const chat = model.startChat({
        history: history.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        })).slice(0, -1) // Exclude the just-added user message as startChat doesn't include it in history automatically usually, we send it via sendMessage
    });

    // Send the new message
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    // 4. Save Assistant Message
    await db.insert(messagesTable).values({
        sessionId,
        role: 'assistant',
        content: responseText,
    });

    return NextResponse.json({ reply: responseText });

  } catch (error) {
    console.error('Chat Error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
