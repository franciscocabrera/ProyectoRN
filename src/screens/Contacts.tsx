import { Text, View, StyleSheet, SectionList, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { Colors, ColorKeys } from '../constants/Colors'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { get } from '../networking'
import { Paths } from '../networking/Paths'
import { User } from '../networking/types/user'
import { ParamList } from '../navigation/Stack'
import { Route } from '../navigation/Route'

interface SectionData {
  title: string
  data: User[]
}

const getRandomColor = () => {
  const colorKeys = Object.keys(Colors) as ColorKeys[]
  const randomIndex = Math.floor(Math.random() * colorKeys.length)
  return Colors[colorKeys[randomIndex]]
}

export const Contacts: React.FC = () => {
  const [sections, setSections] = useState<SectionData[]>([])
  const [userColors, setUserColors] = useState<{ [key: string]: string }>({})
  const { navigate } = useNavigation<NavigationProp<ParamList>>()

  const navigateToProfile = (user: User) => {
    navigate(Route.PROFILE, { user: user, color: userColors[user.id] })
  }

  useEffect(() => {
    const fetchUsers = async () => {
      await get(Paths.USERS)
        .then(({ data }: any) => {
          const sortedUsers = data.users.sort((user1: User, user2: User) =>
            user1.firstName.localeCompare(user2.firstName),
          )

          const groupedUsers = sortedUsers.reduce(
            (acc: { [key: string]: User[] }, user: User) => {
              const firstLetter = user.firstName.charAt(0).toUpperCase()
              if (!acc[firstLetter]) acc[firstLetter] = []
              acc[firstLetter].push(user)
              return acc
            },
            {},
          )

          const sectionData = Object.keys(groupedUsers)
            .sort()
            .map(letter => ({
              title: letter,
              data: groupedUsers[letter],
            }))

          setSections(sectionData)

          const colorsForUsers: { [key: string]: string } = {}
          sortedUsers.forEach((user: User) => {
            colorsForUsers[user.id] = getRandomColor()
          })
          setUserColors(colorsForUsers)
        })
        .catch((error: any) => {
          console.error(error)
        })
    }

    fetchUsers()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigateToProfile(item)}>
            <View
              style={[
                styles.roundContainer,
                { backgroundColor: userColors[item.id] },
              ]}>
              <Text style={styles.roundContainerText}>
                {item.firstName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.cardText}>
              {item.firstName + ' ' + item.lastName}
            </Text>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderSectionFooter={() => <View style={styles.separator} />}
        stickySectionHeadersEnabled={true}
        style={styles.contactsList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contactsList: {
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 50,
  },
  cardText: {
    color: '#fff',
    marginHorizontal: 2,
    paddingVertical: 10,
    alignSelf: 'center',
    fontSize: 18,
  },
  roundContainer: {
    height: 50,
    width: 50,
    padding: 5,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    overflow: 'hidden',
  },
  roundContainerText: {
    fontSize: 20,
  },
  sectionHeader: {
    left: 0,
    top: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  sectionHeaderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    backgroundColor: '#1a1d20',
    height: 1,
    marginLeft: 50,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    marginHorizontal: 20,
    marginVertical: 10,
  },
})
