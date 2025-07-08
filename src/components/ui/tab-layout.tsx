import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface TabLayoutProps {
  title?: string;
  icon?: LucideIcon;
  count?: number;
  children: ReactNode;
  className?: string;
  showCard?: boolean;
  showHeader?: boolean;
}

export const TabLayout = ({ 
  title, 
  icon: Icon, 
  count, 
  children, 
  className = "",
  showCard = true,
  showHeader = true
}: TabLayoutProps) => {
  const isMobile = useIsMobile();

  if (!showCard) {
    return (
      <div className={`space-y-6 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      {title && showHeader && !isMobile && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5" />}
            {title}
            {count !== undefined && ` (${count})`}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={`space-y-6 ${isMobile && title && showHeader ? "pt-6" : ""}`}>
        {children}
      </CardContent>
    </Card>
  );
};