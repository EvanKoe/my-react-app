import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image
} from 'react-native';
import { call } from 'react-native-reanimated';

import { colors, screen } from '../Globals';

const Anime = ({ navigation }) => {
  const api = 'https://dog.ceo/api/breeds/image/random/10';
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [images, setImages] = useState([]);
  const [currImage, setCurrImage] = useState('');

  const fade_fun = (opacity, long, callback) => {
    Animated.timing(fadeAnim, {
      toValue: opacity,
      duration: long,
      useNativeDriver: true
    }).start(() => {
      if (callback)
        return callback()
    });
  }

  const carousel = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          fade_fun(0, 100, () => {
            setCurrImage(item.toString());
            fade_fun(1, 100, undefined);
          });
        }}
      >
        <Image source={{uri: item.toString()}} style={styles.carouselPic}/>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    setImages([]);
    fetch(api)
    .then((response) => response.json())
    .then((data) => {
      setImages(data.message);
      setCurrImage(data.message[0]);
    })
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: colors.dark, flex: 1 }}>
      {/*<View>
        <Animated.View style={[styles.mainView, { opacity: fadeAnim }]}>
          <Text style={styles.mainTitle}> Animated </Text>
        </Animated.View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fade_fun(isDisplayed ? 'o' : 'i')}
        >
          <Text style={{ color: '#fff' }}> Fade { isDisplayed ? 'out' : 'in' } </Text>
        </TouchableOpacity>
      </View>*/}
      <Animated.View style={[styles.animatedView, { opacity: fadeAnim }]}>
        <Image source={{ uri: currImage }} style={styles.mainPic}/>
      </Animated.View>
      <FlatList
        style={styles.carousel}
        horizontal={true}
        scrollEnabled={true}
        data={images}
        renderItem={(item) => carousel(item.item)}
        keyExtractor={(item) => item.toString()}
      />
    </SafeAreaView>
  )
}

export default Anime;

const styles = StyleSheet.create({
  animatedView: {
    width: screen.width,
    paddingTop: 100
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 30,
    marginVertical: 5,
    alignContent: 'center'
  },
  mainView: {
    backgroundColor: colors.primaryDark,
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: 20,
    marginVertical: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  carousel: {
    width: screen.width,
    paddingVertical: 30
  },
  mainPic: {
    width: screen.width,
    height: screen.height / 2,
    marginVertical: 10
  },
  carouselPic: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 15
  }
});