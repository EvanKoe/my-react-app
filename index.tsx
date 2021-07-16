import React from 'react';
import { Text, TouchableOpacity, ToastAndroid } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

import { colors, icons } from './Globals'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';

const renderApp = (navigation, item) => {
  return (
    <SafeAreaView style={{ paddingHorizontal: 50 }}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          flexDirection: 'row'
        }}
        onPress={() => navigation.navigate(item.goto)}
      >
        <AntDesign name={item.icon} size={50} color={colors.primary} />
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          paddingLeft: 10
        }}> {item.goto} </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const logout = async ({ navigation }) => {
  await AsyncStorage.removeItem('auth', (error) => {
    if (error) {
      ToastAndroid.showWithGravity(
        "There was an error logging you out. Try again later",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    } else {
      ToastAndroid.showWithGravity(
        "You have been logged out",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return navigation.navigate('Login');
    }
  })
}

const Index = ({ navigation }) => {
  return (
    <SafeAreaView style={{ alignSelf: 'center' }}>
      <FlatList
        data={screens}
        renderItem={(item) => renderApp(navigation, item.item)}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        style={{ flex: 1 }}
      ></FlatList>
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 20,
          borderRadius: 50,
          marginBottom: 10
        }}
        onPress={() => logout({navigation})}
      >
        <Text style={{
          color: colors.white,
          fontWeight: 'bold',
          fontSize: 20,
          alignSelf: 'center'
        }}> Log out </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const screens = [
  {
    id: 0,
    goto: 'GraphQL',
    icon: icons.cli,
    text: 'Go to my GraphQL test !'
  },
  {
    id: 1,
    goto: 'UseEffect',
    icon: icons.swap,
    text: 'Go check my UseEffect test !'
  },
  {
    id: 2,
    goto: 'Anime',
    icon: icons.pic,
    text: 'Let\'s make our first query !'
  }
];

export default Index;
