export const fetchPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100'); // Puedes cambiar el número de Pokémon que deseas traer
    const data = await response.json();
    return data.results; // Devuelve una lista de Pokémon (nombre y URL)
  };