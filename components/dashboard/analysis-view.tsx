'use client';

import React_Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Or any style
import { Skeleton } from '@/components/ui/skeleton';

interface AnalysisViewProps {
  analysis: string | null;
  loading: boolean;
}

export default function AnalysisView({ analysis, loading }: AnalysisViewProps) {
  if (loading) {
    return (
      <div className="space-y-4 p-4 border rounded-lg h-full">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <div className="h-4" />
        <Skeleton className="h-32 w-full rounded-md" />
        <div className="flex gap-2">
             <span className="text-xs text-muted-foreground animate-pulse">AI is analyzing patterns...</span>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none p-6 border rounded-lg bg-card shadow-sm overflow-y-auto max-h-[calc(100vh-200px)]">
      <React_Markdown rehypePlugins={[rehypeHighlight]}>
        {analysis}
      </React_Markdown>
    </div>
  );
}
