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
import Anime from './screens/animated';
import Design from './screens/design';

//globals
import { colors, icons } from './Globals';

//authorization
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, makeVar, useReactiveVar } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';

const Stack = createStackNavigator();
export const toggleCurrentUser = makeVar(false);

const App = () => {
  const currentUser = useReactiveVar(toggleCurrentUser);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Index"
            component={Index}
          />
          <Stack.Screen
            name="UseEffect"
            component={UseEffect}
          />
          <Stack.Screen
            name="GraphQL"
            component={GraphQL}
          />
          <Stack.Screen
            name="Anime"
            component={Anime}
          />
          <Stack.Screen
            name="Design"
            component={Design}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const Main = ({ navigation }) => {
  const [client, setClient] = useState({});
  const currentUser = useReactiveVar(toggleCurrentUser);

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
      }
    });

    if (!token) {
      toggleCurrentUser(false);
      setClient(new ApolloClient({
        uri:  'https://www.dev.yabe.co/graphql',
        cache: new InMemoryCache()
      }));
    } else {
      toggleCurrentUser(true);
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
