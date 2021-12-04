import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';

import Coin from '../models/Coin';
import Colors from '../constants/Colors';
import {FlatList} from 'react-native-gesture-handler';
import {getLocaleCurrencyString} from '../utils';

interface TopMoversProps {
  coinData: Coin[];
}

const Watchlist: FC<TopMoversProps> = ({coinData}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableHighlight
        underlayColor={'#FAFBFE'}
        onPress={() => {
          console.log(item.symbol);
        }}>
        <View style={styles.listItem}>
          <View style={styles.itemView}>
            <Image
              style={styles.logo}
              source={{
                uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id.toString()}.png`,
              }}
            />
            <View>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.tickerText}>{item.symbol}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.priceText}>${getLocaleCurrencyString(item.price.toFixed(2))}</Text>
            <Text
              style={[
                {
                  color: item.percentChange > 0 ? Colors.positiveGreen : Colors.negativeRed,
                },
                styles.changeText,
              ]}>
              {item.percentChange > 0 ? '+' : ''}
              {item.percentChange.toFixed(2)}%
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'flex-start',
        marginLeft: '6%',
      }}>
      <Text style={styles.watchlistText}>Watchlist</Text>
      <View style={[{height: coinData.length * 75}, styles.watchlistContainer]}>
        <FlatList data={coinData} keyExtractor={item => item.id.toString()} scrollEnabled={false} renderItem={renderItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  watchlistText: {
    fontWeight: 'bold',
    fontSize: 21,
    marginTop: 30,
    marginBottom: 10,
  },
  watchlistContainer: {
    width: '88%',
    backgroundColor: 'white',
  },
  listItem: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    padding: 16,
    paddingHorizontal: 0,
    justifyContent: 'space-between',
  },
  itemView: {
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
  nameText: {
    fontSize: 18,
    width: 145,
  },
  tickerText: {
    color: Colors.secondarySubtitle,
    fontSize: 17,
  },
  priceText: {
    fontSize: 16,
    textAlign: 'right',
  },
  changeText: {
    textAlign: 'right',
    fontSize: 16,
  },
});

export default Watchlist;
