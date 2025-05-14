import { prisma } from '../src/libs/prisma'

async function clearDatabase() {
  try {
    // Ordem importa por causa das relações (onDelete)
    await prisma.teste.deleteMany()
    await prisma.ingredienteReceita.deleteMany()
    await prisma.receita.deleteMany()
    await prisma.ingrediente.deleteMany()
    await prisma.categoria.deleteMany()
    await prisma.cozinheiro.deleteMany()
    await prisma.livro.deleteMany()

    console.log('✅ Todos os registros foram excluídos com sucesso.')
  } catch (error) {
    console.error('❌ Erro ao excluir registros:', error)
  } finally {
    await prisma.$disconnect()
  }
}

clearDatabase()
