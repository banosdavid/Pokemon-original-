'use client';

import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PokemonSearch } from '@/components/pokemon/PokemonSearch';
import { usePokemon } from '@/lib/hooks/usePokemon';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Asegúrate de tener el botón disponible
import { Label } from '@/components/ui/label'; 

export default function PokemonGridPage() {
  const { pokemon, isLoading, error } = usePokemon();
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1); 


  // Filtrar Pokémon por tipo seleccionado
  const filteredPokemon = pokemon.filter((p) => {
    const matchesType = selectedType === 'all' || p.types.includes(selectedType);
    return matchesType;
  });

  
  useEffect(() => {
    if (pokemon) {
      setTotalPages(Math.ceil(pokemon.length / cardsPerPage));
      setTotalItems(pokemon.length); // Actualizamos el total de elementos
    }
  }, [pokemon, cardsPerPage]);



  useEffect(() => {
    if (filteredPokemon.length > 0) {
      setTotalPages(Math.ceil(filteredPokemon.length / cardsPerPage)); // Usamos cardsPerPage en lugar de rowsPerPage
    } else {
      setTotalPages(1);
    }
  }, [filteredPokemon, cardsPerPage]);

  // Obtener los Pokémon de la página actual
  const currentPokemonDataPage = filteredPokemon.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );



  const handlePageChange = (page: number) => setCurrentPage(page);
 


  // Calcular el rango de elementos mostrados en la página actual
  const startItem = (currentPage - 1) * cardsPerPage + 1;
  const endItem = Math.min(currentPage * cardsPerPage, totalItems);






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
      
      {/* Filtro por tipo */}
      <div className="mb-8">
        <PokemonSearch
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          types={Array.from(new Set(pokemon.flatMap((p) => p.types)))}
        />
      </div>
  
      {/* Mostrar Pokémon en la cuadrícula */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentPokemonDataPage.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    



      
        {/* Controles de Paginación */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center ml-4">
          <label htmlFor="cardsPerPage" className="mr-2 font-medium">
            Cards per page:
          </label>
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