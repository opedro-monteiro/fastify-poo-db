import { en, Faker, pt_BR } from '@faker-js/faker';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();
const faker = new Faker({ locale: [pt_BR, en] });

function sufixoUnico() {
  return faker.string.alpha({ length: 5 });
}

async function main() {
  console.log('🌱 Iniciando seed...');

  // Categorias
  const categorias = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.categoria.create({
        data: {
          nome: faker.commerce.department() + '_' + sufixoUnico(),
        },
      })
    )
  );

  // Ingredientes
  const ingredientes = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.ingrediente.create({
        data: {
          nome: faker.commerce.productName() + '_' + sufixoUnico(),
          descricao: faker.commerce.productDescription(),
        },
      })
    )
  );

  // Livros
  const livros = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.livro.create({
        data: {
          titulo: faker.lorem.sentence(4) + faker.string.alpha(5), // para garantir unicidade
          isbn: faker.string.alphanumeric(13), // Limite de 13 a 17 caracteres
        },
      })
    )
  );

  // Restaurantes
  const restaurantes = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.restaurante.create({
        data: {
          nome: faker.company.name(),
        },
      })
    )
  );

  // Cozinheiros
  const cozinheiros = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.cozinheiro.create({
        data: {
          nome: faker.person.fullName(),
          rg: faker.string.numeric(9) + sufixoUnico(),
          salario: faker.number.float({ min: 2000, max: 8000 }),
          dt_contrato: faker.date.past(),
          nome_fantasia: faker.company.name(),
          restauranteId: restaurantes[i % restaurantes.length].id,
        },
      })
    )
  );

  // Degustadores
  const degustadores = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.degustador.create({
        data: {
          nome: faker.person.fullName(),
          rg: faker.string.numeric(9) + sufixoUnico(),
          salario: faker.number.float({ min: 1000, max: 5000 }),
          dt_contrato: faker.date.past(),
        },
      })
    )
  );

  // Editores
  const editores = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.editor.create({
        data: {
          nome: faker.person.fullName(),
          rg: faker.string.numeric(9) + sufixoUnico(),
          salario: faker.number.float({ min: 3000, max: 7000 }),
          dt_contrato: faker.date.past(),
        },
      })
    )
  );

  // Receitas
  const receitas = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.receita.create({
        data: {
          nome: faker.commerce.productName() + '_' + sufixoUnico(),
          dt_criacao: faker.date.past(),
          categoriaId: categorias[i % categorias.length].id,
          cozinheiroId: cozinheiros[i % cozinheiros.length].id,
          livroId: livros[i % livros.length].id,
        },
      })
    )
  );

  // IngredienteReceita
  const ingredienteReceitas = await Promise.all(
    receitas.flatMap((receita) =>
      Array.from({ length: 2 }).map(() => {
        const ingrediente = faker.helpers.arrayElement(ingredientes);
        return prisma.ingredienteReceita.create({
          data: {
            receitaId: receita.id,
            ingredienteId: ingrediente.id,
            quantidade: faker.number.float({ min: 0.1, max: 2.0 }),
            medida: faker.helpers.arrayElement(['g', 'kg', 'ml', 'L', 'colheres']),
          },
        });
      })
    )
  );

  // Testes
  await Promise.all(
    receitas.map((receita) =>
      prisma.teste.create({
        data: {
          receitaId: receita.id,
          degustadorId: faker.helpers.arrayElement(degustadores).id,
          dt_teste: faker.date.recent(),
          nota: faker.number.float({ min: 0, max: 10 }),
        },
      })
    )
  );

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
