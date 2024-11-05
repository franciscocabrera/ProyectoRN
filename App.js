import { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar'
import { RootNavigator } from './src/navigation/RootNavigator'

export default function App() {
  NavigationBar.setBackgroundColorAsync('#25292e')

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
