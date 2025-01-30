'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Pokemon } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PokemonTableProps {
  pokemon: Pokemon[];
}

export function PokemonTable({ pokemon }: PokemonTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Types</TableHead>
          <TableHead>HP</TableHead>
          <TableHead>Attack</TableHead>
          <TableHead>Defense</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pokemon.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-medium">{p.name}</TableCell>
            <TableCell>{p.types.join(', ')}</TableCell>
            <TableCell>{p.stats.hp}</TableCell>
            <TableCell>{p.stats.attack}</TableCell>
            <TableCell>{p.stats.defense}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/admin/dashboard/pokemon/${p.id}`)} // Redirige a la página dinámica
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}