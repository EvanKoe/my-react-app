import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from '../Globals';
import BottomNavBar from '../Components/bottomNavBar';

import {LinearGradient} from 'expo-linear-gradient';

const Design = ({ navigator }) => {
  return (
    <SafeAreaView>
      <View>
        <LinearGradient colors={['#141e30', '#243bff']} style={styles.container}>
          <Text style={styles.title}> Welcome ! </Text>
        </LinearGradient>
      </View>
      <View style={{
        backgroundColor: colors.black,
        flex: 1
      }}>
        <Text>BWA</Text>
      </View>
      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.white
  }
});

export default Design;