import mongoose, { Schema, model, models } from 'mongoose';

const PokemonSchema = new Schema({
  name: String,
  stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    specialAttack: Number,
    specialDefense: Number,
    speed: Number,
  }
}, { _id: false });

const BattleSchema = new Schema({
  player1: PokemonSchema,
  player2: PokemonSchema,
  winner: String,
  battleLog: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ⚠️ Esto es clave: si quieres que la colección sea exactamente "PokemonBattle":
export default models.PokemonBattle || model('PokemonBattle', BattleSchema);
