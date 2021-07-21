import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View, ToastAndroid } from 'react-native';
import { colors, icons } from '../Globals';
import { Clickable } from '../Components/bottomNavBar';

import {LinearGradient} from 'expo-linear-gradient';

const Design = ({ navigator }) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#141e30', '#243bff']} style={styles.container}>
          <Text style={styles.title}> Welcome ! </Text>

          <Text style={{color: colors.white}}> Primary : </Text>
          <Clickable primary />
          <Text style={{color: colors.white}}> Secondary : </Text>
          <Clickable secondary />
          <Text style={{color: colors.white}}> Disabled : </Text>
          <Clickable disabled />
          <Text style={{color: colors.white}}> Empty : </Text>
          <Clickable />
        </LinearGradient>
      </View>
      {/*<Clickable
        text='Click here'
        textStyle={{
          color: colors.white,
          fontWeight: 'bold',
          fontSize: 30,
        }}
        icon={{
          name: icons.win,
          size: 30,
          color: colors.white
        }}
        iconStyle={{ marginVertical: 20 }}
        style={{ backgroundColor: colors.dark }}
        callback={() => {
          ToastAndroid.showWithGravity(
            "You clicked an element !",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }}
      />*/}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    height: '100%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.white
  }
});

export default Design;
