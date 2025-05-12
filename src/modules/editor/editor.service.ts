import { prisma } from '../../libs/prisma'
import type {
  CreateEditorInput,
  UpdateEditorInput,
} from './editor.schema'

export async function createEditor(data: CreateEditorInput) {
  return prisma.editor.create({ data })
}

export async function listEditors() {
  return prisma.editor.findMany()
}

export async function getEditorById(id: string) {
  return prisma.editor.findUnique({ where: { id: Number(id) } })
}

export async function updateEditor(id: string, data: UpdateEditorInput) {
  return prisma.editor.update({ where: { id: Number(id) }, data })
}

export async function deleteEditor(id: string) {
  return prisma.editor.delete({ where: { id: Number(id) } })
}
