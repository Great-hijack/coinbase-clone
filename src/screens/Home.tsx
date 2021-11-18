import {StatusBar} from 'expo-status-bar';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  Image,
  LogBox,
  Dimensions
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useScrollToTop} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import {RootStackParamList} from '../navigation/AppNavigator';

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
import {DateRange} from '../store/actions/history';
import {HistoryState} from '../store/reducers/history';

const {width, height} = Dimensions.get('window');

interface RootState {
  watchlist: WatchlistState;
  topMovers: TopMoversState;
  news: NewsState;
  assets: AssetsState;
  history: HistoryState;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({navigation}: Props) => {
  const watchlistData = useSelector((state: RootState) => state.watchlist.watchlistData);
  const assetsData = useSelector((state: RootState) => state.assets.assetsData);
  const graphData = useSelector((state: RootState) => state.history.graphData);

  const [refreshing, setRefreshing] = useState(false);
  const [range, setRange] = useState('1H');
  const [isShowTotal, setShowTotal] = useState(false);

  const dispatch = useDispatch();
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
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadGraphData();
  }, [loadGraphData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData().then(() => {
      setRefreshing(false);
    });
  }, [loadData, refreshing]);

  const sortHandler = () => {};

  const ref = useRef(null);
  useScrollToTop(ref);
  const handleScroll = (event : any) => {
    const positionY = event.nativeEvent.contentOffset.y;
    if (positionY > 220){
        setShowTotal(true);
    }else {
        setShowTotal(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1}}>
          <Ionicons name="ios-menu-outline" size={30} color={'#0009'} style={styles.menuIcon} />
        </View>
        <View style={{flexDirection:"row" , justifyContent:"center"}} >

          <Text style={styles.titleTotal} >
            {isShowTotal ? "$188,535.45" : ""}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Ionicons name="ios-notifications-outline" size={25} color={'#0009'} style={styles.bellIcon} />
          <View style={styles.badgeWrapper} >
            <Text style={styles.badgeText} >4</Text>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        ref={ref}
        onScroll={(event) => {handleScroll(event)}}
        refreshControl={<RefreshControl tintColor="rgb(233, 233, 243)" refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.promotion}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16, color: '#0009'}}>Earn up to 5% APR</Text>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Learn how to earn rewards on Coinbase</Text>
          </View>
          <Image style={styles.image} source={{uri: 'https://i.imgur.com/9EEaSaS.png'}} />
          <Ionicons name="ios-close-circle" size={30} color={'#0003'} style={styles.closeIcon} />
        </View>
        <BalanceGraph data={graphData} onChangeRange={setRange} range={range} />
        <AssetsList assetsData={assetsData} isHomeScreen={true} sortHandler={sortHandler} />
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
  menuIcon: {
    marginLeft: 15,
  },
  titleTotal : {
    fontWeight: 'bold',
    fontSize:18,
    color:'gray',
    alignContent:'center',
    textAlignVertical:'center',
  },
  bellIcon: {
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  badgeWrapper : {
    flex:1,
    position: 'absolute',
    right: 5,
    top: -10,
    backgroundColor: '#FF0000',
    height: 18,
    width: 18,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    alignContent:'center',
    textAlignVertical:'center',
    fontSize: 14,
    color: 'white'
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
  title: {
    fontWeight: '600',
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
});

export default Home;
