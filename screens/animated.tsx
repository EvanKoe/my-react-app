import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  ImageStore
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { call } from 'react-native-reanimated';

import { colors, screen } from '../Globals';

const Anime = ({ navigation }) => {
  const api = 'https://dog.ceo/api/breeds/image/random/10';
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [images, setImages] = useState([]);
  const [currImage, setCurrImage] = useState();
  let myFlatList = useRef(null);

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
            myFlatList.scrollToIndex({index: item.index, animated: true});
            fade_fun(1, 100, undefined);
          });
        }}
      >
        <Image source={{uri: item.item.toString()}} style={styles.carouselPic}/>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    setImages([]);
    fetch(api)
    .then((response) => response.json())
    .then((data) => {
      setImages(data.message);
    })
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: colors.dark, flex: 1 }}>
      <Animated.View style={[styles.animatedView, {opacity: fadeAnim}]}>
        <FlatList
          ref={(ref) => (myFlatList = ref)}
          scrollEnabled={true}
          horizontal={true}
          data={images}
          renderItem={(item) => <Image source={{ uri: item.item }} style={styles.mainPic}/>}
          initialScrollIndex={0}
          keyExtractor={(item) => (item.index)}
        >
        </FlatList>
      </Animated.View>
      <FlatList
        style={styles.carousel}
        horizontal={true}
        scrollEnabled={true}
        data={images}
        renderItem={(item) => carousel(item)}
        keyExtractor={(item) => item.toString()}
      />
    </SafeAreaView>
  )
}

export default Anime;

const styles = StyleSheet.create({
  animatedView: {
    paddingTop: 100,
    flexDirection: 'row'
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