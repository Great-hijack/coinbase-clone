import React, {FC} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import AssetsListItem from './AssetsListItem';
import Asset from '../models/Asset';

interface AssetsProps {
  assetsData: Asset[];
  isHomeScreen: boolean;
  sortHandler?: any;
  navigation: any;
}

const AssetsList: FC<AssetsProps> = ({assetsData, isHomeScreen, sortHandler, navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={!isHomeScreen}
        showsVerticalScrollIndicator={false}
        data={isHomeScreen ? assetsData : assetsData}
        keyExtractor={item => item.id.toString()}
        style={styles.flatStyle}
        renderItem={itemData => {
          return (
            <AssetsListItem
              id={itemData.item.id}
              name={itemData.item.name}
              symbol={itemData.item.symbol}
              price={itemData.item.price}
              balance={itemData.item.balance}
              imgUrl={itemData.item.imgUrl}
              onItemClicked={() => {
                navigation.navigate('AssetsDetail', {
                  id: itemData.item.id,
                  symbol: itemData.item.symbol,
                  price: itemData.item.price,
                  name: itemData.item.name,
                  imgUrl: itemData.item.imgUrl,
                  balance: itemData.item.balance,
                  changeCount: itemData.item.changeCount.toFixed(2),
                  percentChange: itemData.item.percentChange.toFixed(2),
                });
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 10,
    marginHorizontal: '6%',
  },
  flatStyle: {
    marginHorizontal: 8,
    marginTop: 32,
  },
  newsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sortButton: {
    flexDirection: 'row',
  },
  sortButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sortIcon: {
    marginTop: 3,
  },
});

export default AssetsList;
