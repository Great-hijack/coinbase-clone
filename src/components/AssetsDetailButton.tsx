import React, {FC} from 'react';
import {View, Image, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import * as Haptics from 'expo-haptics';
import Colors from '../constants/Colors';
import {getLocaleCurrencyString} from '../utils';
import {appImages} from '../utils/images';

interface CBButtonProps {
  id: number;
  title: string;
  imgUrl: string;
  outline?: boolean;
  price: number;
  balance: number;
  symbol: string;
  onItemClicked: () => void;
}

const AssetsDetailButton: FC<CBButtonProps> = ({id, title, imgUrl, outline = false, price, balance, symbol, onItemClicked}) => {
  const balanceAsUSD = price * balance;
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
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{borderRadius: 10}}
        activeOpacity={0.9}
        onPress={() => {
          onItemClicked();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}>
        <View style={[styles.btn, outline && styles.outline]}>
          <View style={styles.btnName}>
            <Image style={styles.btnImage} source={id == 0 ? appImages.DolloarImg : {uri: `https://www.cryptocompare.com${imgUrl}`}} />
            <Text style={styles.btnNameContent}>{title}</Text>
          </View>
          <View style={styles.btnInfo}>
            <Text style={styles.btnPrice}>${getLocaleCurrencyString(balanceAsUSD.toFixed(2))}</Text>
            <Text style={styles.btnBalance}>{`${balance} ${symbol}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
  btnPrice: {
    fontSize: 16,
  },
  btnBalance: {
    color: '#636269',
  },
});

export default AssetsDetailButton;
