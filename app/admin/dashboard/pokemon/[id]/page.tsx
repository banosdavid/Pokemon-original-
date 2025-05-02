'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

  const handleTabChange = (tab: string) => {
    if (['types', 'abilities', 'stats', 'moves'].includes(tab)) {
      setActiveTab(tab as 'types' | 'abilities' | 'stats' | 'moves');
    }
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

      <div className="w-3/4 flex flex-col space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold hover:text-blue-500 transition-colors">Detalles del Pokémon</CardTitle>
          </CardHeader>
          <CardContent>
            {pokemonData ? (
              <div className="flex flex-col space-y-8">
                <div className="flex flex-col space-y-8">
                <div className="flex items-center space-x-4">
  <h1 className="text-xl font-bold hover:text-blue-500 transition-colors">
    {pokemonData.name}
  </h1>
</div>

  <div className="mt-4 flex items-center space-x-4">
    {/* Sprite del Pokémon */}
    {pokemonData.sprites.other?.dream_world?.front_default && (
      <div className="flex items-center">
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt="Dream World"
          className="w-60 h-60"
        />
      </div>
    )}

    {/* Botón para escuchar el grito */}
    <div className="flex flex-col items-center justify-center space-y-2">
      <p className="text-sm text-gray-500">¡Escuchar grito!</p>
      <Button
        variant="outline"
        onClick={playGrito}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white"
      >
        🔊
      </Button>
    </div>
  </div>
</div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold hover:text-blue-500 transition-colors">Información adicional del Pokémon</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Descripción:</strong> {pokemonDescription}</p>
                  </CardContent>
                </Card>

                

                <Tabs value={activeTab} onValueChange={handleTabChange}>



                
                  <TabsList className="flex space-x-4 mt-6">
                    <TabsTrigger value="types" className={activeTab === 'types' ? 'btn-default' : 'btn-outline'}>Tipos</TabsTrigger>
                    <TabsTrigger value="abilities" className={activeTab === 'abilities' ? 'btn-default' : 'btn-outline'}>Habilidades</TabsTrigger>
                    <TabsTrigger value="stats" className={activeTab === 'stats' ? 'btn-default' : 'btn-outline'}>Estadísticas</TabsTrigger>
                    <TabsTrigger value="moves" className={activeTab === 'moves' ? 'btn-default' : 'btn-outline'}>Movimientos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="types">
                    <Card className="mt-4">
                      <div className="flex space-x-4">
                        {pokemonData.types.map((type: any) => (
                          <Badge key={type.type.name} variant="outline" className="cursor-pointer hover:bg-gray-300 transition-all">
                            {type.type.name}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="abilities">
                    <Card className="mt-6">
                      <div className="flex space-x-4">
                        {pokemonData.abilities.map((ability: any) => (
                          <Badge key={ability.ability.name} variant="outline" className="cursor-pointer hover:bg-gray-300 transition-all">
                            {ability.ability.name}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="stats">
                    <Card className="mt-6">
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
                    </Card>
                  </TabsContent>

                  <TabsContent value="moves">
  <Card className="mt-6">
    <div className="flex flex-wrap space-x-2 space-y-2"> {/* Añadido flex-wrap y espacio entre los elementos */}
      {pokemonData.moves.length > 0 ? (
        pokemonData.moves.map((move: any) => (
          <Badge
            key={move.move.name}
            variant="outline"
            className="cursor-pointer hover:bg-gray-300 transition-all"
          >
            {move.move.name}
          </Badge>
        ))
      ) : (
        <p>No se encontraron movimientos para este Pokémon.</p>
      )}
    </div>
  </Card>
</TabsContent>
                </Tabs>
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
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PokemonDetail;
