// pages/battle.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchPokemons } from '@/components/fetchPokemons';
import { combate } from '@/components/combatFunctions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Componente reutilizado de detalles del Pokémon
const PokemonCard = ({ pokemon }: { pokemon: any }) => {
  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>{pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={pokemon.sprites.other?.dream_world?.front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32"
        />
        <div className="mt-4">
          <p><strong>HP:</strong> {pokemon.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat}</p>
          <p><strong>Attack:</strong> {pokemon.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat}</p>
          <p><strong>Defense:</strong> {pokemon.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const BattlePage = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [pokemon1, setPokemon1] = useState<any>(null);
  const [pokemon2, setPokemon2] = useState<any>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      const pokemonsData = await fetchPokemons();
      setPokemons(pokemonsData);
    };
    loadPokemons();
  }, []);

  const handlePokemon1Change = (value: string) => {
    const selectedPokemon = pokemons.find((p) => p.name === value);
    setPokemon1(selectedPokemon);
  };

  const handlePokemon2Change = (value: string) => {
    const selectedPokemon = pokemons.find((p) => p.name === value);
    setPokemon2(selectedPokemon);
  };

  const handleBattle = () => {
    if (pokemon1 && pokemon2) {
      const resultado = combate(pokemon1, pokemon2);
      setResult(resultado);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold">¡Combate Pokémon!</h1>

      <div className="mt-4 flex flex-row space-x-4">
        <div>
          <label htmlFor="pokemon1" className="block">Selecciona el primer Pokémon:</label>
          <Select value={pokemon1 ? pokemon1.name : ''} onValueChange={handlePokemon1Change}>
            <SelectTrigger className="p-2 border rounded-md">
              <SelectValue placeholder="Selecciona un Pokémon" />
            </SelectTrigger>
            <SelectItem value="">Selecciona un Pokémon</SelectItem>
            {pokemons.map((pokemon) => (
              <SelectItem key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="pokemon2" className="block">Selecciona el segundo Pokémon:</label>
          <Select value={pokemon2 ? pokemon2.name : ''} onValueChange={handlePokemon2Change}>
            <SelectTrigger className="p-2 border rounded-md">
              <SelectValue placeholder="Selecciona un Pokémon" />
            </SelectTrigger>
            <SelectItem value="">Selecciona un Pokémon</SelectItem>
            {pokemons.map((pokemon) => (
              <SelectItem key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-4 flex space-x-8">
        {pokemon1 && <PokemonCard pokemon={pokemon1} />}
        {pokemon2 && <PokemonCard pokemon={pokemon2} />}
      </div>

      <div className="mt-4">
        <Button onClick={handleBattle} className="bg-blue-500 text-white rounded-md px-4 py-2">
          Comenzar Batalla
        </Button>
      </div>

      {result && (
        <div className="mt-4">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default BattlePage;
