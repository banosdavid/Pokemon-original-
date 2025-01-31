// components/PokemonGridPage.tsx
'use client';

import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { usePokemon } from '@/lib/hooks/usePokemon';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';

export default function PokemonGridPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Cálculo de offset para la paginación
  const offset = (currentPage - 1) * cardsPerPage;

  // Obtener los Pokémon de la API con paginación
  const { pokemon, isLoading, total } = usePokemon(cardsPerPage, offset);

  // Calcular el total de páginas
  const totalPages = Math.ceil(total / cardsPerPage);

  // Cambiar de página
  const handlePageChange = (page: number) => setCurrentPage(page);

  // Calcular el rango de elementos mostrados en la página actual
  const startItem = (currentPage - 1) * cardsPerPage + 1;
  const endItem = Math.min(currentPage * cardsPerPage, totalItems);

  // useEffect para manejar el total de elementos cuando cargue
  useEffect(() => {
    if (!isLoading) {
      setTotalItems(total);  // Actualizamos el total de elementos cuando ya cargó la data
    }
  }, [total, isLoading]);

  const router = useRouter();

  // Función que maneja la redirección a la página de batalla
  const handleGoToBattlePage = (pokemon1: string, pokemon2: string) => {
    router.push(`/battle?pokemon1=${pokemon1}&pokemon2=${pokemon2}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
        <span className="ml-3 text-lg text-gray-600">Loading Pokemon...</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pokemon Grid</h1>
  
      {/* Mostrar Pokémon en la cuadrícula */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pokemon.map((pokemon) => (
          <div key={pokemon.name} className="card">
            <PokemonCard pokemon={pokemon} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGoToBattlePage(pokemon.name, 'charizard')} // Aquí 'charizard' es un ejemplo
            >
              Ir a la Batalla
            </Button>
          </div>
        ))}
      </div>
  
      {/* Controles de Paginación */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center ml-4">
          <Label htmlFor="cardsPerPage" className="mr-2 font-medium">
            Cards per page:
          </Label>
          <select
            id="cardsPerPage"
            value={cardsPerPage}
            onChange={(e) => setCardsPerPage(Number(e.target.value))}
            className="border rounded-md p-2"
          >
            <option value={1}>1</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        {/* Muestra el rango de elementos mostrados */}
        <div className="flex items-center justify-center gap-2">
          <Label className="text-sm text-muted-foreground">
            <strong>
              {startItem}-{endItem}
            </strong>{" "}
            of <strong>{totalItems}</strong>
          </Label>
        </div>
        {/* Botones de navegación para las páginas */}
        <div className="pagination flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1} // Desactiva el botón si estás en la primera página
          >
            Anterior
          </Button>

          {/* Muestra las páginas dinámicamente */}
          {Array.from({ length: Math.min(totalPages, 6) }, (_, index) => {
            const pageNumber = currentPage + index;
            return (
              <Button
                key={pageNumber}
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pageNumber)}
                disabled={pageNumber > totalPages || pageNumber < 1}
              >
                {pageNumber}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages} // Desactiva el botón si estás en la última página
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
