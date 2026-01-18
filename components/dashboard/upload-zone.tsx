'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, X, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface UploadZoneProps {
  onImageSelected: (base64: string) => void;
}

export default function UploadZone({ onImageSelected }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
      setPreview(null);
      onImageSelected('');
      if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (preview) {
      return (
          <div className="relative w-full max-w-xl mx-auto rounded-lg overflow-hidden border bg-muted/20">
              <div className="relative aspect-video w-full">
                <Image src={preview} alt="Upload preview" fill className="object-contain" />
              </div>
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 rounded-full"
                onClick={clearImage}
              >
                  <X className="h-4 w-4" />
              </Button>
          </div>
      );
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-10 transition-colors cursor-pointer flex flex-col items-center justify-center text-center gap-4 min-h-[300px]
        ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'}
      `}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      <div className="p-4 rounded-full bg-muted/50 ring-1 ring-border">
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">Upload a Chart</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Drag & drop or click to browse
        </p>
      </div>
      <div className="text-xs text-muted-foreground px-3 py-1 bg-muted rounded-full">
          JPEG, PNG support
      </div>
    </div>
  );
}
