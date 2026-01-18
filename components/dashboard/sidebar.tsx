import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, History, PlusCircle, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full border-r bg-muted/10">
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
                TS
            </div>
            TradeSense
        </Link>
      </div>
      
      <div className="flex-1 py-4 px-3 space-y-2">
        <Button asChild variant="secondary" className="w-full justify-start">
            <Link href="/">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Analysis
            </Link>
        </Button>
        <div className="h-4" /> {/* Spacer */}
        <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Menu
        </h3>
        <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
            </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/history">
                <History className="mr-2 h-4 w-4" />
                History
            </Link>
        </Button>
      </div>

       <div className="p-4 border-t">
         <div className="text-xs text-muted-foreground text-center">
             Hackathon Build v1.0
         </div>
       </div>
    </div>
  );
}
