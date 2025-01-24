/**
 * Interfaz que define la estructura de un Pokémon.
 */
export interface Pokemon {
  id: number; // ID único del Pokémon
  name: string; // Nombre del Pokémon
  types: string[]; // Tipos del Pokémon (por ejemplo, "Fire", "Water")
  stats: Stats; // Estadísticas del Pokémon (ahora es un objeto, no un arreglo)
  imageUrl: string; // URL de la imagen del Pokémon
  
}

/**
 * Interfaz que define las estadísticas de un Pokémon.
 */
export interface Stats {
  hp: number; // Puntos de vida (HP)
  attack: number; // Ataque
  defense: number; // Defensa
  specialAttack: number; // Ataque especial
  specialDefense: number; // Defensa especial
  speed: number; // Velocidad
}

/**
 * Respuesta de la API que contiene un conjunto de Pokémon, usada para la paginación.
 */
export interface PokemonResponse {
  count: number; // Cantidad total de Pokémon
  results: Pokemon[]; // Array de Pokémon
  next?: string; // URL de la siguiente página de resultados (opcional)
  previous?: string; // URL de la página anterior (opcional)
}

/**
 * Estado de autenticación, para determinar si un usuario está autenticado.
 */
export interface AuthState {
  isAuthenticated: boolean;
}
