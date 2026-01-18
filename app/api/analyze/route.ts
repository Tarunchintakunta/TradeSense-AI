import { NextRequest, NextResponse } from 'next/server';
import { analyzeChart } from '@/lib/gemini';
import { auth } from '@/auth';
import { db } from '@/db';
import { sessions, messages, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    // For demo/hackathon, we'll try to find or create a default user if no auth
    let userId = session?.user?.id;
    
    if (!userId) {
        // HACK: Create/Get a "Demo User" for persistence without login
        const demoEmail = 'demo@tradesense.ai';
        let user = await db.query.users.findFirst({ where: eq(users.email, demoEmail) });
        if (!user) {
            const [newUser] = await db.insert(users).values({ email: demoEmail, name: 'Demo User' }).returning();
            user = newUser;
        }
        userId = user.id;
    }

    const body = await req.json();
    const { image, userMessage } = body;

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    // Call Gemini
    const analysis = await analyzeChart(image, userMessage);

    // Persist Session
    const [newSession] = await db.insert(sessions).values({
        userId,
        title: userMessage ? `Analysis: ${userMessage.substring(0, 30)}...` : 'Chart Analysis',
    }).returning();

    // Persist Messages
    // 1. User Message (The Image + Optional Text)
    await db.insert(messages).values({
        sessionId: newSession.id,
        role: 'user',
        content: userMessage || 'Uploaded a chart for analysis',
        imageUrl: image, // Store base64 or URL (Truncation risk with base64 in text column? schema said 'text', which is infinite in PG. Should be fine for MVP)
    });

    // 2. Assistant Analysis
    await db.insert(messages).values({
        sessionId: newSession.id,
        role: 'assistant',
        content: analysis,
    });
    
    return NextResponse.json({ 
        analysis,
        sessionId: newSession.id 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
