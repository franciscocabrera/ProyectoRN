import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { get } from '../networking'
import { Paths } from '../networking/Paths'
import { useEffect, useState } from 'react'
import { User } from '../networking/types/user'

export default function Index() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      await get(Paths.USERS)
        .then(({ data }: any) => {
          setUsers(data.users)
        })
        .catch((error: any) => {
          console.error(error)
        })
    }

    fetchUsers()
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <ScrollView>
        {users.map(user => {
          return (
            <View key={user.id} style={styles.card}>
              <Text style={styles.cardText}>{user.firstName}</Text>
              <Text style={styles.cardText}>{user.lastName}</Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  cardText: {
    color: '#fff',
    marginHorizontal: 2,
  },
})
