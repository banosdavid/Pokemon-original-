

export const fetchPokemonDetails = async (id: string) => {
  try {
    // Obtener los detalles básicos del Pokémon
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error('Error al obtener datos del Pokémon');

    const data = await res.json();

    // Obtener detalles adicionales del Pokémon (por ejemplo, gritos)
    const soundRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!soundRes.ok) throw new Error('Error al obtener sonido del Pokémon');

    const soundData = await soundRes.json();

    return {
      ...data,
      sounds: soundData.genera.find((g: any) => g.language.name === 'en')?.genus || 'Grito no disponible',
    };
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error;
  }
};