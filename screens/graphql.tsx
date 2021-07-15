import { ApolloProvider, gql, useQuery } from '@apollo/client';
import { printIntrospectionSchema } from 'graphql';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, icons } from "../Globals";

//icons
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GraphQL = ({ navigation }: any) => {
  const [tab, setTab] = useState([]);
  const [srch, setSrch] = useState('');
  const [token, setToken] = useState('');

  const QUERY = gql`
    query getUsers {
      users {
        list (first: 20) {
          data {
            edges {
              node {email}
            }
          }
        }
      }
    }`;

  const renderItem = (eachOne: any) => {
    return (
      <View style={styles.renderItem}>
        <Text style={{ fontSize: 20, color: colors.primary }}> { eachOne.node.email } </Text>
      </View>
    );
  }

  const Query = () => {
    if (token === '' || token === undefined)
      return <Text> Please log in </Text>
    const { loading, error, data } = useQuery(QUERY);

    if (error)
      return <Text> { "Error :(" } </Text>
    if (loading)
      return <Text> Loading content ... </Text>

    const userList = data.users.list.data.edges;

    return (
      <FlatList
        scrollEnabled={true}
        data={userList}
        renderItem={(eachOne) => renderItem(eachOne.item)}
        keyExtractor={(eachOne) => eachOne.node.email.toString()}
      />
    )
  }

  useEffect(() => {
    const getToken = async () => {
      return await AsyncStorage.getItem('auth');
    };
    setToken(getToken().toString());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={styles.title}> Bonjour GraphQL ! </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Query />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
    marginHorizontal: 30
  },
  renderItem: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20
  }
});

export default GraphQL;
