
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
  maxHeight = "70vh" 
}: FormWrapperProps) {
  return (
    <div className={cn("flex flex-col h-full max-h-screen", className)}>
      <ScrollArea className="flex-1 overflow-auto">
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
