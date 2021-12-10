import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, Text, Animated, Image, RefreshControl, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {HomeStackParamList} from '../navigation/AppNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

import CBButton from '../components/CBButton';
import {AssetsState} from '../store/reducers/assets';
import {BalanceHistoryState} from '../store/reducers/balancehistory';
import {TopMoversState} from '../store/reducers/topmovers';
import * as assetsActions from '../store/actions/assets';
import * as topmoversActions from '../store/actions/topmovers';
import {appImages} from '../utils/images';

import {getLocaleCurrencyString} from '../utils';
import TopMovers from '../components/TopMoversList';
import Splash from './Splash';
import OverlaySpinner from '../components/Loading';

interface RootState {
  assets: AssetsState;
  topMovers: TopMoversState;
  balanceHistory: BalanceHistoryState;
}

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({navigation}: Props) => {
  const balanceHistoryData = useSelector((state: RootState) => state.balanceHistory.balanceHistoryData);
  const assetsData = useSelector((state: RootState) => state.assets.assetsData);
  const topMoversData = useSelector((state: RootState) => state.topMovers.topMoversData);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isShowTotal, setShowTotal] = useState(false);
  const refreshing = useRef(true);
  const [scrollRefreshing, setscrollRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      dispatch(assetsActions.fetchAssetsData(balanceHistoryData));
      dispatch(topmoversActions.fetchTopMoversData());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    refreshing.current = true;
    loadData().then(res => {
      refreshing.current = false;
    });
  }, [loadData, refreshing]);

  const handleScroll = (event: any) => {
    const positionY = event.nativeEvent.contentOffset.y;
    setShowTotal(positionY > 50);
  };
  const totalAnimValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(totalAnimValue, {
      toValue: isShowTotal ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isShowTotal]);

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
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Ionicons name="ios-menu-outline" size={30} color={'#4F4C4F'} style={styles.menuIcon} />
          </View>
          <View style={styles.headerPriceParent}>
            <Animated.Text style={{opacity: totalAnimValue}}>
              <Text style={styles.titleTotal}>{`$${total}`}</Text>
            </Animated.Text>
          </View>

          <View style={styles.headerRightContainer}>
            <View style={[styles.headerGiftParent, {backgroundColor: isShowTotal ? '#00000000' : '#F4F8FF'}]}>
              <Ionicons name="gift-outline" size={24} color="#0053FF" />
              <Text style={[styles.getGiftCount, {display: isShowTotal ? 'none' : 'flex'}]}>Get $10</Text>
            </View>
            <View style={styles.notificationParent}>
              <Ionicons name="ios-notifications-outline" size={25} color={'#4F4C4F'} style={styles.bellIcon} />
              <View style={styles.badgeWrapper}>
                <Text style={styles.badgeText}>4</Text>
              </View>
            </View>
          </View>
        </View>
        <Spinner
          visible={refreshing.current}
          textContent={''}
          size={'large'}
          textStyle={styles.spinnerTextStyle}
          color={'#535864'}
          overlayColor={'transparent'}
          customIndicator={<OverlaySpinner />}
        />
        <Spinner
          visible={refreshing.current}
          textContent={''}
          size={'large'}
          textStyle={styles.spinnerTextStyle}
          color={'#535864'}
          overlayColor={'transparent'}
          customIndicator={<Splash />}
        />

        <ScrollView
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          ref={ref}
          onScroll={event => {
            handleScroll(event);
          }}
          refreshControl={<RefreshControl tintColor="rgb(233, 233, 243)" refreshing={scrollRefreshing} onRefresh={onScrollRefresh} />}>
          <View style={styles.totalContainer}>
            <Text style={styles.headerText}>Your balance</Text>
            <Text style={styles.balanceText}>{`$${total}`}</Text>
          </View>
          <View style={styles.watchListContainer}>
            <Text style={styles.watchListTitle}>Watchlist</Text>
            <View style={styles.watchContentContainer}>
              <Text style={styles.watchContent}>Make the most out of Coinbase by watching some assets.</Text>
              <View style={styles.assetBtnContainer}>
                <CBButton title="See all assets" outline isAnimated={false} />
              </View>
            </View>
          </View>

          <View style={styles.moverContainer}>
            <TopMovers coinData={topMoversData} />
          </View>

          <View style={styles.coinbaseContainer}>
            <Text style={styles.moverTitle}>Coinbase Card</Text>
            <View style={styles.coinbaseContentParent}>
              <View style={styles.coinImageParent}>
                <ImageBackground style={styles.backImgStyle} source={appImages.BackImg}>
                  <Image source={appImages.CardImg} style={styles.coinImage} />
                </ImageBackground>
              </View>
              <View style={styles.journalView}></View>
              <View style={styles.journalParent}>
                <Text style={styles.journalTitle}>Join the waitlist</Text>
                <Text style={styles.journalContent}>Get rewards when you spend crypto or US dollars with our Visa debit card</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#00000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    marginTop: 6,
    paddingBottom: 10,
    justifyContent: 'space-between',
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
  headerRightContainer: {
    flexDirection: 'row',
  },
  headerGiftParent: {
    marginEnd: 6,
    padding: 4,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  getGiftCount: {
    color: '#0053FF',
    fontWeight: 'bold',
  },
  notificationParent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  totalContainer: {
    width: '100%',
    paddingHorizontal: '6%',
    marginTop: 6,
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
  balanceText: {
    fontSize: 30,
    fontWeight: '700',
  },
  watchListContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: '6%',
    marginTop: 40,
  },
  watchListTitle: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  watchContentContainer: {
    minHeight: 100,
    marginTop: 20,
    borderRadius: 10,
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 25,
    flexDirection: 'column',
  },
  watchContent: {
    fontSize: 17,
    color: 'gray',
    marginTop: 5,
    marginBottom: 30,
  },
  moverContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: 30,
  },
  moverTitle: {
    fontWeight: 'bold',
    fontSize: 21,
  },

  assetBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '112%',
  },
  coinbaseContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: '6%',
    marginTop: 40,
    marginBottom: 20,
  },
  coinbaseContentParent: {
    marginTop: 20,
    borderRadius: 10,
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    paddingTop: 20,
    paddingBottom: 25,
    flexDirection: 'column',
  },
  coinImageParent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 25,
    paddingTop: 10,
  },
  backImgStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  coinImage: {
    width: 80,
    height: 120,
  },
  journalView: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
  },
  journalParent: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  journalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  journalContent: {
    fontSize: 17,
    color: 'gray',
    marginTop: 10,
  },

  borrowContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: '6%',
    marginTop: 40,
    marginBottom: 20,
  },
  borrowTitle: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  progressBar: {
    position: 'absolute',
    marginTop: 120,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default Home;
