import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/AppNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {ScrollView} from 'react-native-gesture-handler';

import CBButton from '../components/CBButton';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({navigation}: Props) => {
  const ref = useRef(null);
  const [isShowTotal, setShowTotal] = useState(false);

  const handleScroll = (event: any) => {
    const positionY = event.nativeEvent.contentOffset.y;
    if (positionY > 50) {
      setShowTotal(true);
    } else {
      setShowTotal(false);
    }
  };
  const totalAnimValue = useRef(new Animated.Value(1)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Ionicons name="ios-menu-outline" size={30} color={'#4F4C4F'} style={styles.menuIcon} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Animated.Text style={{opacity: totalAnimValue}}>
            <Text style={styles.titleTotal}>{`$2222`}</Text>
          </Animated.Text>
        </View>

        <View style={styles.headerRightContainer}>
          <View style={styles.headerGiftParent}>
            <Ionicons name="gift-outline" size={24} color="#0053FF" />
            <Text style={{color: '#0053FF'}}>Get $ 10</Text>
          </View>
          <View>
            <Ionicons name="ios-notifications-outline" size={25} color={'#4F4C4F'} style={styles.bellIcon} />
            <View style={styles.badgeWrapper}>
              <Text style={styles.badgeText}>4</Text>
            </View>
          </View>
        </View>
      </View>

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
          <Text style={styles.balanceText}>$3333 </Text>
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
    marginTop: 30,
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
});

export default Home;
