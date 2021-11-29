import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import {SvgUri} from 'react-native-svg';
import {RouteProp} from '@react-navigation/core';
import {PortfolioStackParamList} from '../navigation/AppNavigator';
import CBButton from '../components/CBButton';
import {balanceHistory} from '../data/BalanceHistory';
import ChangeHistory from '../components/ChangeHistory';
import {getLocaleCurrencyString} from '../utils';
import {Balance} from '../store/actions/history';

type AssetsDetailHistoryNavigationProp = StackNavigationProp<PortfolioStackParamList, 'AssetsDetailHistory'>;
type AssetsDetailHistoryRouteProp = RouteProp<
  {params: {id: number; symbol: string; price: number; name: string; imgUrl: string; balance: number}},
  'params'
>;

type Props = {
  navigation: AssetsDetailHistoryNavigationProp;
  route: AssetsDetailHistoryRouteProp;
};

const AssetsDetailHistory = ({route, navigation}: Props) => {
  const {id, symbol, price, name, imgUrl, balance} = route.params;
  const balanceAsUSD = price * balance;
  const totalAnimValue = useRef(new Animated.Value(1)).current;
  const [isShowTotal, setShowTotal] = useState(false);
  const [balances, setBalances] = useState<Balance[]>();
  const ref = useRef(null);

  useEffect(() => {
    Animated.timing(totalAnimValue, {
      toValue: isShowTotal ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isShowTotal]);

  useEffect(() => {
    const filteredBalance = balanceHistory.filter(item => item[1] === symbol);
    setBalances(filteredBalance);
  }, []);

  const handleScroll = (event: any) => {
    const positionY = event.nativeEvent.contentOffset.y;

    if (positionY > 50) {
      setShowTotal(true);
    } else {
      setShowTotal(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={{marginLeft: 16, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}
          android_ripple={{color: 'grey', radius: 20, borderless: true}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={'#4F4C4F'} style={styles.menuIcon} />
        </Pressable>
        <View
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: -40,
            top: '50%',
            marginTop: -14,
            flexDirection: 'row',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Animated.Text style={[{opacity: totalAnimValue}, styles.animatedTitleTotal]}>
            <Text style={styles.titleTotal}>{`$${getLocaleCurrencyString(balanceAsUSD.toFixed(2))}`}</Text>
          </Animated.Text>
        </View>
        <View style={{marginEnd: 16, alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <Animated.View style={[{opacity: totalAnimValue}, styles.animatedTitleTotal]}>
            <View style={styles.topPriceRight}>
              <View style={styles.circleBorder}>
                <MaterialCommunityIcons name="view-dashboard-outline" size={18} color="black" />
              </View>
              <View style={{marginHorizontal: 4}}></View>
              <View style={styles.circleBorder}>
                <Ionicons name="md-send" size={18} color="black" />
              </View>
            </View>
          </Animated.View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        onScroll={event => {
          handleScroll(event);
        }}
        showsVerticalScrollIndicator={false}
        ref={ref}
        nestedScrollEnabled={false}>
        <View style={styles.topPriceContainer}>
          <View style={styles.topPriceLeft}>
            <Text style={styles.topBalanceText}>{`${balance} ${symbol}`}</Text>
            <Text style={styles.topUsdText}>{`$${getLocaleCurrencyString(balanceAsUSD.toFixed(2))}`}</Text>
          </View>
          <View style={styles.topPriceRight}>
            <View style={styles.circleBorder}>
              <MaterialCommunityIcons name="view-dashboard-outline" size={18} color="black" />
            </View>
            <View style={{marginHorizontal: 4}}></View>
            <View style={styles.circleBorder}>
              <Ionicons name="md-send" size={18} color="black" />
            </View>
          </View>
        </View>

        <View style={styles.tradeView}>
          <TouchableOpacity style={styles.tradeBtn} activeOpacity={0.8}>
            <Text style={styles.tradeContent}>Trade</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recurringCointainer}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Recurring buys</Text>
          <View style={styles.recurringDescriptionContainer}>
            <SvgUri
              style={{
                flex: 1,
                width: 24,
                height: 24,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginStart: -8,
              }}
              uri="https://images.ctfassets.net/q5ulk4bp65r7/1B2lWSiOAFK6CitniZDOm6/a38890c20ba91c7d730fde6eb1d9bb3e/prime-icon.svg"
            />
            <View style={styles.recurringDetailContainer}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>Learn more about recurring buys</Text>
              <Text>Invest daily, weekly, or monthly</Text>
            </View>
          </View>
        </View>

        <CBButton title="Add New" outline />
        <ChangeHistory changeHistory={balances} price={price} />
      </ScrollView>
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
  animatedTitleTotal: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  titleTotal: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#171518',
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  topPriceContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
  },
  topPriceLeft: {
    flexDirection: 'column',
  },
  topBalanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  topUsdText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#171518',
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  menuIcon: {},
  bellIcon: {
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  topPriceRight: {
    flexDirection: 'row',
  },
  circleBorder: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: '#E9E6E9',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },

  tradeView: {
    width: '100%',
    paddingHorizontal: '6%',
    minHeight: 64,
    paddingVertical: 8,
    marginTop: 8,
  },
  tradeBtn: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0148FF',
  },
  tradeContent: {
    color: 'white',
  },
  recurringCointainer: {
    marginTop: 8,
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '6%',
    width: '100%',
    marginBottom: 20,
  },
  recurringDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  recurringDetailContainer: {
    flex: 8,
    flexDirection: 'column',
    marginStart: 8,
  },
});

export default AssetsDetailHistory;
