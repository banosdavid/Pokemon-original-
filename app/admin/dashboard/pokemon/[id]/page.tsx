'use client'; // Marca este componente como un componente del cliente

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PokemonDetailProps {
  params: {
    id: string; // Este es el parámetro dinámico de la URL
  };
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ params }) => {
  const { id } = params; // Obtener el valor del parámetro 'id' de la URL
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Estado para la carga de datos
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  // Se ejecuta cuando el componente se monta o el 'id' cambia
  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true); // Iniciar la carga de datos
      setError(null); // Restablecer errores previos
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el Pokémon');
        }
        const data = await response.json();
        setPokemonData(data); // Guardar los datos en el estado
      } catch (error) {
        setError('Error al cargar los datos del Pokémon');
      } finally {
        setLoading(false); // Finalizar carga
      }
    };

    fetchPokemonData();
  }, [id]); // Dependencia del 'id' para recargar los datos cuando cambie

  if (loading) {
    return <p>Cargando datos del Pokémon...</p>; // Mostrar cargando mientras los datos se obtienen
  }

  if (error) {
    return <p>{error}</p>; // Mostrar mensaje de error si algo falla
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Pokémon</CardTitle>
        </CardHeader>
        <CardContent>
          {pokemonData ? (
            <div>
              <h1 className="text-xl font-bold">{pokemonData.name}</h1>
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
                className="w-40 h-40"
              />
              <p>Tipos: {pokemonData.types.map((t: any) => t.type.name).join(', ')}</p>
              <p>HP: {pokemonData.stats[0].base_stat}</p>
              <p>Attack: {pokemonData.stats[1].base_stat}</p>
              <p>Defense: {pokemonData.stats[2].base_stat}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.history.back()} // Volver atrás en la navegación
              >
                Volver a la lista
              </Button>
            </div>
          ) : (
            <p>No se encontraron datos para este Pokémon.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonDetail;