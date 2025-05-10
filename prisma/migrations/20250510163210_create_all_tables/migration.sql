-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingrediente" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "descricao" VARCHAR(200),

    CONSTRAINT "Ingrediente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livro" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "isbn" VARCHAR(17) NOT NULL,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Restaurante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cozinheiro" (
    "id" SERIAL NOT NULL,
    "rg" VARCHAR(20) NOT NULL,
    "nome" VARCHAR(80) NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "dt_contrato" TIMESTAMP(3) NOT NULL,
    "nome_fantasia" VARCHAR(80),
    "restauranteId" INTEGER,

    CONSTRAINT "Cozinheiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Degustador" (
    "id" SERIAL NOT NULL,
    "rg" VARCHAR(20) NOT NULL,
    "nome" TEXT NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "dt_contrato" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Degustador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Editor" (
    "id" SERIAL NOT NULL,
    "rg" VARCHAR(20) NOT NULL,
    "nome" TEXT NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "dt_contrato" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Editor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receita" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(80) NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "cozinheiroId" INTEGER NOT NULL,
    "livroId" INTEGER,

    CONSTRAINT "Receita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredienteReceita" (
    "id" SERIAL NOT NULL,
    "ingredienteId" INTEGER NOT NULL,
    "receitaId" INTEGER NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "medida" TEXT NOT NULL,

    CONSTRAINT "IngredienteReceita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teste" (
    "id" SERIAL NOT NULL,
    "receitaId" INTEGER NOT NULL,
    "degustadorId" INTEGER NOT NULL,
    "dt_teste" TIMESTAMP(3) NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Teste_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Ingrediente_nome_key" ON "Ingrediente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Livro_titulo_key" ON "Livro"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Livro_isbn_key" ON "Livro"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Cozinheiro_rg_key" ON "Cozinheiro"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Degustador_rg_key" ON "Degustador"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Editor_rg_key" ON "Editor"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Receita_nome_key" ON "Receita"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "IngredienteReceita_ingredienteId_receitaId_key" ON "IngredienteReceita"("ingredienteId", "receitaId");

-- AddForeignKey
ALTER TABLE "Cozinheiro" ADD CONSTRAINT "Cozinheiro_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "Restaurante"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_cozinheiroId_fkey" FOREIGN KEY ("cozinheiroId") REFERENCES "Cozinheiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredienteReceita" ADD CONSTRAINT "IngredienteReceita_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "Ingrediente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredienteReceita" ADD CONSTRAINT "IngredienteReceita_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "Receita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teste" ADD CONSTRAINT "Teste_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "Receita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teste" ADD CONSTRAINT "Teste_degustadorId_fkey" FOREIGN KEY ("degustadorId") REFERENCES "Degustador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
