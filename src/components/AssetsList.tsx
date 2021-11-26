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
    <View
      style={{
        width: '100%',
        alignSelf: 'flex-start',
      }}>
      <FlatList
        scrollEnabled={!isHomeScreen}
        showsVerticalScrollIndicator={false}
        data={isHomeScreen ? assetsData : assetsData}
        keyExtractor={item => item.id.toString()}
        style={{marginHorizontal: 8, marginTop: 32}}
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
                navigation.navigate('AssetsDetail');
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 10,
    marginHorizontal: '6%',
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
