import React, {useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import {RouteProp} from '@react-navigation/core';
import moment from 'moment';

import {PortfolioStackParamList} from '../navigation/AppNavigator';
import {getLocaleCurrencyString} from '../utils';

type AssetsDetailPropertyNavigationProp = StackNavigationProp<PortfolioStackParamList, 'AssetsDetailProperty'>;
type AssetsDetailPropertyRouteProp = RouteProp<
  {params: {changeTime: number; changeSymbol: string; changeAmount: number; name: string; price: number}},
  'params'
>;

type Props = {
  navigation: AssetsDetailPropertyNavigationProp;
  route: AssetsDetailPropertyRouteProp;
};

const AssetsDetailProperty = ({navigation, route}: Props) => {
  const {changeTime, changeSymbol, changeAmount, name, price} = route.params;
  const ref = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.arrowBack}
          android_ripple={{color: 'grey', radius: 20, borderless: true}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={'#4F4C4F'} style={styles.menuIcon} />
        </Pressable>
        <View style={styles.headerPrice}>
          <Text style={styles.animatedTitleTotal}>
            <Text style={styles.titleTotal}> {changeAmount > 0 ? `Recieved ${name}` : `Sent ${name}`}</Text>
          </Text>
        </View>
        <Pressable style={[styles.arrowBack, {opacity: 0}]}>
          <Ionicons name="arrow-back" size={30} color={'#4F4C4F'} style={styles.menuIcon} />
        </Pressable>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amountBalance}>{`${changeAmount}${changeSymbol}`}</Text>
        <Text style={styles.amountUsd}>
          {changeAmount > 0 ? '' : '-'}
          {`$${getLocaleCurrencyString(Math.abs(changeAmount * price).toFixed(2))}`}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        onScroll={event => {}}
        showsVerticalScrollIndicator={false}
        ref={ref}
        nestedScrollEnabled={false}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLeftText}>Date</Text>
          <Text style={styles.itemRightText}>{moment(changeTime).format('h:mm A - MMM DD,YYYY')}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemLeftText}>Status</Text>
          <View style={styles.statusParent}>
            <View style={styles.statusMark}></View>
            <Text style={styles.itemRightText}>Completed</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.exploreView}>
        <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.8}>
          <Text style={styles.exploreContent}>View on block explorer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    marginTop: 8,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  arrowBack: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerPrice: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  animatedTitleTotal: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  menuIcon: {},
  bellIcon: {
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  titleTotal: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#171518',
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  amountContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    paddingVertical: 15,
  },
  amountBalance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  amountUsd: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#171518',
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    paddingVertical: 8,
    width: '100%',
  },
  itemRightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  itemLeftText: {
    fontSize: 16,
    color: 'black',
  },
  exploreView: {
    minHeight: 64,
    paddingHorizontal: '6%',
    paddingVertical: 8,
  },
  exploreBtn: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  exploreContent: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusParent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusMark: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginEnd: 4,
    backgroundColor: '#0E7649',
  },
});

export default AssetsDetailProperty;
