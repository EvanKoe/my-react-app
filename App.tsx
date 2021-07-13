//widgets
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import UseEffect from './screens/useEffect';
import GraphQL from './screens/graphql';
import Index from './index';

//globals
import { colors, client } from './Globals';
import { ApolloProvider } from '@apollo/client';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
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

const Main = () => {
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

export default App;