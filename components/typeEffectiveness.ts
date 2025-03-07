// utils/typeEffectiveness.ts

// Mapa de efectividad de tipos de Pokémon
export const typeEffectiveness: Record<string, Record<string, number>> = {
  normal: { rock: 2, ghost: 0, steel: 0.5 },
  fighting: { normal: 2, rock: 2, steel: 2, ice: 2, ghost: 0, psychic: 0.5 },
  flying: { fighting: 2, bug: 2, grass: 2, electric: 0.5, rock: 0.5, steel: 0.5 },
  poison: { grass: 2, fairy: 2, poison: 0.5, ghost: 0.5, ground: 0 },
  ground: { fire: 2, electric: 2, rock: 2, steel: 2, poison: 2, water: 0.5, grass: 0.5, ice: 0.5 },
  rock: { flying: 2, bug: 2, fire: 2, steel: 2, fighting: 0.5, ground: 0.5, water: 0.5, grass: 0.5 },
  bug: { psychic: 2, dark: 2, fighting: 0.5, flying: 0.5, ghost: 0.5, fire: 0.5, rock: 0.5, steel: 0.5 },
  ghost: { ghost: 2, psychic: 2, normal: 0, fighting: 0, dark: 0.5 },
  steel: { ice: 2, rock: 2, fairy: 2, fire: 0.5, fighting: 0.5, ground: 0.5, ghost: 0.5, steel: 0.5 },
  fire: { grass: 2, bug: 2, ice: 2, steel: 2, water: 0.5, rock: 0.5, fire: 0.5, dragon: 0.5 },
  water: { fire: 2, ground: 2, rock: 2, water: 0.5, electric: 0.5 },
  grass: { water: 2, ground: 2, rock: 2, fire: 0.5, flying: 0.5, poison: 0.5, bug: 0.5, steel: 0.5 },
  electric: { water: 2, flying: 2, ground: 0, electric: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0 },
  ice: { flying: 2, ground: 2, grass: 2, dragon: 2, fire: 0.5, steel: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { psychic: 2, ghost: 2, fighting: 0.5, dark: 0.5, fairy: 0.5 },
  fairy: { fighting: 2, dragon: 2, dark: 2, fire: 0.5, steel: 0.5 },
};

// Función para calcular la efectividad de los tipos
export const getTypeEffectiveness = (types1: string[], types2: string[]): number => {
  let effectiveness = 1;

  // Recorremos todos los tipos de ambos Pokémon
  types1.forEach((type1) => {
    types2.forEach((type2) => {
      if (typeEffectiveness[type1] && typeEffectiveness[type1][type2]) {
        // Multiplicamos las efectividades entre los tipos
        effectiveness *= typeEffectiveness[type1][type2];
      }
    });
  });

  return effectiveness;
};
