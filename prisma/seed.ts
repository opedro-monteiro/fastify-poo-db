import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // 1. Categorias
  const categorias = await prisma.categoria.createMany({
    data: [
      { nome: 'Sobremesa' },
      { nome: 'Massas' },
      { nome: 'Carnes' },
      { nome: 'Vegetariano' },
    ],
  })

  // 2. Ingredientes
  const ingredientes = await prisma.ingrediente.createMany({
    data: [
      { nome: 'Açúcar', descricao: 'Ingrediente doce' },
      { nome: 'Farinha de Trigo', descricao: 'Base de massas' },
      { nome: 'Ovo', descricao: 'Ligante natural' },
      { nome: 'Leite', descricao: 'Ingrediente líquido' },
    ],
  })

  // 3. Livros
  const livros = await prisma.livro.createMany({
    data: [
      { titulo: 'Doces da Vovó', isbn: '978-85-000-0001-1' },
      { titulo: 'Massas Caseiras', isbn: '978-85-000-0002-2' },
      { titulo: 'Carnes no Ponto', isbn: '978-85-000-0003-3' },
      { titulo: 'Verde & Saudável', isbn: '978-85-000-0004-4' },
    ],
  })

  // 4. Restaurantes
  const restaurante1 = await prisma.restaurante.create({
    data: { nome: 'Sabor Caseiro' },
  })
  const restaurante2 = await prisma.restaurante.create({
    data: { nome: 'Chef Urbano' },
  })
  const restaurante3 = await prisma.restaurante.create({
    data: { nome: 'Tempero da Roça' },
  })
  const restaurante4 = await prisma.restaurante.create({
    data: { nome: 'Verde Gosto' },
  })

  // 5. Cozinheiros
  const cozinheiros = await prisma.cozinheiro.createMany({
    data: [
      {
        rg: '1111111111',
        nome: 'Ana Souza',
        salario: 4500,
        dt_contrato: new Date(),
        nome_fantasia: 'Chef Ana',
        restauranteId: restaurante1.id,
      },
      {
        rg: '2222222222',
        nome: 'Carlos Mendes',
        salario: 5000,
        dt_contrato: new Date(),
        nome_fantasia: 'Chef Carlos',
        restauranteId: restaurante2.id,
      },
      {
        rg: '3333333333',
        nome: 'Fernanda Lima',
        salario: 4700,
        dt_contrato: new Date(),
        nome_fantasia: 'Chef Nanda',
        restauranteId: restaurante3.id,
      },
      {
        rg: '4444444444',
        nome: 'João Pedro',
        salario: 4300,
        dt_contrato: new Date(),
        nome_fantasia: 'Chef JP',
        restauranteId: restaurante4.id,
      },
    ],
  })

  // 6. Receitas
  const receitas = await Promise.all([
    prisma.receita.create({
      data: {
        nome: 'Bolo de Chocolate',
        dt_criacao: new Date(),
        categoriaId: 1,
        cozinheiroId: 1,
        livroId: 1,
      },
    }),
    prisma.receita.create({
      data: {
        nome: 'Lasanha Bolonhesa',
        dt_criacao: new Date(),
        categoriaId: 2,
        cozinheiroId: 2,
        livroId: 2,
      },
    }),
    prisma.receita.create({
      data: {
        nome: 'Picanha Grelhada',
        dt_criacao: new Date(),
        categoriaId: 3,
        cozinheiroId: 3,
        livroId: 3,
      },
    }),
    prisma.receita.create({
      data: {
        nome: 'Salada de Grão-de-Bico',
        dt_criacao: new Date(),
        categoriaId: 4,
        cozinheiroId: 4,
        livroId: 4,
      },
    }),
  ])

  // 7. IngredientesReceita
  await prisma.ingredienteReceita.createMany({
    data: [
      {
        ingredienteId: 1,
        receitaId: receitas[0].id,
        quantidade: 200,
        medida: 'g',
      },
      {
        ingredienteId: 2,
        receitaId: receitas[0].id,
        quantidade: 300,
        medida: 'g',
      },
      {
        ingredienteId: 3,
        receitaId: receitas[1].id,
        quantidade: 2,
        medida: 'unid',
      },
      {
        ingredienteId: 4,
        receitaId: receitas[2].id,
        quantidade: 1,
        medida: 'xícara',
      },
    ],
  })

  // 8. Degustadores
  await prisma.degustador.createMany({
    data: [
      {
        rg: '5555555555',
        nome: 'Maria Clara',
        salario: 3000,
        dt_contrato: new Date(),
      },
      {
        rg: '6666666666',
        nome: 'José Augusto',
        salario: 3200,
        dt_contrato: new Date(),
      },
      {
        rg: '7777777777',
        nome: 'Rafaela Gomes',
        salario: 2800,
        dt_contrato: new Date(),
      },
      {
        rg: '8888888888',
        nome: 'Lucas Torres',
        salario: 3100,
        dt_contrato: new Date(),
      },
    ],
  })

  // 9. Testes
  await prisma.teste.createMany({
    data: [
      {
        receitaId: receitas[0].id,
        degustadorId: 1,
        dt_teste: new Date(),
        nota: 9.5,
      },
      {
        receitaId: receitas[1].id,
        degustadorId: 2,
        dt_teste: new Date(),
        nota: 8.0,
      },
      {
        receitaId: receitas[2].id,
        degustadorId: 3,
        dt_teste: new Date(),
        nota: 7.5,
      },
      {
        receitaId: receitas[3].id,
        degustadorId: 4,
        dt_teste: new Date(),
        nota: 9.0,
      },
    ],
  })

  console.log('✅ Seed completo com 4 registros em cada tabela!')
}

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
