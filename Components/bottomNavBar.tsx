import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ToastAndroid
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ClickableIcon = (icon, style, callback) => {
  return (
    <TouchableOpacity
      onPress={() => callback ? callback() : {}}
      style={style ? style : {}}
    >
      <AntDesign name={icon?.name} size={
        icon.size ? icon.size : 24
      } color={
        icon.color ? icon.color : 'black'
      }/>
    </TouchableOpacity>
  )
};

const BottomNavBar = (style) => {
  return (
    <SafeAreaView style={[style ? style : {}, { flexDirection: 'row' }]}>
      <ClickableIcon
        icon={{name: 'youtube'}}
        callback={() => {
          ToastAndroid.showWithGravity(
            "You clicked an element !",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
        }}
      />
    </SafeAreaView>
  )
};

export default BottomNavBar;