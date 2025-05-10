const fs = require('node:fs')
const path = require('node:path')

const moduleName = process.argv[2]

if (!moduleName) {
  console.error('Você precisa informar o nome do módulo. Ex: node gen-modules.js category')
  process.exit(1)
}

const capitalized = moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
const lower = moduleName.toLowerCase()

const baseDir = path.join(process.cwd(), 'src', 'modules', moduleName)

if (fs.existsSync(baseDir)) {
  console.error('Esse módulo já existe!')
  process.exit(1)
}

fs.mkdirSync(baseDir, { recursive: true })

// 1. Controller
fs.writeFileSync(
  path.join(baseDir, `${lower}.controller.ts`),
  `import type { FastifyReply, FastifyRequest } from 'fastify'
import { idParamSchema } from '../../schemas/common.schema'
import { create${capitalized}Schema, update${capitalized}Schema } from './${lower}.schema'
import {
  create${capitalized},
  delete${capitalized},
  get${capitalized}ById,
  list${capitalized}s,
  update${capitalized},
} from './${lower}.service'

export async function create${capitalized}Controller(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = create${capitalized}Schema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).send(parsed.error.format())
  }

  const item = await create${capitalized}(parsed.data)
  return res.status(201).send(item)
}

export async function list${capitalized}sController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await list${capitalized}s()
  return res.send(items)
}

export async function get${capitalized}ByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const item = await get${capitalized}ById(id)

  if (!item)
    return res.status(404).send({ message: '${capitalized} não encontrado' })

  return res.send(item)
}

export async function update${capitalized}Controller(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const parsedBody = update${capitalized}Schema.safeParse(req.body)

  if (!parsedBody.success)
    return res.status(400).send(parsedBody.error.format())

  const item = await update${capitalized}(id, parsedBody.data)

  return res.send(item)
}

export async function delete${capitalized}Controller(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  await delete${capitalized}(id)

  return res.send({ message: '${capitalized} deletado com sucesso' })
}
`
)

// 2. Service
fs.writeFileSync(
  path.join(baseDir, `${lower}.service.ts`),
  `import { prisma } from '../../libs/prisma'
import type {
  Create${capitalized}Input,
  Update${capitalized}Input,
} from './${lower}.schema'

export async function create${capitalized}(data: Create${capitalized}Input) {
  return prisma.${lower}.create({ data })
}

export async function list${capitalized}s() {
  return prisma.${lower}.findMany()
}

export async function get${capitalized}ById(id: string) {
  return prisma.${lower}.findUnique({ where: { id: Number(id) } })
}

export async function update${capitalized}(id: string, data: Update${capitalized}Input) {
  return prisma.${lower}.update({ where: { id: Number(id) }, data })
}

export async function delete${capitalized}(id: string) {
  return prisma.${lower}.delete({ where: { id: Number(id) } })
}
`
)

// 3. Entity (interface vazia)
fs.writeFileSync(
  path.join(baseDir, `${lower}.entity.ts`),
  `export interface ${capitalized} {
  // Defina os campos da entidade aqui
}
`
)

// 4. Schema
fs.writeFileSync(
  path.join(baseDir, `${lower}.schema.ts`),
  `import { z } from 'zod'

export const ${lower}Schema = z.object({
  id: z.number(),
  // adicione os outros campos aqui
})
export type ${capitalized} = z.infer<typeof ${lower}Schema>

export const create${capitalized}Schema = z.object({
  // campos obrigatórios
})
export type Create${capitalized}Input = z.infer<typeof create${capitalized}Schema>

export const update${capitalized}Schema = create${capitalized}Schema.partial()
export type Update${capitalized}Input = z.infer<typeof update${capitalized}Schema>
`
)

// 5. Routes
fs.writeFileSync(
  path.join(baseDir, `${lower}.routes.ts`),
  `import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  create${capitalized}Controller,
  delete${capitalized}Controller,
  get${capitalized}ByIdController,
  list${capitalized}sController,
  update${capitalized}Controller,
} from './${lower}.controller'
import {
  ${lower}Schema,
  create${capitalized}Schema,
  update${capitalized}Schema,
} from './${lower}.schema'

export async function ${lower}Routes(app: FastifyTypedInstance) {
  app.post(
    '/${lower}s',
    {
      schema: {
        body: create${capitalized}Schema,
        response: {
          201: ${lower}Schema,
          ...commonResponseSchema,
        },
      },
    },
    create${capitalized}Controller
  )

  app.get(
    '/${lower}s',
    {
      schema: {
        response: {
          200: z.array(${lower}Schema),
          ...commonResponseSchema,
        },
      },
    },
    list${capitalized}sController
  )

  app.get(
    '/${lower}s/:id',
    {
      schema: {
        params: idParamSchema,
        response: {
          200: ${lower}Schema,
          ...commonResponseSchema,
        },
      },
    },
    get${capitalized}ByIdController
  )

  app.put(
    '/${lower}s/:id',
    {
      schema: {
        params: idParamSchema,
        body: update${capitalized}Schema,
        response: {
          200: ${lower}Schema,
          ...commonResponseSchema,
        },
      },
    },
    update${capitalized}Controller
  )

  app.delete(
    '/${lower}s/:id',
    {
      schema: {
        params: idParamSchema,
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    delete${capitalized}Controller
  )
}
`
)

console.log(`✅ Módulo '${moduleName}' gerado com sucesso em src/${moduleName}`)
