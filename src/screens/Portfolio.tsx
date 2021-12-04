import {StatusBar} from 'expo-status-bar';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView, LogBox, Animated, RefreshControl} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useScrollToTop} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import {PortfolioStackParamList} from '../navigation/AppNavigator';
import * as watchlistActions from '../store/actions/watchlist';
import * as assetsActions from '../store/actions/assets';
import * as historyActions from '../store/actions/history';
import {WatchlistState} from '../store/reducers/watchlist';
import {TopMoversState} from '../store/reducers/topmovers';
import {NewsState} from '../store/reducers/news';
import {AssetsState} from '../store/reducers/assets';

import CBButton from '../components/CBButton';
import Watchlist from '../components/Watchlist';
import AssetsList from '../components/AssetsList';
import GrowBalance from '../components/GrowBalance';
import BalanceGraph from '../components/BalanceGraph';
import Colors from '../constants/Colors';
import {balanceHistory} from '../data/BalanceHistory';
import {HistoryState} from '../store/reducers/history';
import {getLocaleCurrencyString} from '../utils';
import OverlaySpinner from '../components/Loading';

interface RootState {
  watchlist: WatchlistState;
  topMovers: TopMoversState;
  news: NewsState;
  assets: AssetsState;
  history: HistoryState;
}

type PortfolioScreenNavigationProp = StackNavigationProp<PortfolioStackParamList, 'PortfolioScreen'>;

type Props = {
  navigation: PortfolioScreenNavigationProp;
};

const Portfolio = ({navigation}: Props) => {
  const watchlistData = useSelector((state: RootState) => state.watchlist.watchlistData);
  const assetsData = useSelector((state: RootState) => state.assets.assetsData);
  const graphData = useSelector((state: RootState) => state.history.graphData);

  const refreshing = useRef(true);
  const graphRefreshing = useRef(true);
  const [range, setRange] = useState('1H');
  const [isShowTotal, setShowTotal] = useState(false);
  const totalAnimValue = useRef(new Animated.Value(1)).current;
  const [scrollRefreshing, setscrollRefreshing] = useState(false);

  const ref = useRef(null);
  useScrollToTop(ref);
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.timing(totalAnimValue, {
      toValue: isShowTotal ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isShowTotal]);

  const loadData = useCallback(async () => {
    try {
      dispatch(watchlistActions.fetchCoinData());
      dispatch(assetsActions.fetchAssetsData());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  const loadGraphData = useCallback(async () => {
    try {
      dispatch(historyActions.fetchGraphData({balanceHistory, range}));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, range]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    refreshing.current = true;
    loadData().then(() => {
      refreshing.current = false;
    });
  }, [loadData, refreshing]);

  useEffect(() => {
    graphRefreshing.current = true;
    loadGraphData().then(() => {
      graphRefreshing.current = false;
    });
  }, [loadGraphData, graphRefreshing]);

  const sortHandler = () => {};

  const handleScroll = (event: any) => {
    const positionY = event.nativeEvent.contentOffset.y;

    setShowTotal(positionY > 50);
  };

  const onScrollRefresh = useCallback(() => {
    setscrollRefreshing(true);
    loadData().then(() => {
      setscrollRefreshing(false);
    });
  }, [loadData, scrollRefreshing]);

  const total = getLocaleCurrencyString(
    assetsData.reduce((preVal, currentVal) => preVal + currentVal.price * currentVal.balance, 0).toFixed(2)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1}}>
          <Ionicons name="ios-menu-outline" size={30} color={'#4F4C4F'} style={styles.menuIcon} />
        </View>
        <View style={styles.headerPriceParent}>
          <Animated.Text style={{opacity: totalAnimValue}}>
            <Text style={styles.titleTotal}>{`$${total}`}</Text>
          </Animated.Text>
        </View>

        <View>
          <View style={styles.notificationParent}>
            <Ionicons name="ios-notifications-outline" size={25} color={'#4F4C4F'} style={styles.bellIcon} />
            <View style={styles.badgeWrapper}>
              <Text style={styles.badgeText}>4</Text>
            </View>
          </View>
        </View>
      </View>
      <Spinner
        visible={refreshing.current || graphRefreshing.current}
        textContent={''}
        size={'large'}
        textStyle={styles.spinnerTextStyle}
        color={'#535864'}
        overlayColor={'transparent'}
        customIndicator={<OverlaySpinner />}
      />

      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        ref={ref}
        onScroll={event => {
          handleScroll(event);
        }}
        nestedScrollEnabled={false}
        refreshControl={<RefreshControl tintColor="rgb(233, 233, 243)" refreshing={scrollRefreshing} onRefresh={onScrollRefresh} />}>
        <View style={styles.totalContainer}>
          <Text style={styles.headerText}>Your balance</Text>
          <Text style={styles.balanceText}>${total} </Text>
        </View>

        <BalanceGraph data={graphData} onChangeRange={setRange} color="#0349FF" range={range} />
        <AssetsList assetsData={assetsData} isHomeScreen={true} sortHandler={sortHandler} navigation={navigation} />
        <CBButton title="See all" outline />
        <GrowBalance />
        <Watchlist coinData={watchlistData} />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    marginTop: 30,
    paddingBottom: 10,
  },
  headerPriceParent: {
    position: 'absolute',
    left: '50%',
    marginLeft: -40,
    top: '50%',
    marginTop: -14,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  menuIcon: {
    marginLeft: 15,
  },
  titleTotal: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4F4C4F',
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  bellIcon: {
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  notificationParent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  badgeWrapper: {
    flex: 1,
    position: 'absolute',
    right: 5,
    top: -8,
    backgroundColor: '#FF0000',
    height: 18,
    width: 18,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    color: 'white',
  },
  promotion: {
    flexDirection: 'row',
    marginHorizontal: '6%',
    marginTop: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  image: {
    height: 80,
    width: 100,
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
  sectionHeader: {
    fontSize: 20,
  },
  balanceText: {
    fontSize: 30,
    fontWeight: '700',
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

export default Portfolio;
