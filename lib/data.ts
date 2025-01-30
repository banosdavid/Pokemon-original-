import { Pokemon } from './types';

export async function fetchPokemonData(limit: number, offset: number): Promise<{ results: Pokemon[], count: number }> {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const promises = data.results.map(async (pokemon: { url: string }) =>
      fetch(pokemon.url).then((res) => res.json())
    );

    const results = await Promise.all(promises);

    // El total de Pokémon
    const count = data.count;

    return {
      results: results.map((data) => ({
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
      })),
      count: count, // El total de Pokémon
    };
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    throw new Error('Failed to fetch Pokemon data');
  }
}