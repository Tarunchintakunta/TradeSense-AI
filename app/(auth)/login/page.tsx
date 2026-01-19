import LoginForm from './login-form';
import { BarChart3 } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background p-6">
      <div className="absolute top-8 left-8 flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
             <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <span>TradeSense AI</span>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the dashboard.
          </p>
        </div>
        
        {/* Seed Data Card for Judges */}
        <div className="p-4 rounded-lg border bg-emerald-500/10 border-emerald-500/20 text-emerald-500 text-sm space-y-2">
            <p className="font-semibold text-xs uppercase tracking-wider opacity-70">Hackathon Judge Access</p>
            <div className="flex justify-between">
                <span className="opacity-70">Email:</span>
                <span className="font-mono bg-background/50 px-2 rounded select-all">judge@tradesense.ai</span>
            </div>
            <div className="flex justify-between">
                <span className="opacity-70">Password:</span>
                <span className="font-mono bg-background/50 px-2 rounded select-all">password</span>
            </div>
        </div>

        <div className="p-8 rounded-xl border bg-card/50 backdrop-blur-md shadow-2xl">
             <LoginForm />
        </div>
        
        <p className="px-8 text-center text-sm text-muted-foreground">
            Don't have an account? No problem, use the judge credentials above.
        </p>
      </div>
    </main>
  );
}
