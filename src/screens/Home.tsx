import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, Text, Animated, Image, LogBox} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/AppNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {ScrollView} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

import CBButton from '../components/CBButton';
import MoverItem from '../components/MoverItem';
import {AssetsState} from '../store/reducers/assets';
import * as assetsActions from '../store/actions/assets';
import VisaImg from '../../assets/visa.png';
import {getLocaleCurrencyString} from '../utils';

interface RootState {
  assets: AssetsState;
}

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({navigation}: Props) => {
  const assetsData = useSelector((state: RootState) => state.assets.assetsData);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isShowTotal, setShowTotal] = useState(false);
  const refreshing = useRef(true);

  const loadData = useCallback(async () => {
    try {
      dispatch(assetsActions.fetchAssetsData());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    refreshing.current = true;
    loadData().then(() => {
      refreshing.current = false;
    });
  }, [loadData, refreshing]);

  const handleScroll = (event: any) => {
    const positionY = event.nativeEvent.contentOffset.y;
    if (positionY > 50) {
      setShowTotal(true);
    } else {
      setShowTotal(false);
    }
  };
  const totalAnimValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(totalAnimValue, {
      toValue: isShowTotal ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isShowTotal]);

  const total = getLocaleCurrencyString(
    assetsData.reduce((preVal, currentVal) => preVal + currentVal.price * currentVal.balance, 0).toFixed(2)
  );

  return (
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
          <View style={styles.headerGiftParent}>
            <Ionicons name="gift-outline" size={24} color="#0053FF" />
            <Text style={{color: '#0053FF', display: isShowTotal ? 'none' : 'flex'}}>Get $ 10</Text>
          </View>
          <View>
            <Ionicons name="ios-notifications-outline" size={25} color={'#4F4C4F'} style={styles.bellIcon} />
            <View style={styles.badgeWrapper}>
              <Text style={styles.badgeText}>4</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.progressBar}>{refreshing.current && <Progress.Circle size={30} indeterminate={true} color="gray" />}</View>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        ref={ref}
        onScroll={event => {
          handleScroll(event);
        }}
        nestedScrollEnabled={false}>
        <View style={styles.totalContainer}>
          <Text style={styles.headerText}>Your balance</Text>
          <Text style={styles.balanceText}>{`$${total}`}</Text>
        </View>

        <View style={styles.watchListContainer}>
          <Text style={styles.watchListTitle}>Watchlist</Text>
          <View style={styles.watchContentContainer}>
            <Text style={styles.watchContent}>Make the most out of Coinbase by watching some assets.</Text>
            <View
              style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', flex: 1, width: '112%'}}>
              <CBButton title="See all assets" outline />
            </View>
          </View>
        </View>

        <View style={styles.moverContainer}>
          <Text style={styles.moverTitle}>Top movers</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={false}>
            <MoverItem />
            <MoverItem />
            <MoverItem />
            <MoverItem />
            <MoverItem />
            <MoverItem />
            <MoverItem />
          </ScrollView>
        </View>

        <View style={styles.coinbaseContainer}>
          <Text style={styles.moverTitle}>Coinbase Card</Text>
          <View style={styles.coinbaseContentParent}>
            <View style={styles.coinImageParent}>
              <Image source={VisaImg} style={styles.coinImage} />
            </View>
            <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}></View>
            <View style={styles.journalParent}>
              <Text style={styles.journalTitle}>Join the waitlist</Text>
              <Text style={styles.journalContent}>Get rewards when you spend crypto or US dollars with our Visa debit card</Text>
            </View>
          </View>
        </View>

        <View style={styles.borrowContainer}>
          <Text style={styles.borrowTitle}>Borrow</Text>
        </View>
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
    marginTop: 30,
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
    top: -10,
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
    backgroundColor: '#F4F8FF',
    marginEnd: 10,
    padding: 4,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: '6%',
    marginTop: 30,
  },
  moverTitle: {
    fontWeight: 'bold',
    fontSize: 21,
  },

  coinbaseContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: '6%',
    marginTop: 40,
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
  coinImage: {
    width: 80,
    height: 120,
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
