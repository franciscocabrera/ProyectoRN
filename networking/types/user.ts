export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'Non-Binary',
}

export enum Role {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user'
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  maidenName: string,
  age: 28,
  gender: Gender,
  email: string,
  phone: string,
  username: string,
  password: string,
  birthDate: Date,
  bloodGroup: string,
  height: number,
  weight: number,
  eyeColor: string,
  hair: {
    color: string,
    type: string
  },
  ip: string,
  address: {
    address: string,
    city: string,
    state: string,
    stateCode: string,
    postalCode: string,
    coordinates: {
      lat: number,
      lng: number
    },
    country: string
  },
  macAddress: string,
  university: string,
  bank: {
    cardExpire: string,
    cardNumber: string,
    cardType: string,
    currency: string,
    iban: string
  },
  company: {
    department: string,
    name: string,
    title: string,
    address: {
      address: string,
      city: string,
      state: string,
      stateCode: string,
      postalCode: string,
      coordinates: {
        lat: number,
        lng: number
      },
      country: string
    }
  },
  ein: string,
  ssn: string,
  userAgent: string,
  crypto: {
    coin: string,
    wallet: string,
    network: string
  },
  role: Role
}