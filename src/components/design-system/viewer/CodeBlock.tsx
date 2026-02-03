import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock = ({
  code,
  language = "tsx",
  showLineNumbers = false,
  className,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className={cn("relative group rounded-lg overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/80 border-b">
        <span className="text-xs font-mono text-muted-foreground uppercase">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1 text-success" />
              <span className="text-xs">Kopierad!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Kopiera</span>
            </>
          )}
        </Button>
      </div>

      {/* Code content */}
      <div className="bg-muted/40 overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          {showLineNumbers ? (
            <code>
              {lines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="w-8 text-muted-foreground/50 select-none text-right pr-4">
                    {index + 1}
                  </span>
                  <span className="flex-1">{line}</span>
                </div>
              ))}
            </code>
          ) : (
            <code className="whitespace-pre-wrap break-words">{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
};
