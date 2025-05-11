import type { IngredientFromRecipe } from '../ingredientRecipe/ingredientrecipe.schema'

export interface Recipe {
  id: string
  nome: string
  dt_criacao: Date | string
  categoriaId: number
  cozinheiroId: number
  livroId: number | null
  ingredientes: IngredientFromRecipe[]
  // testes: Test[]
}
