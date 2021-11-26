import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import TabBar from '../components/TabBar';
import PortfolioScreen, {screenOptions as PortfolioOptions} from '../screens/Portfolio';
import NewsScreen, {screenOptions as NewsOptions} from '../screens/News';
import HomeScreen from '../screens/Home';
import PricesScreen from '../screens/Prices';
import SettingsScreen from '../screens/Settings';
import ActionsScreen from '../screens/Actions';
import AssetsDetail from '../screens/AssetsDetail';

export type PortfolioStackParamList = {
  PortfolioScreen: undefined;
  AssetsDetail: undefined;
  News: undefined;
};

const PortfolioStackNavigator = createNativeStackNavigator<PortfolioStackParamList>();

const PortfolioNavigator = () => {
  return (
    <PortfolioStackNavigator.Navigator screenOptions={NewsOptions}>
      <PortfolioStackNavigator.Screen name="PortfolioScreen" component={PortfolioScreen} options={PortfolioOptions} />
      <PortfolioStackNavigator.Screen name="AssetsDetail" component={AssetsDetail} options={{headerShown: false}} />
      <PortfolioStackNavigator.Screen name="News" component={NewsScreen} />
    </PortfolioStackNavigator.Navigator>
  );
};

const TabBarNavigator = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <TabBarNavigator.Navigator tabBar={props => <TabBar {...props} />}>
      <TabBarNavigator.Screen name="Home" component={HomeScreen} />
      <TabBarNavigator.Screen name="Portfolio" component={PortfolioNavigator} />
      <TabBarNavigator.Screen name="Actions" component={ActionsScreen} />
      <TabBarNavigator.Screen name="Trade" component={PricesScreen} />
      <TabBarNavigator.Screen name="For You" component={SettingsScreen} />
    </TabBarNavigator.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
