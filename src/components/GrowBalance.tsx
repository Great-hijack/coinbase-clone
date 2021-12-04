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
        <ProgressCircle style={styles.circleStyle} progress={0} strokeWidth={10}>
          <View style={styles.circleView}>
            <Text style={styles.percentText}>0%</Text>
          </View>
        </ProgressCircle>
      </View>

      <View style={[styles.itemContain, styles.borrowContain]}>
        <View style={styles.borrowView}>
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
    fontWeight: 'bold',
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
  borrowView: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 17,
    color: 'gray',
    marginTop: 5,
  },
  circleStyle: {
    height: 100,
    width: 100,
  },
  circleView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStarted: {
    fontSize: 20,
    color: Colors.cbBlue,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  percent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    textAlignVertical: 'bottom',
  },
  image: {
    height: 100,
    width: 100,
  },
});

export default GrowBalance;
