import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

import { colors, icons } from './Globals'

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

const Index = ({ navigation }) => {
  return (
    <SafeAreaView style={{
      flexDirection: 'row',
      alignSelf: 'center'
    }}>
      <FlatList
        data={screens}
        renderItem={(item) => renderApp(navigation, item.item)}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
      ></FlatList>
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
