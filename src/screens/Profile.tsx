import {
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  Pressable,
  Platform,
} from 'react-native'
import { RouteComponent } from '../navigation/Stack'
import { Route } from '../navigation/Route'

export const Profile: RouteComponent<Route.PROFILE> = ({
  route: { params },
}) => {
  const user = params?.user
  const color = params.color

  const userAddress = `${user.address.address}, ${user.address.postalCode} ${user.address.city}, ${user.address.state}, ${user.address.country}`

  const onPressCall = () => {
    Linking.openURL(`tel:${user.phone}`)
  }

  const onPressMessage = () => {
    Linking.openURL(`sms:${user.phone}`)
  }

  const onPressEmail = () => {
    Linking.openURL(`mailto:${user.email}`)
  }

  const onPressGeo = () => {
    const latitude = user.address.coordinates.lat
    const longitude = user.address.coordinates.lng
    const url = Platform.select({
      ios: `maps:${latitude},${longitude}?q=${latitude},${longitude}`, // Apple Maps on iOS
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`, // Google Maps on Android
    })

    Linking.openURL(url || '').catch(err =>
      console.error('Error opening map', err),
    )
  }

  return (
    <View style={styles.container}>
      <View style={[styles.roundViewContainer, { backgroundColor: color }]}>
        <Text style={styles.roundViewText}>
          {user.firstName.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={styles.name}>{user.firstName + ' ' + user.lastName}</Text>
      <View style={styles.quickButtonsContainer}>
        <View style={styles.quickButton}>
          <Pressable style={styles.quickButtonsIcon} onPress={onPressCall}>
            <Image
              source={require('../../assets/images/telephone.png')}
              style={styles.icon}
            />
          </Pressable>
          <Text style={styles.quickButtonText}>Call</Text>
        </View>
        <View style={styles.quickButton}>
          <Pressable style={styles.quickButtonsIcon} onPress={onPressMessage}>
            <Image
              source={require('../../assets/images/message.png')}
              style={styles.icon}
            />
          </Pressable>
          <Text style={styles.quickButtonText}>Text</Text>
        </View>
        <View style={styles.quickButton}>
          <Pressable style={styles.quickButtonsIcon} onPress={onPressEmail}>
            <Image
              source={require('../../assets/images/mail.png')}
              style={styles.icon}
            />
          </Pressable>
          <Text style={styles.quickButtonText}>Email</Text>
        </View>
        <View style={styles.quickButton}>
          <Pressable style={styles.quickButtonsIcon} onPress={onPressGeo}>
            <Image
              source={require('../../assets/images/location.png')}
              style={styles.icon}
            />
          </Pressable>
          <Text style={styles.quickButtonText}>Location</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeaderText}>Contact Info</Text>
        <View style={styles.infoUnitContainer}>
          <Image
            source={require('../../assets/images/telephone.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>
        <View style={styles.infoUnitContainer}>
          <Image
            source={require('../../assets/images/mail.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.infoUnitContainer}>
          <Image
            source={require('../../assets/images/location.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>{userAddress}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    width: '100%',
    height: '100%',
    padding: 15,
    alignItems: 'center',
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
  },
  icon: {
    height: 25,
    width: 25,
    tintColor: '#d7dae1',
  },
  infoContainer: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#3A3F45',
    marginTop: 30,
    padding: 15,
    paddingBottom: 30,
  },
  infoUnitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  infoHeaderText: {
    color: '#d7dae1',
    fontSize: 18,
    marginBottom: 10,
  },
  infoText: {
    color: '#d7dae1',
    fontSize: 15,
    marginHorizontal: 15,
  },
  infoIcon: {
    height: 18,
    width: 18,
    tintColor: '#d7dae1',
  },
  quickButton: {
    alignItems: 'center',
  },
  quickButtonText: {
    color: '#d7dae1',
    marginTop: 5,
  },
  quickButtonsContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 30,
  },
  quickButtonsIcon: {
    backgroundColor: '#43464d',
    padding: 10,
    borderRadius: 50,
  },
  roundViewContainer: {
    borderRadius: 100,
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  roundViewText: {
    fontWeight: 'bold',
    fontSize: 68,
  },
})
