import React, {useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

const Splash = () => {
  const animateRef = useRef<View>(null);

  useEffect(() => {
    setTimeout(() => {
      animateRef?.current.animate('zoomOut', 1000);
    }, 1500);
    // setTimeout(() => {
    //   navigation.navigate('TabNavigator');
    // }, 2400);
  }, []);

  const size = windowsHeight * 2;
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
    <Animatable.View
      ref={animateRef}
      style={[
        styles.screen,
        {
          position: 'absolute',
          bottom: -windowsHeight * 0.9,
          left: windowsWidth / 2 - size / 2,
          height: size,
          width: size,
          backgroundColor: '#0000ff',
          borderRadius: size / 2,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
        },
      ]}
      easing={'ease-in-out-expo'}
      pointerEvents={'box-none'}>
      <Animatable.Text
        style={{color: '#FFF', fontWeight: 'bold', fontSize: 24, marginTop: -windowsHeight * 0.8}}
        animation={zoomOut}
        delay={800}
        duration={1000}>
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
  },
});

export default Splash;
