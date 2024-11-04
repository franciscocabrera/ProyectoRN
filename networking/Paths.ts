import { User } from './types/user'

export enum Paths {
  USERS = 'users',
  USER = 'users/%s',
}

export type RequestResponse = {
  [Paths.USERS]: User[]
  [Paths.USER]: User
}

export type RequestInput = {
  [Paths.USERS]: undefined
  [Paths.USER]: Partial<User>
}