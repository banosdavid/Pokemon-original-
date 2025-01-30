import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { PokemonTable } from './PokemonTable';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Pokemon } from '@/lib/types';

interface PokemonListProps {
  pokemon: Pokemon[];
  isLoading: boolean;
}

export function PokemonList({ pokemon, isLoading }: PokemonListProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pokemon List</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
            <span className="ml-3 text-lg text-gray-600">Loading Pokemon...</span>
          </div>
        ) : (
          <PokemonTable pokemon={pokemon} />
        )}
      </CardContent>
    </Card>
  );
}