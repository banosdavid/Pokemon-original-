import { Pokemon } from './types';


let pokemonData: Pokemon[] = [];

export async function fetchPokemonData() {
  if (pokemonData.length === 0) {
    try {
      // Paso 1: Obtener la lista de URLs de todos los Pokémon
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000'); 
      const data = await response.json();
      
      // Paso 2: Crear un arreglo de promesas para obtener todos los detalles de cada Pokémon
      const promises = data.results.map((pokemon: { url: string }) =>
        fetch(pokemon.url).then((res) => res.json())
      );

      // Paso 3: Esperar todas las promesas y procesar los resultados
      const results = await Promise.all(promises);

      // Paso 4: Mapear los resultados a la estructura deseada
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
      }));
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      throw new Error('Failed to fetch Pokemon data');
    }
  }

  return pokemonData;
}