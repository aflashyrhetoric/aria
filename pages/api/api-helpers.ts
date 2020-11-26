export const getAllUsers = (): Promise<Response> => {
  return fetch('http://localhost:3000/api/users')
}
