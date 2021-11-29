import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

import Colors from '../constants/Colors';
import {FlatList} from 'react-native-gesture-handler';
import {getLocaleCurrencyString} from '../utils';
import {Balance} from '../store/actions/history';

interface TopMoversProps {
  changeHistory: Balance[] | undefined;
  price: number;
}

const ChangeHistory: FC<TopMoversProps> = ({changeHistory, price}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableHighlight
        underlayColor={'#FAFBFE'}
        onPress={() => {
          console.log(item.symbol);
        }}>
        <View style={styles.listItem}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.nameText}>{item[2] >= 0 ? `Received ${item[1]}` : `Converted from ${item[1]}`}</Text>
              <Text style={styles.tickerText}>{item[2] >= 0 ? `Using ${item[1]} Wallet` : `From ${item[1]} address`}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.priceText}>{`${item[2]} ${item[1]}`}</Text>
            <Text
              style={[
                {
                  color: Colors.positiveGreen,
                },
                styles.changeText,
              ]}>
              {item[2] > 0 ? '' : '-'}
              {`$${getLocaleCurrencyString(Math.abs(item[2] * price).toFixed(2))}`}
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
      <Text style={styles.watchlistText}>History</Text>
      <View style={[{height: changeHistory ? changeHistory.length * 75 : 0}, styles.watchlistContainer]}>
        <FlatList data={changeHistory} scrollEnabled={false} renderItem={renderItem} />
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

export default ChangeHistory;
