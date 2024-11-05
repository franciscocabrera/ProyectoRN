import { Contacts } from '../screens/Contacts'
import { Route } from './Route'
import { Stack } from './Stack'
import { Profile } from '../screens/Profile'

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Route.CONTACTS}>
      <Stack.Group
        screenOptions={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: '#fff',
        }}>
        <Stack.Screen component={Contacts} name={Route.CONTACTS} />
        <Stack.Screen component={Profile} name={Route.PROFILE} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
