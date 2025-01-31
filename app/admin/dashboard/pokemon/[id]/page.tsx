'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Asegúrate de importar los componentes de Tabs de ShadCN

interface PokemonDetailProps {
  params: {
    id: string;
  };
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ params }) => {
  const { id } = params;
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gritoUrl, setGritoUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'types' | 'abilities' | 'stats' | 'moves'>('types');
  const [audioPlaying, setAudioPlaying] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el Pokémon');
        }
        const data = await response.json();
        setPokemonData(data);
        setGritoUrl(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`);
      } catch (error) {
        setError('Error al cargar los datos del Pokémon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id]);

  const playGrito = () => {
    if (gritoUrl && !audioPlaying) {
      const audio = new Audio(gritoUrl);
      audio.play().catch((error) => {
        console.error("Error al reproducir el grito: ", error);
      });
      setAudioPlaying(true);
      audio.onended = () => setAudioPlaying(false);
    }
  };

  const getStatBarColor = (stat: number) => {
    if (stat < 50) return 'bg-red-500';
    if (stat < 100) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleTabChange = (tab: 'types' | 'abilities' | 'stats' | 'moves') => {
    setActiveTab(tab);
  };

  const handleScroll = (event: React.MouseEvent) => {
    const container = document.getElementById('scroll-container');
    if (container) {
      const containerHeight = container.offsetHeight;
      const clickPosition = event.clientY - container.getBoundingClientRect().top;
      const scrollPercentage = clickPosition / containerHeight;
      container.scrollTop = scrollPercentage * container.scrollHeight;
    }
  };

  if (loading) {
    return <p className="text-center">Cargando datos del Pokémon...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="relative p-6 h-screen overflow-hidden">
      <div
        id="scroll-container"
        className="w-full h-full overflow-y-auto pr-10"
        onClick={handleScroll}
      >
        <div className="w-3/4 flex flex-col space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Pokémon</CardTitle>
            </CardHeader>
            <CardContent>
              {pokemonData ? (
                <div className="flex flex-col space-y-8">
                  <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold">{pokemonData.name}</h1>
                    <div className="mt-4 flex items-center space-x-2">
                      <p>¡Escuchar grito!</p>
                      <Button variant="outline" onClick={playGrito}>
                        🔊
                      </Button>
                    </div>
                  </div>

                  {pokemonData.sprites.other?.dream_world?.front_default && (
                    <div className="mt-4">
                      <img
                        src={pokemonData.sprites.other.dream_world.front_default}
                        alt="Dream World"
                        className="w-60 h-60"
                      />
                    </div>
                  )}

                  <div className="mt-4 flex space-x-4">
                    <Button variant={activeTab === 'types' ? 'default' : 'outline'} onClick={() => handleTabChange('types')}>
                      Tipos
                    </Button>
                    <Button variant={activeTab === 'abilities' ? 'default' : 'outline'} onClick={() => handleTabChange('abilities')}>
                      Habilidades
                    </Button>
                    <Button variant={activeTab === 'stats' ? 'default' : 'outline'} onClick={() => handleTabChange('stats')}>
                      Estadísticas
                    </Button>
                    <Button variant={activeTab === 'moves' ? 'default' : 'outline'} onClick={() => handleTabChange('moves')}>
                      Movimientos
                    </Button>
                  </div>

                  {activeTab === 'types' && (
                    <div className="mt-4">
                      <div className="flex space-x-4">
                        {pokemonData.types.map((type: any) => (
                          <Badge key={type.type.name} variant="outline" className={`cursor-pointer hover:bg-gray-300 transition-all`}>
                            {type.type.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'abilities' && (
                    <div className="mt-6">
                      <div className="flex space-x-4">
                        {pokemonData.abilities.map((ability: any) => (
                          <Badge key={ability.ability.name} variant="outline" className="cursor-pointer hover:bg-gray-300 transition-all">
                            {ability.ability.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'stats' && (
                    <div className="mt-6">
                      {pokemonData.stats.map((stat: any) => (
                        <div key={stat.stat.name} className="mb-4">
                          <p>{stat.stat.name.replace('-', ' ').toUpperCase()}: {stat.base_stat}</p>
                          <div className="w-full bg-gray-300 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getStatBarColor(stat.base_stat)}`}
                              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'moves' && (
                    <div className="mt-6">
                      <h2 className="text-lg font-semibold">Movimientos:</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {pokemonData.moves.slice(0, 20).map((move: any) => (
                          <Badge key={move.move.name} variant="outline" className="cursor-pointer hover:bg-gray-300 transition-all">
                            {move.move.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p>No se encontraron datos para este Pokémon.</p>
              )}

             
            </CardContent>
          </Card>

          {/* Generaciones y versiones */}
          <Card>
            <CardHeader>
              <CardTitle>Generaciones y Versiones</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="generation1">
                <TabsList>
                  <TabsTrigger value="generation1">Generación 1</TabsTrigger>
                  <TabsTrigger value="generation2">Generación 2</TabsTrigger>
                  <TabsTrigger value="generation3">Generación 3</TabsTrigger>
                  <TabsTrigger value="generation4">Generación 4</TabsTrigger>
                  <TabsTrigger value="generation5">Generación 5</TabsTrigger>
                  <TabsTrigger value="generation6">Generación 6</TabsTrigger>
                </TabsList>
                <TabsContent value="generation1">
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/generation-1/${id}.png`} alt="Gen 1 Sprite" className="w-40 h-40" />
                  <p>Generación 1: Pokémon Azul, Rojo</p>
                </TabsContent>
                <TabsContent value="generation2">
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/generation-2/${id}.png`} alt="Gen 2 Sprite" className="w-40 h-40" />
                  <p>Generación 2: Pokémon Oro, Plata</p>
                </TabsContent>
                <TabsContent value="generation3">
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/generation-3/${id}.png`} alt="Gen 3 Sprite" className="w-40 h-40" />
                  <p>Generación 3: Pokémon Rubí, Zafiro</p>
                </TabsContent>
                <TabsContent value="generation4">
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/generation-4/${id}.png`} alt="Gen 4 Sprite" className="w-40 h-40" />
                  <p>Generación 4: Pokémon Diamante, Perla</p>
                </TabsContent>
                <TabsContent value="generation5">
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/generation-5/${id}.png`} alt="Gen 5 Sprite" className="w-40 h-40" />
                  <p>Generación 5: Pokémon Negro, Blanco</p>
                </TabsContent>
                <TabsContent value="generation6">
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/generation-6/${id}.png`} alt="Gen 6 Sprite" className="w-40 h-40" />
                  <p>Generación 6: Pokémon X, Y</p>
                </TabsContent>
              </Tabs>
               <div className="mt-6 flex space-x-4">
                <Button variant="outline" onClick={handleGoBack}>Volver Atrás</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
