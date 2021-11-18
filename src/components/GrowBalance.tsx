import React, {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import Colors from '../constants/Colors';

interface GrowBalanceProps {}

const GrowBalance: FC<GrowBalanceProps> = ({}) => {
  return (
    <View style={styles.contain}>
      <View style={styles.listHeader}>
        <Text style={styles.growText}>Grow your balance</Text>
      </View>
      <View style={[styles.itemContain, styles.learnContain]}>
        <View style={{flex: 1, marginRight: 10}}>
          <Text style={styles.title}>Learn and earn</Text>
          <Text style={styles.subTitle}>Learn how crypto works and earn up to $19 for free</Text>
          <View style={styles.bottom}>
            <Text style={styles.getStarted}>Get started</Text>
          </View>
        </View>
        <ProgressCircle style={{height: 100, width: 100}} progress={0} strokeWidth={10}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.percentText}>0%</Text>
          </View>
        </ProgressCircle>
      </View>
      <View style={[styles.itemContain, styles.earnedContain]}>
        <Text style={styles.title}>Interest earned</Text>
        <Text style={styles.subTitle}>Earn up to 4.00% APY on your crypto</Text>
        <View style={styles.bottom}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cash}>$1,016.499998</Text>
            <Text style={styles.percent}>2.00% APY</Text>
          </View>
        </View>
      </View>
      <View style={[styles.itemContain, styles.borrowContain]}>
        <View style={{flex: 1, marginRight: 10}}>
          <Text style={styles.title}>Borrow cash</Text>
          <Text style={styles.subTitle}>Borrow up to $100,000 using Bitcoin as collateral</Text>
          <View style={styles.bottom}>
            <Text style={styles.getStarted}>Get started</Text>
          </View>
        </View>
        <Image style={styles.image} source={{uri: 'https://i.imgur.com/9EEaSaS.png'}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 10,
    marginHorizontal: '6%',
  },
  growText: {
    fontWeight: '600',
    fontSize: 21,
    marginTop: 30,
  },
  itemContain: {
    minHeight: 150,
    marginHorizontal: '6%',
    marginTop: 20,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
  },
  learnContain: {
    flexDirection: 'row',
  },
  earnedContain: {},
  borrowContain: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  getStarted: {
    fontSize: 20,
    color: Colors.cbBlue,
    fontWeight: '600',
  },
  percentText: {
    fontSize: 16,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cash: {
    fontSize: 21,
    fontWeight: '600',
  },
  percent: {
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
    textAlignVertical: 'bottom',
  },
  image: {
    height: 100,
    width: 100,
  },
});

export default GrowBalance;
