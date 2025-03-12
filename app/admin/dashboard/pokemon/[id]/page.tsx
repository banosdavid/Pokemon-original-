'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';


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
  const [view, setView] = useState<'front' | 'back'>('front');
  const [isShiny, setIsShiny] = useState(false); // Estado para controlar la forma shiny
  const [pokemonDescription, setPokemonDescription] = useState<string>(""); // Estado para la descripción


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

        // Comprobamos si la propiedad species está disponible y contiene flavor_text_entries
        if (data.species) {
          const speciesResponse = await fetch(data.species.url);
          const speciesData = await speciesResponse.json();

          // Verificamos si la propiedad `flavor_text_entries` está disponible
          if (speciesData.flavor_text_entries?.length > 0) {
            setPokemonDescription(speciesData.flavor_text_entries[0].flavor_text);
          } else {
            setPokemonDescription("Descripción no disponible");
          }
        } else {
          setPokemonDescription("Información de especie no disponible");
        }

        // Cargar URL del grito
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

  const handleViewChange = (newView: 'front' | 'back') => {
    setView(newView);
  };

  const handleShinyToggle = () => {
    setIsShiny(!isShiny);
  };

  if (loading) {
    return <p className="text-center">Cargando datos del Pokémon...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (

    <div className="relative w-full h-full">
      <div className="sticky top-0 left-0 bg-white z-10 py-2">
        <Button variant="outline" onClick={handleGoBack}>Volver Atrás</Button>
      </div>
      <div className="w-3/4 flex f  lex-col space-y-8">

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

<Card>
                <CardHeader>
                  <CardTitle>Información adicional del Pokémon</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Mostrar descripción del Pokémon */}
                  <p><strong>Descripción:</strong> {pokemonDescription}</p>
                </CardContent>
              </Card>

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
                      <Badge key={type.type.name} variant="outline" className="cursor-pointer hover:bg-gray-300 transition-all">
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
             



              {/* Formas Shiny */}
              <div className="mt-6 flex space-x-4">
                <Button variant="outline" onClick={() => handleViewChange('front')}>De Frente</Button>
                <Button variant="outline" onClick={() => handleViewChange('back')}>De Espalda</Button>
                <Button variant="outline" onClick={handleShinyToggle}>
                  {isShiny ? 'Ver Forma Normal' : 'Ver Forma Shiny'}
                </Button>
              </div>

              <div className="mt-4">
                {view === 'front' && (
                  <div>
                    <img
                      src={isShiny ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default}
                      alt="Frontal"
                      className="w-40 h-40"
                    />
                    <p>{isShiny ? 'Frontal Shiny' : 'Frontal'}</p>
                  </div>
                )}
                {view === 'back' && (
                  <div>
                    <img
                      src={isShiny ? pokemonData.sprites.back_shiny : pokemonData.sprites.back_default}
                      alt="Espalda"
                      className="w-40 h-40"
                    />
                    <p>{isShiny ? 'Espalda Shiny' : 'Espalda'}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>No se encontraron datos para este Pokémon.</p>
          )}
        </CardContent>

      </div>
    </div>

  );
};

export default PokemonDetail;
