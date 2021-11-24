import React, {FC} from 'react';
import {TouchableHighlight, View, Text, Animated, StyleSheet} from 'react-native';
import * as Haptics from 'expo-haptics';
import Colors from '../constants/Colors';

interface CBButtonProps {
  title: string;
  outline?: boolean;
}

const CBButton: FC<CBButtonProps> = ({title, outline = false}) => {
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
          <Text style={[styles.btnText, outline && styles.outlineText]}>{title}</Text>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: '85%',
    borderRadius: 8,
  },
  btn: {
    width: '100%',
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cbBlue,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },
  outline: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  outlineText: {
    color: 'black',
  },
});

export default CBButton;
