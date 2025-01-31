export const combate = (pokemon1: any, pokemon2: any) => {
    // Asegúrate de tener las estadísticas correctas de ataque y defensa
    const pokemon1Attack = pokemon1.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat;
    const pokemon1Defense = pokemon1.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat;
  
    const pokemon2Attack = pokemon2.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat;
    const pokemon2Defense = pokemon2.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat;
  
    // Efectividad por tipo (puedes ajustarlo según los tipos de los Pokémon)
    const typeEffectiveness1 = 1; // Esta es solo una suposición, ajusta con la lógica de tipos
    const typeEffectiveness2 = 1;
  
    // Cálculo del daño
    const damageToPokemon1 = Math.max(0, (pokemon2Attack - pokemon1Defense) * typeEffectiveness2);
    const damageToPokemon2 = Math.max(0, (pokemon1Attack - pokemon2Defense) * typeEffectiveness1);
  
    // Determinar los resultados
    const pokemon1HP = pokemon1.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat;
    const pokemon2HP = pokemon2.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat;
  
    const pokemon1RemainingHP = Math.max(0, pokemon1HP - damageToPokemon1);
    const pokemon2RemainingHP = Math.max(0, pokemon2HP - damageToPokemon2);
  
    // Retornar el resultado
    if (pokemon1RemainingHP === 0 && pokemon2RemainingHP === 0) {
      return '¡Es un empate!';
    } else if (pokemon1RemainingHP === 0) {
      return `${pokemon2.name} gana!`;
    } else if (pokemon2RemainingHP === 0) {
      return `${pokemon1.name} gana!`;
    } else {
      return `${pokemon1.name} HP restante: ${pokemon1RemainingHP}, ${pokemon2.name} HP restante: ${pokemon2RemainingHP}`;
    }
  };
  