import React from 'react';
import {View, Image, StyleSheet, Animated, Easing} from 'react-native';
import {appImages} from '../utils/images';
import {AntDesign} from '@expo/vector-icons';

const OverlaySpinner = () => {
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* <Image source={appImages.LoadingImg} /> */}
      {/* <AntDesign name="loading2" size={24} color="#575965" /> */}
      {/* <Animated.Image style={{transform: [{rotate: spin}]}} source={() => <AntDesign name="loading2" size={24} color="#575965" />} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 85,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default OverlaySpinner;
