
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface FormWrapperProps {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
  maxHeight?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function FormWrapper({ 
  children, 
  className, 
  onSubmit,
  maxHeight = "100vh",
  header,
  footer
}: FormWrapperProps) {
  const content = onSubmit ? (
    <form onSubmit={onSubmit} className="h-full flex flex-col">
      {header && (
        <div className="flex-shrink-0 bg-background border-b p-4">
          {header}
        </div>
      )}
      
      <ScrollArea className="flex-1 min-h-0">
        <div className={cn("p-6 space-y-6", footer && "pb-24")}>
          {children}
        </div>
      </ScrollArea>
      
      {footer && (
        <div className="flex-shrink-0 bg-background border-t p-4">
          {footer}
        </div>
      )}
    </form>
  ) : (
    <div className="h-full flex flex-col">
      {header && (
        <div className="flex-shrink-0 bg-background border-b p-4">
          {header}
        </div>
      )}
      
      <ScrollArea className="flex-1 min-h-0">
        <div className={cn("p-6 space-y-6", footer && "pb-24")}>
          {children}
        </div>
      </ScrollArea>
      
      {footer && (
        <div className="flex-shrink-0 bg-background border-t p-4">
          {footer}
        </div>
      )}
    </div>
  );

  return (
    <div 
      className={cn("flex flex-col h-full max-h-screen overflow-hidden", className)} 
      style={{ maxHeight }}
    >
      {content}
    </div>
  );
}
