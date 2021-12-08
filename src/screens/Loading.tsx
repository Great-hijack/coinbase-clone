import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';

const {width: windowsWidth, height: windowsHeight} = Dimensions.get('window');

const Loading = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.animText}>coinbase</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -windowsHeight * 0.9,
    left: windowsWidth / 2 - windowsHeight,
    height: windowsHeight * 2,
    width: windowsHeight * 2,
    backgroundColor: '#0149FF',
    borderRadius: windowsHeight,
    zIndex: 100,
  },
  animText: {
    color: '#FFF',
    fontSize: 30,
    fontFamily: 'CoinbaseDisplay-Medium',
    marginTop: -windowsHeight * 0.8,
  },
});

export default Loading;
