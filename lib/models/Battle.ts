import mongoose, { Schema, model, models } from 'mongoose';

const PokemonSchema = new Schema({
  name: String,
  types: [String],
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

export default models.PokemonBattle || model('PokemonBattle', BattleSchema);

