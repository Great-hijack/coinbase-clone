import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import * as Haptics from 'expo-haptics';
import {Ionicons, Fontisto, FontAwesome, MaterialCommunityIcons, Foundation, MaterialIcons, SimpleLineIcons} from '@expo/vector-icons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';

const TabBar = ({state, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const isActions = route.name == 'Actions';
        const itemColor = isFocused ? Colors.cbBlue : Colors.subtitle;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          if (isActions) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          }
        };

        let iconName;
        let iconType;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            iconType = 'Foundation';
            break;
          case 'Portfolio':
            iconName = 'pie-chart-1';
            iconType = 'Fontisto';
            break;
          case 'Trade':
            iconName = 'line-chart';
            iconType = 'FontAwesome';
            break;
          case 'For You':
            iconName = 'view-dashboard-outline';
            iconType = 'MaterialCommunityIcons';
            break;
          default:
            iconName = 'person';
            iconType = 'Ionicons';
        }

        const animatedValue = new Animated.Value(1);

        const handlePressIn = () => {
          Animated.spring(animatedValue, {
            toValue: 0.98,
            useNativeDriver: true,
          }).start();
        };

        const handlePressOut = () => {
          Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        };

        const animatedStyle = {
          transform: [{scale: animatedValue}],
        };

        return (
          <Animated.View style={[styles.tabBarItem, isActions ? {marginTop: 7} : {marginTop: 10}, animatedStyle]} key={route.name}>
            <TouchableOpacity onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
              {isActions ? (
                <View style={styles.actionsButton}>
                  <Ionicons name="swap-horizontal" size={20} color="white" />
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  {iconType == 'Fontisto' && <Fontisto name={iconName as any} size={19} color={itemColor} style={{marginBottom: 2}} />}
                  {iconType == 'FontAwesome' && (
                    <FontAwesome name={iconName as any} size={18} color={itemColor} style={{marginBottom: 2}} />
                  )}
                  {iconType == 'Ionicons' && <Ionicons name={iconName as any} size={20} color={itemColor} style={{marginBottom: 2}} />}
                  {iconType == 'MaterialCommunityIcons' && (
                    <MaterialCommunityIcons name={iconName as any} size={21} color={itemColor} style={{marginBottom: 2}} />
                  )}
                  {iconType == 'Foundation' && (
                    <Foundation name={iconName as any} size={24} color={itemColor} style={{marginBottom: 2, marginTop: -2}} />
                  )}
                  {iconType == 'MaterialIcons' && (
                    <MaterialIcons name={iconName as any} size={20} color={itemColor} style={{marginBottom: 2}} />
                  )}
                  {iconType == 'SimpleLineIcons' && (
                    <MaterialIcons name={iconName as any} size={20} color={itemColor} style={{marginBottom: 2}} />
                  )}
                  <Text
                    style={[
                      {color: itemColor},
                      styles.tabBarText,
                      route.name === 'Home'
                        ? {marginTop: -2}
                        : route.name === 'Trade'
                        ? {marginTop: 1}
                        : route.name === 'For You'
                        ? {marginTop: -1}
                        : {marginTop: 0},
                    ]}
                    selectable>
                    {route.name}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 85,
    borderColor: 'white',
    borderTopColor: Colors.border,
    borderWidth: 1,
    justifyContent: 'space-evenly',
  },
  tabBarItem: {
    width: 60,
  },
  tabBarText: {
    fontSize: 10,
    fontWeight: '700',
  },
  actionsButton: {
    width: 42,
    height: 42,
    backgroundColor: Colors.cbBlue,
    borderRadius: 21,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBar;
