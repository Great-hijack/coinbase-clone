import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PortfolioStackParamList} from '../navigation/AppNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import {Animated} from 'react-native';
import {Pressable} from 'react-native';
import {RouteProp} from '@react-navigation/core';

import Colors from '../constants/Colors';
import BalanceGraph from '../components/BalanceGraph';
import {HistoryState} from '../store/reducers/history';

type AssetsDetailNavigationProp = StackNavigationProp<PortfolioStackParamList, 'AssetsDetail'>;
type AssetsDetailRouteProp = RouteProp<{params: {id: number}}, 'params'>;

type Props = {
  navigation: AssetsDetailNavigationProp;
  route: AssetsDetailRouteProp;
};

interface RootState {
  history: HistoryState;
}

const AssetsDetail = ({route, navigation}: Props) => {
  const {id} = route.params;

  const graphData = useSelector((state: RootState) => state.history.graphData);
  const ref = useRef(null);
  const [range, setRange] = useState('1H');
  const [isShowTotal, setShowTotal] = useState(false);
  const totalAnimValue = useRef(new Animated.Value(1)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={{marginLeft: 15}}
          android_ripple={{color: 'grey', radius: 20, borderless: true}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={'#4F4C4F'} style={styles.menuIcon} />
        </Pressable>
        <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
          <Animated.Text style={[{opacity: totalAnimValue}, styles.animatedTitleTotal]}>
            <Text style={styles.titleTotal}>test</Text>
          </Animated.Text>
        </View>
        <View>
          <Ionicons name="star" size={18} color={'#0349FF'} style={styles.bellIcon} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{alignItems: 'center'}} showsVerticalScrollIndicator={false} ref={ref} nestedScrollEnabled={false}>
        <View style={styles.totalContainer}>
          <Text style={styles.headerText}>Your balance</Text>
          <View style={{width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.balanceText}>$2222</Text>
            <View style={styles.titleStarView}>
              <Ionicons name="star" size={18} color={'#0349FF'} style={styles.titleStar} />
            </View>
          </View>
          <Text style={styles.titleChange}>-$222222(0.72%)</Text>
        </View>

        <BalanceGraph data={graphData} onChangeRange={setRange} color="#CC4D19" range={range} />
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
});

export default AssetsDetail;
