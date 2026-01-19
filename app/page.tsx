import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, BrainCircuit, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="px-6 h-16 flex items-center justify-between border-b border-white/10 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
             <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <span>TradeSense AI</span>
        </div>
        <div className="flex gap-4">
             <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
             </Button>
             <Button asChild>
                <Link href="/login">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
             </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden px-6">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
            
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl">
                    <span>🚀 Powered by Gemini 1.5 Pro</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent pb-2">
                    Master the Markets with <br className="hidden md:block"/> Intelligent Analysis
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    TradeSense AI is your educational mentor. Upload any chart, and get instant, step-by-step technical breakdown without the financial advice noise.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button size="lg" className="h-12 px-8 text-lg rounded-full" asChild>
                        <Link href="/login">Start Analyzing Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full" asChild>
                        <Link href="#features">Learn More</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 bg-muted/5">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Instant Analysis</h3>
                    <p className="text-muted-foreground">Upload a screenshot of any asset class. Our AI identifies trends, support/resistance, and patterns in seconds.</p>
                </div>
                
                <div className="p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <BrainCircuit className="h-6 w-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Educational Reasoning</h3>
                    <p className="text-muted-foreground">We don't just give you a signal. We teach you *why* the market is moving, enhancing your own trading intuition.</p>
                </div>

                <div className="p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Safe & Objective</h3>
                    <p className="text-muted-foreground">Built-in guardrails ensure no financial advice. Focus on pure technical analysis and market mechanics.</p>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-muted-foreground">
        <p>&copy; 2026 TradeSense AI. Built for the Future of Finance Hackathon.</p>
      </footer>
    </div>
  );
}
