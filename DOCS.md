# 🚀 Tutorial de Criação de Projeto com Fastify + TypeScript + Zod + Swagger

## 1. Inicialização do Projeto

```bash
npm init -y
```

O parâmetro `-y` aceita automaticamente todas as configurações padrão do `package.json`, sem perguntar nada no terminal.

---

## 2. Instalação das Dependências Principais (Fastify + Zod)

```bash
npm install fastify fastify-type-provider-zod @fastify/cors zod
```

* `fastify`: framework web leve e rápido.
* `fastify-type-provider-zod`: integração do Zod para validação de schemas.
* `@fastify/cors`: habilita CORS.
* `zod`: biblioteca de validação e tipagem TypeScript-first.

---

## 3. Instalação do TypeScript e Tipagens

```bash
npm install typescript tsx @types/node -D
```

Essas dependências são de desenvolvimento (`-D`) e permitem:

* `typescript`: suporte à linguagem TypeScript.
* `tsx`: execução de arquivos `.ts` sem compilação prévia.
* `@types/node`: tipagens para recursos do Node.js.

---

## 4. Criando o Servidor `src/index.ts`

```ts
import fastify from 'fastify'

const app = fastify({
  logger: true,
})

app.register(fastifyCors, {  
  origin: '*',
})

// Inicie o servidor
app.listen({ port: 3333 }, () => {
  console.log('🚀 HTTP Server running at http://localhost:3333')
})
```

---

## 5. Adicionando Compiladores de Validação e Serialização

Antes de iniciar o servidor, adicione:

```ts
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
```

Esses métodos permitem que o Fastify use os schemas do Zod para validar requisições e respostas.

---

## 6. Instalando Swagger

```bash
npm install @fastify/swagger @fastify/swagger-ui
```

* `@fastify/swagger`: gera a documentação da API automaticamente.
* `@fastify/swagger-ui`: exibe a UI interativa com os endpoints.


## 7. Registrando Swagger

```ts
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Fastify API - POO DB',
      description: 'API for activities database',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Local',
      },
    ],
  },
})

app.register(fastifySwaggerUi, { 
  routePrefix: '/docs',
})
```

## 8. Adicionando o WithTypeProvider e o Transform

```ts
const app = fastify().withTypeProvider<ZodTypeProvider>()


app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Fastify API - POO DB',
      description: 'API for activities database',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Local',
      },
    ],
  },
  transform: jsonSchemaTransform,
})
```
O jsonSchemaTransform que vem do 'fastify-type-provider-zod' serve para fazer o Fastify use os schemas do Zod para mostrar no swagger-ui

---
#