import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  const allUsers = await prisma.user.findMany()
  res.end(JSON.stringify(allUsers))
  prisma.$disconnect()
}
