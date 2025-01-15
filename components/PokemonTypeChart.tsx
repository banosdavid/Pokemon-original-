'use client';

import { Pokemon } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PokemonTypeChartProps {
  pokemon: Pokemon[];
}

export function PokemonTypeChart({ pokemon }: PokemonTypeChartProps) {
  const typeCount = pokemon.reduce((acc, p) => {
    p.types.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(typeCount).map(([type, count]) => ({
    type,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}