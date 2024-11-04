import axios from 'axios'
import Config from 'react-native-config'
import { format } from 'util'

import { Paths, RequestInput, RequestResponse } from './Paths'

if (true) {
  Config.API_SCHEME = 'http'
  Config.API_HOST = 'dummyjson.com'
}

const instance = axios.create({
  baseURL: format(
    '%s://%s', //
    Config.API_SCHEME,
    Config.API_HOST,
  ),
  headers: { 'Content-Type': 'application/json', 'Accept-Encoding': 'gzip' },
})

export const get = <T extends Paths>(path: T) =>
  instance.get<RequestResponse[T]>(path)

export const patch = <T extends Paths>(path: T, config?: RequestInput[T]) =>
  instance.patch<RequestResponse[T]>(path, config)

export const post = <T extends Paths>(path: T, config?: RequestInput[T]) =>
  instance.post<RequestResponse[T]>(path, config)

export const del = <T extends Paths>(path: T) => instance.delete(path)
