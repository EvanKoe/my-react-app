import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, screen } from '../Globals'

const UseEffect = ({ navigation }) => {
  const [source, setSource] = useState('https://images.dog.ceo/breeds/sheepdog-english/n02105641_8760.jpg');
  const api = 'https://dog.ceo/api/breeds/image/random';

  const reloadImage = () => {
    fetch(api)
    .then((response) => response.json())
    .then((data) => setSource(data.message))
  };

  useEffect(() => {reloadImage()}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}> Dog generator </Text>
      <View style={{ flex: 1 }}>
        <Image source={{uri: source}} style={styles.image} />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => reloadImage()}
          style={styles.button}
        >
          <Text style={styles.buttonValue}>Generate !</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'sans-serif-condensed',
    marginHorizontal: 10,
    marginVertical: 10,
    color: colors.primary
  },
  image: {
    width: screen.width - 20,
    height: screen.height / 2,
    marginHorizontal: 10,
    borderRadius: 15
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30
  },
  buttonValue: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 10,
    textAlign: 'center',
    color: colors.white
  },
});

export default UseEffect;