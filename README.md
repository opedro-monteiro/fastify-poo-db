# Fastify POO + DB API ![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

O **Fastify POO + DB API** é uma API RESTful desenvolvida com foco em boas práticas de programação orientada a objetos (POO) usando o framework **Fastify**. O projeto implementa as operações CRUD com persistência em banco de dados relacional, servindo como base sólida para aplicações Node.js modulares e escaláveis.

## Tecnologias

![Tecnologias](https://skillicons.dev/icons?i=typescript,nodejs,postgres,docker)

## Índice

* [Fastify POO + DB API](#fastify-poo--db-api-)

  * [Tecnologias](#tecnologias)
  * [Índice](#índice)
  * [Sobre](#sobre)
  * [Funcionalidades](#funcionalidades)
  * [Instalação](#instalação)
  * [Uso](#uso)
  * [Resultados](#resultados)
  * [Contato](#contato)

## Sobre

Este projeto demonstra como estruturar uma API Node.js com **Fastify** aplicando princípios de **Programação Orientada a Objetos**, separando responsabilidades por camadas (routes, controllers, use-cases e repositories). O banco de dados relacional é gerenciado via **Knex.js**, e a aplicação está preparada para rodar em containers via Docker.

## Funcionalidades

* **CRUD Completo**

  * Criação, leitura, atualização e exclusão de registros em banco de dados.

* **Arquitetura Escalável**

  * Estrutura modular baseada em camadas POO (Controller, UseCase, Repository).

* **Integração com Banco de Dados**

  * Persistência de dados com PostgreSQL usando Knex.js.

* **Documentação Simples**

  * Endpoints claros e padronizados para fácil consumo.

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/opedro-monteiro/fastify-poo-db.git
   ```

2. Acesse o diretório do projeto:

   ```sh
   cd fastify-poo-db
   ```

3. Instale as dependências:

   ```sh
   npm install
   ```

4. Configure o ambiente:

   * Copie o arquivo `.env.example` para `.env` e ajuste as variáveis de conexão com o banco.

5. Suba os serviços com Docker:

   ```sh
   docker-compose up -d
   ```

6. Rode as migrações:

   ```sh
   npm run migrate
   ```

## Uso

Para iniciar o servidor localmente:

```sh
npm run dev
```

A API estará disponível em `http://localhost:3333`. Os endpoints podem ser testados via ferramentas como Insomnia ou Postman.

## Resultados

* Estrutura limpa e reutilizável para novos projetos Fastify.
* Organização clara baseada em boas práticas de POO.
* Facilidade para testes, manutenção e escalabilidade.

## Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?\&style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/pedro-oliveira-m/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge\&logo=gmail\&logoColor=white)](mailto:pedro.oliveira@monteirodev.com)
