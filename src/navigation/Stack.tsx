import { ParamListBase } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { Route } from './Route'
import { User } from '../networking/types/user'

export interface ParamList extends ParamListBase {
  [Route.PROFILE]: {
    user: User
    color: string
  }
}

export type RouteComponent<T extends keyof ParamList> = React.FunctionComponent<
  NativeStackScreenProps<ParamList, T>
>

export const Stack = createNativeStackNavigator()
