import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { db } from '@/db';
import { sessions } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'History - TradeSense',
  description: 'Your analysis history',
};

async function getHistory() {
  const session = await auth();
  let userId = session?.user?.id;

   if (!userId) {
       // Demo User Fallback for Server Component
       const demoUser = await db.query.users.findFirst({
           where: (users, { eq }) => eq(users.email, 'demo@tradesense.ai')
       });
       if (demoUser) userId = demoUser.id;
    }

  if (!userId) return [];

  const data = await db.query.sessions.findMany({
    where: eq(sessions.userId, userId),
    orderBy: [desc(sessions.createdAt)],
  });
  
  return data;
}

export default async function HistoryPage() {
  const history = await getHistory();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold tracking-tight">Analysis History</h1>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg bg-muted/10 text-muted-foreground gap-4">
            <Clock className="h-10 w-10 opacity-50" />
            <p>No analysis history yet.</p>
            <Button asChild>
                <Link href="/">Start New Analysis</Link>
            </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {history.map((session) => (
                <Card key={session.id} className="hover:bg-muted/50 transition-colors">
                    <CardHeader className="pb-3">
                        <CardTitle className="leading-none text-base truncate">
                            {session.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-xs">
                            <Calendar className="h-3 w-3" />
                            {new Date(session.createdAt).toLocaleDateString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="secondary" size="sm" className="w-full">
                            <Link href={`/?sessionId=${session.id}`}>
                                View Details <ArrowRight className="ml-2 h-3 w-3" />
                            </Link>
                        </Button>
                        {/* Note: In a real app we'd route to /analysis/[id], but for this MVP 
                            we might just reload the dashboard state if we implement query param reading.
                            See Next Step.
                        */}
                    </CardContent>
                </Card>
            ))}
        </div>
      )}
    </div>
  );
}
