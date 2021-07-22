import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View, ToastAndroid } from 'react-native';
import { colors, icons } from '../Globals';
import { Clickable } from '../Components/bottomNavBar';

import { LinearGradient } from 'expo-linear-gradient';
import { printIntrospectionSchema } from 'graphql';

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
          <Clickable icon={icons.pic} />
        </LinearGradient>
      </View>
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
