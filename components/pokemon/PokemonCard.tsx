'use client';

import { Pokemon } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400',
};

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        {pokemon.imageUrl && (
          <div className="relative h-48 bg-gray-50">
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              fill
              className="object-contain p-4"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold capitalize mb-2">{pokemon.name}</h3>
        <div className="flex gap-2 flex-wrap">
          {pokemon.types.map((type) => (
            <Badge
              key={type}
              className={`${typeColors[type] || 'bg-gray-500'} text-white`}
            >
              {type}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div>
            <span className="text-gray-500">HP:</span>
            <span className="ml-2 font-medium">{pokemon.stats.hp}</span>
          </div>
          <div>
            <span className="text-gray-500">Attack:</span>
            <span className="ml-2 font-medium">{pokemon.stats.attack}</span>
          </div>
          <div>
            <span className="text-gray-500">Defense:</span>
            <span className="ml-2 font-medium">{pokemon.stats.defense}</span>
          </div>
          <div>
            <span className="text-gray-500">Speed:</span>
            <span className="ml-2 font-medium">{pokemon.stats.speed}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}