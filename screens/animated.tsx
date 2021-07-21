import React, { useState, useRef, useEffect, useCallback, createRef } from 'react';
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
import { call, event } from 'react-native-reanimated';

import { colors, screen } from '../Globals';

const Anime = ({ navigation }) => {
  const api = 'https://dog.ceo/api/breeds/image/random/10';
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [images, setImages] = useState([]);
  let myMainList = useRef(null);
  let myCarousel = useRef(null);
  const [changeIndex, setChangeIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0)

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  };

  const _onViewableItemsChanged = useCallback(({viewabilityItems, changed}) => {
    setCurrentIndex(changed[0].index);
  }, []);

  const fade_fun = (opacity, long, callback) => {
    Animated.timing(fadeAnim, {
      toValue: opacity,
      duration: long,
      useNativeDriver: true
    }).start(() => {
      return callback ? callback() : null;
    });
  }

  const carousel = (item) => {
    return (
      <TouchableOpacity
        onPress={() => myMainList.scrollToIndex({index: item.index, animated: true})}
        style={{
          paddingVertical: 5,
          backgroundColor: (item.index === currentIndex ? colors.primary : colors.dark),
          borderRadius: 15
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
      <Animated.View
        style={[styles.animatedView, { width: screen.width }]}
      >
        <FlatList
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={_onViewableItemsChanged}
          pagingEnabled={true}
          onScroll={() => myCarousel?.scrollToIndex({index: currentIndex, animated: true})}
          ref={(ref) => (myMainList = ref)}
          scrollEnabled={true}é
          horizontal={true}
          data={images}
          renderItem={(item) => <Image source={{ uri: item.item }} style={styles.mainPic}/>}
          initialScrollIndex={0}
          keyExtractor={(item) => item.toString()}
        >
        </FlatList>
      </Animated.View>
      <Animated.View style={{ opacity: fadeAnim }}>
        <FlatList
          pagingEnabled={true}
          initialScrollIndex={0}
          style={styles.carousel}
          horizontal={true}
          scrollEnabled={true}
          data={images}
          renderItem={(item) => carousel(item)}
          keyExtractor={(item) => item.toString()}
          ref={(ref) => (myCarousel = ref)}
        />
      </Animated.View>
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
    height: screen.height / 2
  },
  carouselPic: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 15
  }
});