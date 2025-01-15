'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, Swords, Shield } from 'lucide-react';
import { PokemonTypeChart } from '@/components/PokemonTypeChart';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { usePokemon } from '@/lib/hooks/usePokemon';

export default function Dashboard() {
  const { pokemon, isLoading, error } = usePokemon();

  // Asegurarse de que 'pokemon' sea un arreglo antes de calcular las estadísticas
  const stats = pokemon ? {
    totalPokemon: pokemon.length,
    types: new Set(pokemon.flatMap((p) => p.types)).size,
    avgAttack: Math.round(
      pokemon.reduce((acc, p) => acc + p.stats.attack, 0) / pokemon.length || 0
    ),
    avgDefense: Math.round(
      pokemon.reduce((acc, p) => acc + p.stats.defense, 0) / pokemon.length || 0
    ),
  } : {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
        <span className="ml-3 text-lg text-gray-600">Loading Dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
    
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-blue-600">Total Pokemon</p>
                <p className="text-2xl font-bold text-blue-700">
                  {stats.totalPokemon || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-purple-600">Types</p>
                <p className="text-2xl font-bold text-purple-700">
                  {stats.types || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="pt-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-500 rounded-lg">
                <Swords className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-red-600">Avg. Attack</p>
                <p className="text-2xl font-bold text-red-700">
                  {stats.avgAttack || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-green-600">Avg. Defense</p>
                <p className="text-2xl font-bold text-green-700">
                  {stats.avgDefense || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pokemon Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <PokemonTypeChart pokemon={pokemon || []} /> {/* Asegúrate de pasar un arreglo vacío si no hay datos */}
        </CardContent>
      </Card>
    </div>
  );
}