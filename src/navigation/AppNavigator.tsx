import React, {useEffect, useState, useRef, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useFonts} from '@use-expo/font';
import {Asset} from 'expo-asset';

import TabBar from '../components/TabBar';
import PortfolioScreen, {screenOptions as PortfolioOptions} from '../screens/Portfolio';
import NewsScreen, {screenOptions as NewsOptions} from '../screens/News';
import HomeScreen from '../screens/Home';
import PricesScreen from '../screens/Prices';
import SettingsScreen from '../screens/Settings';
import ActionsScreen from '../screens/Actions';
import AssetsDetail from '../screens/AssetsDetail';
import AssetsDetailHistory from '../screens/AssetsDetailHistory';
import AssetsDetailProperty from '../screens/AssetsDetailProperty';

import * as balanceHistoryActions from '../store/actions/balancehistory';
import * as userActions from '../store/actions/user';
import user, {UserState} from '../store/reducers/user';
import Loading from '../screens/Loading';
import Deny from '../screens/Deny';

export type PortfolioStackParamList = {
  PortfolioScreen: undefined;
  AssetsDetail: undefined;
  AssetsDetailHistory: undefined;
  AssetsDetailProperty: undefined;
  News: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  News: undefined;
};

const PortfolioStackNavigator = createNativeStackNavigator<PortfolioStackParamList>();
const HomeStackNavigator = createNativeStackNavigator<HomeStackParamList>();

const PortfolioNavigator = () => {
  return (
    <PortfolioStackNavigator.Navigator screenOptions={NewsOptions}>
      <PortfolioStackNavigator.Screen name="PortfolioScreen" component={PortfolioScreen} options={PortfolioOptions} />
      <PortfolioStackNavigator.Screen name="AssetsDetail" component={AssetsDetail} options={{headerShown: false}} />
      <PortfolioStackNavigator.Screen name="AssetsDetailHistory" component={AssetsDetailHistory} options={{headerShown: false}} />
      <PortfolioStackNavigator.Screen name="AssetsDetailProperty" component={AssetsDetailProperty} options={{headerShown: false}} />
      <PortfolioStackNavigator.Screen name="News" component={NewsScreen} />
    </PortfolioStackNavigator.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={NewsOptions}>
      <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
      <HomeStackNavigator.Screen name="News" component={NewsScreen} />
    </HomeStackNavigator.Navigator>
  );
};

const TabBarNavigator = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <TabBarNavigator.Navigator tabBar={props => <TabBar {...props} />}>
      <TabBarNavigator.Screen name="Home" component={HomeNavigator} />
      <TabBarNavigator.Screen name="Portfolio" component={PortfolioNavigator} />
      <TabBarNavigator.Screen name="Actions" component={ActionsScreen} />
      <TabBarNavigator.Screen name="Trade" component={PricesScreen} />
      <TabBarNavigator.Screen name="For You" component={SettingsScreen} />
    </TabBarNavigator.Navigator>
  );
};

const customFonts = {
  'CoinbaseDisplay-Medium': Asset.fromModule(require('../../assets/font/CoinbaseDisplay-Medium.otf')),
};

interface RootState {
  user: UserState;
}

const AppNavigator = () => {
  const [isLoaded] = useFonts(customFonts);
  const [isDeny, setDeny] = useState(false);
  const [isGetHistory, setHistory] = useState(false);
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const onBalanceData = async () => {
      const result = await dispatch(balanceHistoryActions.fetchBalanceHistoryData(userData?.profileId));
      return result;
    };

    if (userData?.profileId) {
      setHistory(false);
      onBalanceData()
        .then(res => {
          if (res['success'] === 0) {
            setDeny(true);
          } else {
            setHistory(true);
          }
        })
        .catch(err => {});
    } else {
      setDeny(true);
    }
  }, [userData?.profileId]);

  return (
    <>
      <NavigationContainer>{isLoaded && (isGetHistory ? <TabNavigator /> : <>{isDeny ? <Deny /> : <Loading />}</>)}</NavigationContainer>
    </>
  );
};

export default AppNavigator;
