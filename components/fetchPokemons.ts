// fetchPokemons.ts
export const fetchPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
  const data = await response.json();

  const pokemonData = await Promise.all(
    data.results.map(async (pokemon: { name: string, url: string }) => {
      const pokemonDetails = await fetch(pokemon.url);
      const pokemonJson = await pokemonDetails.json();

      return {
        name: pokemonJson.name,
        id: pokemonJson.id,
        stats: pokemonJson.stats,
        sprites: pokemonJson.sprites,
        types: pokemonJson.types.map((type: any) => type.type.name), // Obtenemos los tipos del Pokémon
      };
    })
  );

  return pokemonData;
};