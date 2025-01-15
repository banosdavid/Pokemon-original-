import { Pokemon } from './types';

// Simulated database
let pokemonData: Pokemon[] = [];

export async function fetchPokemonData() {
  if (pokemonData.length === 0) {
    try {
      const promises = Array.from({ length: 1000 }, (_, i) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((res) => res.json())
      );

      const results = await Promise.all(promises);
      
      pokemonData = results.map((data) => ({
        id: data.id,
        name: data.name,
        types: data.types.map((t: any) => t.type.name),
        stats: {
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          specialAttack: data.stats[3].base_stat,
          specialDefense: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
        },
        imageUrl: data.sprites.other['official-artwork'].front_default,
        description: '',
      }));
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      throw new Error('Failed to fetch Pokemon data');
    }
  }
  return pokemonData;
}