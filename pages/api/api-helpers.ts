import { User } from '.prisma/client'

export const getAllUsers = (): Promise<User[]> => {
  return fetch('http://localhost:3000/api/users').then((res) => res.json())
}
