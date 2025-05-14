-- DropForeignKey
ALTER TABLE "IngredienteReceita" DROP CONSTRAINT "IngredienteReceita_ingredienteId_fkey";

-- DropForeignKey
ALTER TABLE "IngredienteReceita" DROP CONSTRAINT "IngredienteReceita_receitaId_fkey";

-- AddForeignKey
ALTER TABLE "IngredienteReceita" ADD CONSTRAINT "IngredienteReceita_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "Ingrediente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredienteReceita" ADD CONSTRAINT "IngredienteReceita_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "Receita"("id") ON DELETE CASCADE ON UPDATE CASCADE;
