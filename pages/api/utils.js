import { StatusCodes } from 'http-status-codes'

const setHeaders = (res) => {
  res.setHeader('Content-Type', 'application/json')
  return res
}

export const SetOK = (res) => {
  res.statusCode = StatusCodes.OK
  return res
}
