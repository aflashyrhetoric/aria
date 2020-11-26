import { PrismaClient } from '@prisma/client'
import { SetOK } from './utils'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const response = SetOK(res)
  const allUsers = await prisma.user.findMany()

  response.end(JSON.stringify(allUsers))

  prisma.$disconnect()
}
