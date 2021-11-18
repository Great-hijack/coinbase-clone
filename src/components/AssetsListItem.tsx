import React, {FC} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import Colors from '../constants/Colors';
import {getLocaleCurrencyString} from '../utils';

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
        <Image
          style={styles.logo}
          source={{
            uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`,
          }}
        />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={{}}>${getLocaleCurrencyString(balanceAsUSD.toFixed(2))}</Text>
            <Text style={{}}>{`${balance} ${symbol}`}</Text>
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
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default AssetsListItem;
