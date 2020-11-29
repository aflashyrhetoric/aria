import { PrismaClient } from '@prisma/client'
import {
  UserRole,
  SessionStatus,
  StudentCondition,
  ServiceDeliveryModel,
  ProgressMade,
  SessionGoal,
  Prompt,
  SessionType,
  PromptType,
} from '.prisma/client'
import { randomNumber } from '../pages/utils'

const faker = require('faker')
const prisma = new PrismaClient()

function oneOf(type) {
  const keys = Object.keys(type)
  const rn = randomNumber(keys.length)
  return keys[rn]
}

function getMockUser() {
  return {
    name: faker.name.firstName(),
    email: faker.randomEmail(),
    role: oneOf(UserRole),
  }
}

function getMockPrompt() {
  return {
    promptType: oneOf(PromptType),
    description: faker.lorem.sentence(),
    wasUseful: true,
  }
}

function getMockSession() {
  return {
    startTime: Date.now(),
    status: oneOf(SessionStatus),
    progressMade: oneOf(ProgressMade),
    goal: oneOf(SessionGoal),
    responseAccuracy: 100,
    prompts: [getMockPrompt(), getMockPrompt()],
    type: oneOf(SessionType),
    notes: faker.lorem.sentences(3),
  }
}

async function seed(req, res) {
  const user = getMockUser()
  const session = getMockSession()

  const users = await prisma.user.upsert({
    data: {
      ...getMockUser(),
      sessions: {
        create: [getMockSession(), getMockSession()],
      },
    },
  })
  prisma.$disconnect()
}
