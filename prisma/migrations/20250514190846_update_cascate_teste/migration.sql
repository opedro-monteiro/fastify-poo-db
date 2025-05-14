-- DropForeignKey
ALTER TABLE "Teste" DROP CONSTRAINT "Teste_degustadorId_fkey";

-- DropForeignKey
ALTER TABLE "Teste" DROP CONSTRAINT "Teste_receitaId_fkey";

-- AddForeignKey
ALTER TABLE "Teste" ADD CONSTRAINT "Teste_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "Receita"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teste" ADD CONSTRAINT "Teste_degustadorId_fkey" FOREIGN KEY ("degustadorId") REFERENCES "Degustador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
