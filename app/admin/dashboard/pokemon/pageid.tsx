'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { fetchPokemonDetails } from '@/lib/hooks/Details'; // Función para obtener los detalles del Pokémon
import { LoadingSpinner } from '@/components/ui/loading-spinner'; // Spinner de carga

export default function PokemonDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Obtener el ID desde la URL
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getPokemonDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPokemonDetails(id as string); // Traer los detalles desde la PokeAPI
        setPokemon(response);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemonDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
        <span className="ml-3 text-lg text-gray-600">Cargando...</span>
      </div>
    );
  }

  if (!pokemon) {
    return <div>Pokedex: Pokémon no encontrado.</div>;
  }

  return (
    <div className="p-6">
      <Button variant="outline" onClick={() => router.back()}>
        Volver
      </Button>
      <h1 className="text-3xl font-bold mb-4">{pokemon.name}</h1>
      <div className="mb-4">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Propiedades</h2>
        <ul>
          <li>Altura: {pokemon.height} m</li>
          <li>Peso: {pokemon.weight} kg</li>
          <li>Tipos: {pokemon.types.map((type: any) => type.type.name).join(', ')}</li>
          <li>Habilidades: {pokemon.abilities.map((ability: any) => ability.ability.name).join(', ')}</li>
          <li>HP: {pokemon.stats.hp}</li>
          <li>Ataque: {pokemon.stats.attack}</li>
          <li>Defensa: {pokemon.stats.defense}</li>
        </ul>
      </div>
    </div>
  );
}