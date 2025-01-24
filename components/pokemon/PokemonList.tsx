'use client';

import { useState, useEffect } from 'react';
import { Pokemon } from '@/lib/types';
import { PokemonTable } from '@/components/pokemon/PokemonTable';
import { PokemonSearch } from '@/components/pokemon/PokemonSearch';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { usePokemon } from '@/lib/hooks/usePokemon';

export default function PokemonListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedType, setSelectedType] = useState('all'); // Tipo seleccionado para el filtro
  const { pokemon, isLoading, error } = usePokemon();

  // Calcular el total de páginas y manejar cambios en las filas por página
  useEffect(() => {
    if (pokemon) {
      setTotalPages(Math.ceil(pokemon.length / rowsPerPage));
    }
  }, [pokemon, rowsPerPage]);

  // Filtrar Pokémon por tipo seleccionado
  const filteredPokemon = pokemon?.filter((p) =>
    selectedType === 'all' || p.types.includes(selectedType)
  ) || [];

  // Obtener los Pokémon de la página actual
  const currentPokemonDataPage = filteredPokemon.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-8">Pokemon List</h1>

        {/* Verificación de estado */}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            {/* Filtro por tipo */}
            <PokemonSearch
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              types={Array.from(new Set(pokemon.flatMap((p) => p.types)))}
            />

            {/* Tabla de Pokémon */}
            <PokemonTable pokemon={currentPokemonDataPage} />
          </>
        )}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center ml-4">
          <label htmlFor="rowsPerPage" className="mr-2 font-medium">
            Filas por página:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded-md p-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="pagination flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>

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
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}