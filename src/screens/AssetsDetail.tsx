import React, {useRef, useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Pressable, RefreshControl} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PortfolioStackParamList} from '../navigation/AppNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {RouteProp} from '@react-navigation/core';
import Spinner from 'react-native-loading-spinner-overlay';

import Colors from '../constants/Colors';
import BalanceGraph from '../components/BalanceGraph';
import AssetsDetailButton from '../components/AssetsDetailButton';
import AssetsDetailAbout from '../components/AssetsDetailAbout';
import {CoinHistoryState} from '../store/reducers/coinhistory';
import * as coinHistoryActions from '../store/actions/coinhistory';
import {getLocaleCurrencyString} from '../utils/index';
import OverlaySpinner from '../components/Loading';

type AssetsDetailNavigationProp = StackNavigationProp<PortfolioStackParamList, 'AssetsDetail'>;
type AssetsDetailRouteProp = RouteProp<
  {
    params: {
      id: number;
      symbol: string;
      price: number;
      name: string;
      imgUrl: string;
      balance: number;
    };
  },
  'params'
>;

type Props = {
  navigation: any;
  route: AssetsDetailRouteProp;
};

interface RootState {
  coinhistory: CoinHistoryState;
}

const AssetsDetail = ({route, navigation}: Props) => {
  const {id, symbol, price, name, imgUrl, balance} = route.params;
  const graphData = useSelector((state: RootState) => state.coinhistory.coinGraphData);
  const ref = useRef(null);
  const [range, setRange] = useState('1H');
  const [isShowTotal, setShowTotal] = useState(false);
  const [coinPrices, setCoinPrices] = useState(['']);
  const totalAnimValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const refreshing = useRef(true);
  const [scrollRefreshing, setscrollRefreshing] = useState(false);

  const loadGraphData = useCallback(async () => {
    try {
      dispatch(coinHistoryActions.fetchGraphData({symbol, range}));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, range]);

  useEffect(() => {
    refreshing.current = true;
    loadGraphData().then(() => {
      refreshing.current = false;
    });
  }, [loadGraphData, refreshing]);

  useEffect(() => {
    Animated.timing(totalAnimValue, {
      toValue: isShowTotal ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isShowTotal]);

  type Props = {
    symbol: string;
  };

  const coinPrice = async ({symbol}: Props) => {
    const cryptoResponse = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${symbol}`
    );
    const cryptoResponseData = await cryptoResponse.json();
    setCoinPrices([
      Number(cryptoResponseData['RAW'][symbol]['USD'].PRICE).toFixed(2),
      Number(cryptoResponseData['RAW'][symbol]['USD'].CHANGE24HOUR).toFixed(2),
      Number(cryptoResponseData['RAW'][symbol]['USD'].CHANGEPCT24HOUR).toFixed(2),
    ]);
  };

  useEffect(() => {
    coinPrice({symbol});
  }, []);

  const onScrollRefresh = useCallback(() => {
    setscrollRefreshing(true);
    loadGraphData().then(() => {
      setscrollRefreshing(false);
    });
  }, [loadGraphData, scrollRefreshing]);

  const handleScroll = (event: any) => {
    const positionY = event.nativeEvent.contentOffset.y;

    setShowTotal(positionY > 50);
  };

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
          <Animated.Text style={[{opacity: totalAnimValue}, styles.animatedTitleTotal]}>
            <Text style={styles.titleTotal}>{`$${getLocaleCurrencyString(coinPrices[0])}`}</Text>
          </Animated.Text>
        </View>
        <View style={styles.headerRight}>
          <Animated.Text style={[{opacity: totalAnimValue}, styles.animatedTitleTotal]}>
            <AntDesign name="star" size={18} color={'#0349FF'} style={styles.bellIcon} />
          </Animated.Text>
        </View>
      </View>

      <Spinner
        visible={refreshing.current}
        textContent={''}
        size={'large'}
        textStyle={styles.spinnerTextStyle}
        color={'#535864'}
        overlayColor={'transparent'}
        customIndicator={OverlaySpinner()}
      />
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        onScroll={event => {
          handleScroll(event);
        }}
        showsVerticalScrollIndicator={false}
        ref={ref}
        nestedScrollEnabled={false}
        refreshControl={<RefreshControl tintColor="rgb(233, 233, 243)" refreshing={scrollRefreshing} onRefresh={onScrollRefresh} />}>
        <View style={styles.totalContainer}>
          <Text style={styles.headerText}>{name} price</Text>
          <View style={styles.topPriceContainer}>
            <Text style={styles.balanceText}>{`$${getLocaleCurrencyString(coinPrices[0] ? coinPrices[0] : '')}`}</Text>
            <View style={styles.titleStarView}>
              <AntDesign name="star" size={18} color={'#0349FF'} style={styles.titleStar} />
            </View>
          </View>
          <Text style={styles.titleChange}>
            {Number(coinPrices[1]) < 0 ? '-' : ''}
            {`$${coinPrices[1] ? Math.abs(Number(coinPrices[1])) : ''}(${coinPrices[2] ? coinPrices[2] : ''}%)`}
          </Text>
        </View>

        <BalanceGraph data={graphData} onChangeRange={setRange} color={symbol === 'BTC' ? '#CC4D19' : '#0349FF'} range={range} />
        <AssetsDetailButton
          id={id}
          title={name}
          imgUrl={imgUrl}
          outline
          price={price}
          balance={balance}
          symbol={symbol}
          onItemClicked={() => {
            navigation.navigate('AssetsDetailHistory', {
              id: id,
              symbol: symbol,
              price: price,
              name: name,
              imgUrl: imgUrl,
              balance: balance,
            });
          }}
        />
        <AssetsDetailAbout name={name} symbol={symbol} />
      </ScrollView>

      <View style={styles.tradeView}>
        <TouchableOpacity style={styles.tradeBtn} activeOpacity={0.8}>
          <Text style={styles.tradeContent}>Trade</Text>
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
  arrowBackRipple: {},
  headerPrice: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  headerRight: {
    marginEnd: 16,
    alignSelf: 'center',
    justifyContent: 'center',
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
  totalContainer: {
    width: '100%',
    paddingHorizontal: '6%',
    marginTop: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  topPriceContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: 21,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 24,
    color: Colors.subtitle,
  },
  menuIcon: {},
  bellIcon: {
    alignSelf: 'flex-end',
    marginRight: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 30,
    fontWeight: '700',
  },
  titleStarView: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: '#E9E6E9',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  titleStar: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  titleChange: {
    color: '#8C1E2B',
  },
  tradeView: {
    minHeight: 64,
    paddingHorizontal: '6%',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#EAE7EA',
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
  progressBar: {
    position: 'absolute',
    marginTop: 120,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#00000000',
  },
});

export default AssetsDetail;
