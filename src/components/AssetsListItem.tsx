import React, {FC} from 'react';
import {View, Text, StyleSheet, Image, Pressable, ImageBackground} from 'react-native';
import Colors from '../constants/Colors';
import {getLocaleCurrencyString} from '../utils';
import {appImages} from '../utils/images';

interface AssetsListItemProps {
  id: number;
  name: string;
  symbol: string;
  price: number;
  balance: number;
  imgUrl: string;
  onItemClicked: () => void;
}

const AssetsListItem: FC<AssetsListItemProps> = ({id, name, symbol, price, balance, imgUrl, onItemClicked}) => {
  const balanceAsUSD = price * balance;

  return (
    <Pressable
      style={styles.listItem}
      onPress={() => {
        onItemClicked();
      }}>
      <View style={styles.itemContainer}>
        <Image source={id == 0 ? appImages.DolloarImg : {uri: `https://www.cryptocompare.com/${imgUrl}`}} style={styles.logo} />
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.priceText}>${getLocaleCurrencyString(balanceAsUSD.toFixed(2))}</Text>
            <Text style={id == 0 ? {display: 'none'} : styles.balanceText}>{`${balance} ${symbol}`}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    justifyContent: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '4%',
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 16,
    borderRadius: 16,
    borderWidth: 0.3,
    borderColor: Colors.border,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
