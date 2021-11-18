import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import AssetsListItem from './AssetsListItem';
import Asset from '../models/Asset';

interface AssetsProps {
  assetsData: Asset[];
  isHomeScreen: boolean;
  sortHandler?: any;
}

const AssetsList: FC<AssetsProps> = ({assetsData, isHomeScreen, sortHandler}) => {
  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'flex-start',
      }}>
      {isHomeScreen && (
        <View style={styles.listHeader}>
          <Text style={styles.newsText}>Your assets</Text>
          <TouchableOpacity style={styles.sortButton} onPress={sortHandler}>
            <Text style={styles.sortButtonText}>Balance </Text>
            <Ionicons name="ios-chevron-down" size={20} style={styles.sortIcon} />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        scrollEnabled={!isHomeScreen}
        showsVerticalScrollIndicator={false}
        data={isHomeScreen ? assetsData.slice(0, 5) : assetsData}
        keyExtractor={item => item.id.toString()}
        style={{marginHorizontal: 8}}
        renderItem={itemData => {
          return (
            <AssetsListItem
              id={itemData.item.id}
              name={itemData.item.name}
              symbol={itemData.item.symbol}
              price={itemData.item.price}
              balance={itemData.item.balance}
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
