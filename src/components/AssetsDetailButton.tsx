import React, {FC} from 'react';
import {TouchableHighlight, View, Image, Text, Animated, StyleSheet} from 'react-native';
import * as Haptics from 'expo-haptics';
import Colors from '../constants/Colors';
import DolloarImg from '../../assets/dollar.png';

interface CBButtonProps {
  title: string;
  outline?: boolean;
}

const AssetsDetailButton: FC<CBButtonProps> = ({title, outline = false}) => {
  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{scale: animatedValue}],
  };

  return (
    <Animated.View style={[styles.btnContainer, animatedStyle]}>
      <TouchableHighlight
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{borderRadius: 10}}
        activeOpacity={0.9}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}>
        <View style={[styles.btn, outline && styles.outline]}>
          <View style={styles.btnName}>
            <Image style={styles.btnImage} source={DolloarImg} />
            <Text style={styles.btnNameContent}>Bitcoin</Text>
          </View>
          <View style={styles.btnInfo}>
            <Text style={{fontSize: 16}}>$208</Text>
            <Text style={{color: '#636269'}}>0.0000BTC</Text>
          </View>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: '85%',
    borderRadius: 8,
    marginTop: 24,
    borderColor: '#E8E5E8',
  },
  btn: {
    width: '100%',
    flexDirection: 'row',
    height: 57,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingStart: 12,
    paddingEnd: 12,
  },
  btnName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  btnImage: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderRadius: 16,
    borderWidth: 0.3,
    borderColor: Colors.border,
  },
  btnNameContent: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 16,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },
  outline: {
    borderWidth: 1,
    borderColor: '#E8E5E8',
    backgroundColor: 'white',
  },
  outlineText: {
    color: 'black',
  },
  btnInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },
});

export default AssetsDetailButton;
