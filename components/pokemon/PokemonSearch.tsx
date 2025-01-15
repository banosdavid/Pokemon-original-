'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PokemonSearchProps {
  searchTerm: string;
  selectedType: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  types: string[];
}

export function PokemonSearch({
  searchTerm,
  selectedType,
  onSearchChange,
  onTypeChange,
  types,
}: PokemonSearchProps) {
  return (
    <div className="flex gap-4 mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search pokemon..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <select
        className="border rounded-md px-3 py-2"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="all">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}