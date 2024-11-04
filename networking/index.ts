import axios, { AxiosRequestConfig } from 'axios'
import Config from 'react-native-config'
import { format } from 'util'

import { Paths, RequestInput, RequestResponse } from './Paths'

if (true) {
  Config.API_SCHEME = 'http'
  Config.API_HOST = 'https://dummyjson.com'
  Config.API_VERSION = 'api'
}

const instance = axios.create({
  baseURL: format(
    '%s://%s/%s/',
    Config.API_SCHEME,
    Config.API_HOST,
    Config.API_VERSION,
  ),
  headers: { 'Content-Type': 'application/json',
             'Accept-Encoding': 'gzip' },
})

export const configureInstance = (token: string) => {
  instance.defaults.headers.common.Authorization = 'Bearer ' + token
}

export const get = <T extends Paths>(path: T, config?: AxiosRequestConfig<T>) =>
  instance.get<RequestResponse[T]>(path, config)

export const patch = <T extends Paths>(path: T, config?: RequestInput[T]) =>
  instance.patch<RequestResponse[T]>(path, config)

export const post = <T extends Paths>(path: T, config?: RequestInput[T]) =>
  instance.post<RequestResponse[T]>(path, config)

export const del = <T extends Paths>(
  path: T,
  config?: AxiosRequestConfig<any>,
) => instance.delete(path, config)