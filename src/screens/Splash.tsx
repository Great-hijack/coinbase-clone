import React, {useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const {width: windowsWidth, height: windowsHeight} = Dimensions.get('window');

const Splash = () => {
  const animateRef = useRef<View & Animatable.View>(null);

  useEffect(() => {
    setTimeout(() => {
      if (animateRef.current && typeof animateRef.current.animate === 'function') {
        animateRef.current.animate('zoomOut', 1000);
      }
    }, 1500);
  }, []);

  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.8: {
      opacity: 1,
      scale: 1.5,
    },
    0.9: {
      opacity: 0.7,
      scale: 1.5,
    },
    1: {
      opacity: 0.4,
      scale: 1.5,
    },
  };

  return (
    <Animatable.View ref={animateRef} style={styles.screen} easing={'ease-in-out-expo'} pointerEvents={'box-none'}>
      <Animatable.Text style={styles.animText} animation={zoomOut} delay={800} duration={1000}>
        coinbase
      </Animatable.Text>
    </Animatable.View>
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

export default Splash;
