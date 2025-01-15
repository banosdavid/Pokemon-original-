'use client';

import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PokemonSearch } from '@/components/pokemon/PokemonSearch';
import { usePokemon } from '@/lib/hooks/usePokemon';
import { useState } from 'react';

export default function PokemonGridPage() {
  const { pokemon, isLoading, error } = usePokemon();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredPokemon = pokemon.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || p.types.includes(selectedType);
    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
        <span className="ml-3 text-lg text-gray-600">Loading Pokemon...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pokemon Grid</h1>
      
      <div className="mb-8">
        <PokemonSearch
          searchTerm={searchTerm}
          selectedType={selectedType}
          onSearchChange={setSearchTerm}
          onTypeChange={setSelectedType}
          types={Array.from(new Set(pokemon.flatMap((p) => p.types)))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}