
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';

interface TableSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetPage: () => void;
}

export default function TableSearch({
  searchQuery,
  setSearchQuery,
  resetPage,
}: TableSearchProps) {
  return (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          resetPage(); // Reset to first page on search
        }}
        placeholder="Search..."
        className="pl-10 py-2 transition-all bg-background border-border"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
          onClick={() => {
            setSearchQuery('');
            resetPage();
          }}
        >
          <X size={16} />
        </Button>
      )}
    </div>
  );
}
