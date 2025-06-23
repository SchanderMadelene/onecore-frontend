
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MessageSquarePlus, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ParkingSpaceComment } from "./types/comments";

interface ParkingSpaceCommentsProps {
  parkingSpaceId: string;
}

// Mock data för demonstration
const mockComments: ParkingSpaceComment[] = [
  {
    id: "1",
    parkingSpaceId: "123-123-123-0201",
    author: "Anna Andersson",
    content: "Kontaktat hyresgäst angående felaktig parkering. Kommer att följas upp nästa vecka.",
    timestamp: "2024-01-15T14:30:00Z",
    category: "issue"
  },
  {
    id: "2", 
    parkingSpaceId: "123-123-123-0201",
    author: "Erik Nilsson",
    content: "Markering på plats behöver målas om. Beställt underhåll.",
    timestamp: "2024-01-10T09:15:00Z",
    category: "maintenance"
  }
];

export function ParkingSpaceComments({ parkingSpaceId }: ParkingSpaceCommentsProps) {
  const [comments, setComments] = useState<ParkingSpaceComment[]>(
    mockComments.filter(comment => comment.parkingSpaceId === parkingSpaceId)
  );
  const [newComment, setNewComment] = useState("");
  const [category, setCategory] = useState<ParkingSpaceComment['category']>("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast({
        title: "Fel",
        description: "Kommentaren kan inte vara tom",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulera API-anrop
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const comment: ParkingSpaceComment = {
      id: Date.now().toString(),
      parkingSpaceId,
      author: "Nuvarande användare", // I verklig implementation hämtas från auth
      content: newComment,
      timestamp: new Date().toISOString(),
      category
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment("");
    setCategory("general");
    setIsSubmitting(false);
    
    toast({
      title: "Kommentar tillagd",
      description: "Din kommentar har sparats",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      general: "Allmänt",
      maintenance: "Underhåll", 
      issue: "Problem",
      information: "Information"
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      general: "bg-blue-50 text-blue-700 border-blue-200",
      maintenance: "bg-orange-50 text-orange-700 border-orange-200",
      issue: "bg-red-50 text-red-700 border-red-200", 
      information: "bg-green-50 text-green-700 border-green-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquarePlus className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Kommentarer och noteringar</h3>
        <Badge variant="outline" className="ml-auto">
          {comments.length} kommentarer
        </Badge>
      </div>

      {/* Formulär för ny kommentar */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-secondary/20">
        <div className="space-y-2">
          <label htmlFor="comment" className="text-sm font-medium">
            Ny kommentar
          </label>
          <Textarea
            id="comment"
            placeholder="Skriv din kommentar här..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="category" className="text-sm font-medium">
              Kategori
            </label>
            <Select value={category} onValueChange={(value) => setCategory(value as ParkingSpaceComment['category'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">Allmänt</SelectItem>
                <SelectItem value="information">Information</SelectItem>
                <SelectItem value="issue">Problem</SelectItem>
                <SelectItem value="maintenance">Underhåll</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
              {isSubmitting ? "Sparar..." : "Lägg till kommentar"}
            </Button>
          </div>
        </div>
      </form>

      <Separator />

      {/* Lista över kommentarer */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquarePlus className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Inga kommentarer än</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 border rounded-lg bg-card space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.author}</span>
                    {comment.category && (
                      <Badge variant="outline" className={getCategoryColor(comment.category)}>
                        {getCategoryLabel(comment.category)}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTimestamp(comment.timestamp)}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
