import React, {FC} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import Colors from '../constants/Colors';
import {getLocaleCurrencyString} from '../utils';
import DolloarImg from '../../assets/dollar.png';

interface AssetsListItemProps {
  id: number;
  name: string;
  symbol: string;
  price: number;
  balance: number;
}

const AssetsListItem: FC<AssetsListItemProps> = ({id, name, symbol, price, balance}) => {
  const balanceAsUSD = price * balance;

  return (
    <TouchableHighlight style={styles.listItem} underlayColor="#FBFAFB">
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.logo} source={id == 0 ? DolloarImg : {uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}} />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.priceText}>${getLocaleCurrencyString(balanceAsUSD.toFixed(2))}</Text>
            <Text style={id == 0 ? {display: 'none'} : styles.balanceText}>{`${price} ${symbol}`}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  listItem: {
    justifyContent: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '4%',
    borderRadius: 8,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 16,
    borderRadius: 16,
    borderWidth: 0.3,
    borderColor: Colors.border,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  balanceText: {
    fontSize: 16,
    fontWeight: 'normal',
    display: 'flex',
    color: '#85848D',
  },
});

export default AssetsListItem;
