
'use client';

import { useRouter } from 'next/router';

export default function PokemonDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Obtén el parámetro 'id' de la URL

  // Si el parámetro 'id' no está disponible, muestra un mensaje de "Cargando..."
  if (!id) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Hola Mundo</h1>
      <p className="text-xl mt-4">Estás viendo los detalles del Pokémon con ID: {id}</p>
    </div>
  );
}