//widgets
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import UseEffect from './screens/useEffect';
import GraphQL from './screens/graphql';
import Login from './screens/login';
import Index from './index';

//globals
import { colors, icons } from './Globals';

//authorization
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={Login}
          ></Stack.Screen>
          <Stack.Screen
            name="Index"
            component={Index}
          ></Stack.Screen>
          <Stack.Screen
            name="UseEffect"
            component={UseEffect}
          ></Stack.Screen>
          <Stack.Screen
            name="GraphQL"
            component={GraphQL}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const Main = ({ navigation }) => {
  const [client, setClient] = useState({});
  /*const client = new ApolloClient({
    uri:  'https://www.dev.yabe.co/graphql',
    cache: new InMemoryCache()
  });*/

  useEffect(() => {
    const getAuthToken = async () => {
      return await AsyncStorage.getItem('auth');
    };

    const setAuthLink = setContext(async (req, context) => {
      const token = await AsyncStorage.getItem('auth');
      return {
        headers: {
          ...context.headers,
          authorization: `Bearer ${token}`
        }
      };
    });

    let token = getAuthToken();
    const link = new HttpLink({
      uri: 'https://www.dev.yabe.co/graphql',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!token) {
      navigation.navigate('Login');
      setClient(new ApolloClient({
        uri:  'https://www.dev.yabe.co/graphql',
        cache: new InMemoryCache()
      }));
    } else {
      setClient(new ApolloClient({
        link:  setAuthLink.concat(link),
        cache: new InMemoryCache()
      }));
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
});

export default Main;
