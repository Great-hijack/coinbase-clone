import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Pressable} from 'react-native';

import Colors from '../constants/Colors';
import {FlatList} from 'react-native-gesture-handler';
import {getLocaleCurrencyString} from '../utils';
import Balance from '../models/Balance';

type itemProps = {
  balance: string;
};

interface TopMoversProps {
  changeHistory: Balance[] | undefined;
  price: number;
  name: string;
  onItemClicked: (changeTime: number, changeSymbol: string, changeAmount: number) => void;
}

type Props = {
  changeHistory: Balance[] | undefined;
  price: number;

  navigation: any;
};

const ChangeHistory: FC<TopMoversProps> = ({changeHistory, price, name, onItemClicked}) => {
  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          onItemClicked(item['exchangeTime'], item['coinSymbol'], item['balance']);
        }}>
        <View style={styles.listItem}>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={styles.nameText}>{item['balance'] >= 0 ? `Received ${name}` : `Sent ${name}`}</Text>
              <Text style={[styles.tickerText, item['balance'] < 0 && {display: 'none'}]}>
                {item['balance'] >= 0 ? `From ${name} address` : ``}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.priceText}>{`${item['balance']} ${item['coinSymbol']}`}</Text>
            <Text
              style={[
                {
                  color: Colors.positiveGreen,
                },
                styles.changeText,
              ]}>
              {item['balance'] > 0 ? '' : '-'}
              {`$${getLocaleCurrencyString(Math.abs(item['balance'] * price).toFixed(2))}`}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.watchlistText}>History</Text>
      <View style={[{height: changeHistory ? changeHistory.length * 75 : 0}, styles.watchlistContainer]}>
        <FlatList
          data={changeHistory}
          scrollEnabled={false}
          renderItem={renderItem}
          keyExtractor={item => item['exchangeTime'].toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'flex-start',
    marginLeft: '6%',
  },
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
