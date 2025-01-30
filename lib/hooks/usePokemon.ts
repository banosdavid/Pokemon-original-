import { useState, useEffect } from 'react';
import { Pokemon } from '@/lib/types';
import { fetchPokemonData } from '@/lib/data';

export function usePokemon(limit: number, offset: number) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0); // Total de Pokémon
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const { results, count } = await fetchPokemonData(limit, offset);
        setPokemon(results);
        setTotal(count); // El total de Pokémon
        setError(null);
      } catch (error) {
        console.error('Error loading pokemon:', error);
        setError('Failed to load Pokemon data');
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemon();
  }, [limit, offset]);

  return { pokemon, isLoading, total, error };
}