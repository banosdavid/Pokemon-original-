'use client';

interface PokemonSearchProps {
  selectedType: string;
  onTypeChange: (value: string) => void;
  types: string[];
}

export function PokemonSearch({
  selectedType,
  types,
}: PokemonSearchProps) {
  return (
    <div className="flex gap-4 mt-4">
      
      <select
        className="border rounded-md px-3 py-2"
        value={selectedType}
        onChange={(e) =>(e.target.value)}
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