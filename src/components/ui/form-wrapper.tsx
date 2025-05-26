
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface FormWrapperProps {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
  maxHeight?: string;
}

export function FormWrapper({ 
  children, 
  className, 
  onSubmit,
  maxHeight = "80vh" 
}: FormWrapperProps) {
  return (
    <div className="max-h-screen overflow-hidden p-4">
      <ScrollArea className={cn("w-full", className)} style={{ height: maxHeight }}>
        <div className="p-6 space-y-6">
          {onSubmit ? (
            <form onSubmit={onSubmit} className="space-y-6">
              {children}
            </form>
          ) : (
            <div className="space-y-6">
              {children}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
