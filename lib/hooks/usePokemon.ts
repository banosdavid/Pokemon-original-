'use client';

import { useState, useEffect } from 'react';
import { Pokemon } from '@/lib/types';
import { fetchPokemonData } from '@/lib/data';

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchPokemonData();
        setPokemon(data);
        setError(null);
      } catch (error) {
        console.error('Error loading pokemon:', error);
        setError('Failed to load Pokemon data');
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemon();
  }, []);

  return { pokemon, isLoading, error };
}