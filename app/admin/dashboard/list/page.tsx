'use client';

import { useState, useEffect } from 'react';
import { PokemonList } from '@/components/pokemon/PokemonList'; // Asegúrate de que PokemonList esté exportado correctamente
import { usePokemon } from '@/lib/hooks/usePokemon'; // Hook para obtener los Pokémon
import Loading from "@/components/loading"; // Correcta si está en el directorio correcto
import { PokemonDetails, Pokemon } from "@lib/types"; // Importar ambos tipos: Pokemon y PokemonDetails

// Enum para manejar los tipos de error
enum FetchError {
  NetworkError = "NetworkError",
  DataError = "DataError",
}

export default function PokemonListPage() {
  const { pokemon, isLoading, error } = usePokemon(); // Llamada al hook para obtener los datos de los Pokémon
  
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]); // Pokémon a mostrar en la página, ahora es un array de Pokemon

  // Asegurarse de que 'pokemon' sea válido antes de actualizar el estado
  useEffect(() => {
    if (pokemon) {
      // Mapear PokemonDetails[] a Pokemon[] e incluir 'description'


      setPokemonData(pokemon); // Actualiza el estado con los datos transformados
      setTotalPages(Math.ceil(pokemon.length / 20)); // Calcula el número de páginas
    }
  }, [pokemon]);

  // Manejar el cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Actualiza la página actual
  };

  // Cargar la página actual de Pokémon
  const currentPokemonDatePage = pokemonData.slice((currentPage - 1) * 20, currentPage * 20);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pokemon List</h1>
      
      {isLoading ? (
        <Loading /> // Muestra el componente de carga mientras se obtienen los Pokémon
      ) : error ? (
        <div className="text-red-500">{error}</div> // Si hay un error, se muestra aquí
      ) : (
        <PokemonList 
          pokemons={currentPokemonDatePage} // Pasa los Pokémon para la página actual
          isLoading={isLoading} // Pasa el estado de carga
          currentPage={currentPage} // Página actual
          total={pokemonData.length} // Total de Pokémon disponibles
          totalPages={totalPages} // Total de páginas
          onPageChange={handlePageChange} // Función para cambiar de página
        />
      )}
    </div>
  );
}

export function PokemonPage() {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null); // Cambié el tipo a PokemonDetails por claridad
  const [error, setError] = useState<string | null>(null); // Mejor control de los errores
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");

        if (!response.ok) {
          throw new Error(FetchError.NetworkError);
        }

        const data = await response.json();

        // Verificamos si los datos cumplen con la estructura de `PokemonDetails`
        const pokemonData: PokemonDetails = {
          name: data.name,
          height: data.height,
          weight: data.weight,
          sprites: {
            front_default: data.sprites.front_default,
          },
          // Añadí una descripción predeterminada por ahora
          description: data.description || 'No description available', 
        };
        setPokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError("Failed to fetch Pokémon data.");
        } else {
          setError("An unknown error occurred.");
        }
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      setLoading(true); // Limpiar el estado de carga si el componente se desmonta
    };
  }, []);

  // Mostrar el componente de carga mientras se obtiene el Pokémon
  if (loading) {
    return <Loading />;
  }

  // Mostrar error si ocurre algún problema
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Verificar si pokemon es null antes de acceder a sus propiedades
  if (!pokemon) {
    return <p>No Pokémon data found.</p>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Description: {pokemon.description}</p> {/* Mostrar la descripción */}
    </div>
  );
}