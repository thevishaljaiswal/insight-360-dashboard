
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CustomerSearchProps {
  onSearch: (query: string) => void;
}

export default function CustomerSearch({ onSearch }: CustomerSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ID, email or phone..."
            className="pl-10 py-6 transition-all bg-background border-border focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button type="submit" className="px-6">Search</Button>
      </div>
    </form>
  );
}
