import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PropertySearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const PropertySearch = ({ searchQuery, setSearchQuery }: PropertySearchProps) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Sök på beteckning, kod, byggnad, lägenhet..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
