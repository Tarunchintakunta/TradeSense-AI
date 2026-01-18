'use client';

import { useState } from 'react';
import UploadZone from '@/components/dashboard/upload-zone';
import AnalysisView from '@/components/dashboard/analysis-view';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import ChatInterface from '@/components/dashboard/chat-interface';

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionImage, setSessionImage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleImageSelected = async (base64: string) => {
    if (!base64) {
        setSessionImage(null);
        setAnalysis(null);
        return;
    }
    
    setSessionImage(base64);
    setLoading(true);
    setAnalysis(null); // Clear previous
    setSessionId(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze');
      }

      setAnalysis(data.analysis);
      setSessionId(data.sessionId);
    } catch (error) {
      console.error(error);
      alert('Analysis failed. Please try again.'); // Simple alert for MVP
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
      setAnalysis(null);
      setSessionImage(null);
      // Ideally trigger child reset, but for MVP simple reload or state clear
      window.location.reload(); 
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold tracking-tight">Market Analysis</h1>
         {(analysis || loading) && (
             <Button variant="outline" size="sm" onClick={reset}>
                 <RefreshCcw className="mr-2 h-4 w-4" />
                 New Analysis
             </Button>
         )}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2 h-full">
         {/* Left Column: Upload / Image */}
         <div className="flex flex-col gap-4">
             {!sessionImage ? (
                <UploadZone onImageSelected={handleImageSelected} />
             ) : (
                <div className="relative rounded-lg overflow-hidden border bg-muted/20 aspect-video">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={sessionImage} alt="Analyzed Chart" className="object-contain w-full h-full" />
                </div>
             )}
         </div>

         {/* Right Column: Analysis & Chat */}
         <div className="flex flex-col h-full min-h-[400px] gap-4">
            {(sessionImage || loading) ? (
                <>
                    <AnalysisView analysis={analysis} loading={loading} />
                    {sessionId && !loading && (
                        <div className="h-[400px]">
                            <ChatInterface sessionId={sessionId} />
                        </div>
                    )}
                </>
            ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg p-10 text-muted-foreground bg-muted/10">
                    <div className="text-center space-y-2">
                        <p>Analysis will appear here</p>
                        <p className="text-xs">Upload a chart to begin</p>
                    </div>
                </div>
            )}
         </div>
      </div>
    </div>
  );
}
