'use client';

import { useEffect, useState } from 'react';
import { fetchPokemons } from '@/components/fetchPokemons';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { getTypeEffectiveness } from '@/components/typeEffectiveness';

const PokemonCard = ({ pokemon }: { pokemon: any }) => {
  const spriteUrl = pokemon.sprites.other?.dream_world?.front_default || pokemon.sprites.front_default;
  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>{pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <img src={spriteUrl} alt={pokemon.name} className="w-32 h-32 mx-auto" />
        <div className="mt-4">
          {pokemon.stats.map((stat: any) => (
            <p key={stat.stat.name}>
              <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const BattlePage = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [pokemon1, setPokemon1] = useState<any | null>(null);
  const [pokemon2, setPokemon2] = useState<any | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      const pokemonsData = await fetchPokemons();
      setPokemons(pokemonsData);
    };
    loadPokemons();
  }, []);

  const handlePokemonChange = (value: string, setPokemon: Function) => {
    setPokemon(pokemons.find((p) => p.name === value) || null);
  };

  const simulateBattle = () => {
    if (pokemon1 && pokemon2) {
      // Verificar si los Pokémon son idénticos por ID
      if (pokemon1.id === pokemon2.id) {
        setResult('¡Es un empate! Ambos Pokémon son el mismo y no pelean.');
        return; // Terminar la batalla si tienen la misma ID
      }
  
      // Verificar si los Pokémon son del mismo tipo
      const types1 = pokemon1.types.map((type: any) => type?.type?.name);
      const types2 = pokemon2.types.map((type: any) => type?.type?.name);
  
      // Verificar si ambos Pokémon tienen los mismos tipos
      const areSameType = types1.every((type: any) => types2.includes(type));
  
      // Si ambos Pokémon son del mismo tipo
      if (areSameType) {
        setResult('¡Batalla entre Pokémon del mismo tipo! La victoria depende de las estadísticas.');
      } else if (pokemon1.name === pokemon2.name) {
        // Si ambos Pokémon tienen el mismo nombre
        setResult('¡Es un empate! Ambos Pokémon son iguales.');
        return; // Finalizar la batalla si son iguales
      }
  
      // Preparar la batalla
      let hp1 = pokemon1.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat || 0;
      let hp2 = pokemon2.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat || 0;
      const attack1 = pokemon1.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat || 0;
      const attack2 = pokemon2.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat || 0;
      const defense1 = pokemon1.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat || 0;
      const defense2 = pokemon2.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat || 0;
  
      // Usar efectividad 1 si los Pokémon son del mismo tipo
      const effectiveness1 = areSameType ? 1 : getTypeEffectiveness(types1, types2);
      const effectiveness2 = areSameType ? 1 : getTypeEffectiveness(types2, types1);
  
      // Calcular el daño total para cada Pokémon sin depender de los turnos
      const totalDamageToPokemon2 = Math.max((attack1 * effectiveness1) - defense2,0);
      const totalDamageToPokemon1 = Math.max((attack2 * effectiveness2) - defense1,0);
  
      // Calcular los HP restantes después de todo el daño
      const remainingHP1 = (hp1 - totalDamageToPokemon2);
      const remainingHP2 = (hp2 - totalDamageToPokemon1);
  
      // Determinar el ganador
      let winner: string;
  
      if (remainingHP1 > remainingHP2) {
        winner = pokemon1.name;
        setResult(`${pokemon1.name} gana con ${remainingHP1} HP restante.`);
      } else if (remainingHP2 > remainingHP1) {
        winner = pokemon2.name;
        setResult(`${pokemon2.name} gana con ${remainingHP2} HP restante.`);
      } else {
        winner = "Ninguno";
        setResult("¡Es un empate! Ambos Pokémon caen al mismo tiempo.");
      }
    }
  };

  const handleRestart = () => {
    setPokemon1(null);
    setPokemon2(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">¡Combate Pokémon!</h1>

      <div className="flex space-x-4 mb-8">
        {[{ label: 'Primer Pokémon', set: setPokemon1, value: pokemon1 }, { label: 'Segundo Pokémon', set: setPokemon2, value: pokemon2 }].map(({ label, set, value }, index) => (
          <div key={index}>
            <Label className="block mb-2">{label}:</Label>
            <Select onValueChange={(v) => handlePokemonChange(v, set)} value={value?.name || ''}>
              <SelectTrigger>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {pokemons.map((pokemon) => (
                  <SelectItem key={pokemon.name} value={pokemon.name}>{pokemon.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="flex space-x-8">
        {pokemon1 && <PokemonCard pokemon={pokemon1} />}
        {pokemon2 && <PokemonCard pokemon={pokemon2} />}
      </div>

      <div className="mt-4 flex space-x-4">
        <Button onClick={simulateBattle}>Comenzar Batalla</Button>
        <Button onClick={handleRestart}>Reiniciar</Button>
      </div>

      {result && <p className="mt-4 text-4xl font-bold text-red-500">{result}</p>}
    </div>
  );
};

export default BattlePage;
