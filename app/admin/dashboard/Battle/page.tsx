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
  const [winner, setWinner] = useState<string | null>(null);


  useEffect(() => {
    const loadPokemons = async () => {
      const pokemonsData = await fetchPokemons();
      setPokemons(pokemonsData);
    };
    loadPokemons();
  }, []);

useEffect(() => {
  const subirSeleccion = async () => {
    if (
      !pokemon1?.name ||
      !pokemon2?.name ||
      !pokemon1?.types ||
      !pokemon2?.types
    )
      return;

    const data = {
      pokemon1: {
        name: pokemon1.name,
        stats: pokemon1.stats || [],
        types: pokemon1.types.map((t: any) => t?.type?.name) || [],
      },
      pokemon2: {
        name: pokemon2.name,
        stats: pokemon2.stats || [],
        types: pokemon2.types.map((t: any) => t?.type?.name) || [],
      },
      fecha: new Date().toISOString(),
    };

    try {
      await fetch("/api/ftp/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("✅ Selección subida");
    } catch (err) {
      console.error("❌ Error al subir selección:", err);
    }
  };

  subirSeleccion();
}, [pokemon1, pokemon2]);


  const handlePokemonChange = (value: string, setPokemon: Function) => {
    setPokemon(pokemons.find((p) => p.name === value) || null);
  };

  const simulateBattle = async () => {
  if (!pokemon1 || !pokemon2) return;

  if (pokemon1.id === pokemon2.id) {
    setResult('¡Es un empate! Ambos Pokémon son el mismo y no pelean.');
    return;
  }

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const types1 = pokemon1.types.map((type: any) => type?.type?.name);
  const types2 = pokemon2.types.map((type: any) => type?.type?.name);
  const areSameType = types1.every((type: any) => types2.includes(type));

  let hp1 = pokemon1.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat || 0;
  let hp2 = pokemon2.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat || 0;
  const attack1 = pokemon1.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat || 0;
  const attack2 = pokemon2.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat || 0;
  const defense1 = pokemon1.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat || 0;
  const defense2 = pokemon2.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat || 0;
  const speed1 = pokemon1.stats.find((stat: any) => stat.stat.name === 'speed')?.base_stat || 0;
  const speed2 = pokemon2.stats.find((stat: any) => stat.stat.name === 'speed')?.base_stat || 0;

  const effectiveness1 = areSameType ? 1 : getTypeEffectiveness(types1, types2);
  const effectiveness2 = areSameType ? 1 : getTypeEffectiveness(types2, types1);

  let logMessages: string[] = [];

  const log = (msg: string) => {
    logMessages.push(msg);
    setResult(prev => (prev ? prev + "\n" + msg : msg));
  };
  
  const randomMultiplier = () => {
    const base = 8 + Math.random() * 4;
    return base;
  };

 const calculateDamage = (
    attack: number,
    defense: number,
    effectiveness: number
  ) => {
    const multiplier = randomMultiplier();
    const damage = ((attack * effectiveness) / (defense + 1)) * multiplier;
    return Math.max(damage, 1);  };
  

  setResult("");
  log("¡La batalla comienza!");
  await delay(1000);

  const first = speed1 >= speed2 ? 'pokemon1' : 'pokemon2';

  while (hp1 > 0 && hp2 > 0) {
    if (first === 'pokemon1') {
      
      const dmg2 = calculateDamage(attack1, defense2, effectiveness1);
      hp2 -= dmg2;
      log(`${pokemon1.name} ataca a ${pokemon2.name} y causa ${dmg2.toFixed(1)} de daño`);
      await delay(1000);
      if (hp2 <= 0) break;
  
      const dmg1 = calculateDamage(attack2, defense1, effectiveness2);
      hp1 -= dmg1;
      log(`${pokemon2.name} ataca a ${pokemon1.name} y causa ${dmg1.toFixed(1)} de daño`);
      await delay(1000);
    } else {
     
      const dmg1 = calculateDamage(attack2, defense1, effectiveness2);
      hp1 -= dmg1;
      log(`${pokemon2.name} ataca a ${pokemon1.name} y causa ${dmg1.toFixed(1)} de daño`);
      await delay(1000);
      if (hp1 <= 0) break;
  
      const dmg2 = calculateDamage(attack1, defense2, effectiveness1);
      hp2 -= dmg2;
      log(`${pokemon1.name} ataca a ${pokemon2.name} y causa ${dmg2.toFixed(1)} de daño`);
      await delay(1000);
    }
  }
  

  if (hp1 > 0 && hp2 <= 0) {
    log(`${pokemon1.name} gana con ${hp1.toFixed(1)} HP restante. ${pokemon2.name} pierde con 0 HP.`);
    setWinner(pokemon1.name);
  } else if (hp2 > 0 && hp1 <= 0) {
    log(`${pokemon2.name} gana con ${hp2.toFixed(1)} HP restante. ${pokemon1.name} pierde con 0 HP.`);
    setWinner(pokemon2.name);
  } else {
    log(`¡Es un empate! Ambos Pokémon cayeron.`);
    setWinner("Empate");
  }
  

  const extractStats = (pokemon: any) => {
    const get = (name: string) =>
      pokemon.stats.find((s: any) => s.stat.name === name)?.base_stat || 0;
    return {
      hp: get('hp'),
      attack: get('attack'),
      defense: get('defense'),
      specialAttack: get('special-attack'),
      specialDefense: get('special-defense'),
      speed: get('speed'),
    };
  };
  
  const guardarBatalla = async () => {
    const winner = hp1 > 0 && hp2 <= 0 ? pokemon1.name :
                   hp2 > 0 && hp1 <= 0 ? pokemon2.name : 'Empate';
  
    await fetch('/api/battle/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        player1: { name: pokemon1.name, stats: extractStats(pokemon1) },
        player2: { name: pokemon2.name, stats: extractStats(pokemon2) },
        winner,
        battleLog: logMessages,
      }),
    });
  };
  
  
  guardarBatalla();
  
};


  

  const handleRestart = () => {
    setPokemon1(null);
    setPokemon2(null);
    setResult(null);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">¡Combate Pokémon!</h1>

      <div className="flex space-x-4 mb-8">
        {[{ label: 'Primer Pokémon', set: setPokemon1, value: pokemon1 }, 
        { label: 'Segundo Pokémon', set: setPokemon2, value: pokemon2 }].map(({ label, set, value }, index) => (
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
      {winner && (
  <h2 className="text-4xl font-bold text-green-600 mt-6">
    🏆 Ganador: {winner.toUpperCase()}
  </h2>
)}
   <pre style={{ whiteSpace: "pre-wrap", background: "#f0f0f0", padding: "1rem", borderRadius: "8px", marginTop: "1rem" }}>
  {result}
</pre>
    </div>
  );
};

export default BattlePage;
