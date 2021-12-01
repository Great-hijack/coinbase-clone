import React, {FC} from 'react';
import {View, StyleSheet, FlatList, Text, Image} from 'react-native';
import DemoImg from '../../assets/icon.png';

interface Props {}

const MoverItem: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Image source={DemoImg} style={{height: 40, width: 40}} />
      <View style={styles.priceParent}>
        <Text style={styles.priceMark}>VGX</Text>
        <Text style={styles.priceContent}>$0.05</Text>
      </View>
      <Text style={styles.percentText}>+22.22%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    marginTop: 20,
    borderRadius: 16,
    width: 180,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 25,
    flexDirection: 'column',
    marginEnd: 12,
  },
  priceParent: {
    flexDirection: 'row',
    marginTop: 20,
  },
  priceMark: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  priceContent: {
    fontSize: 16,
    marginStart: 8,
    color: 'gray',
  },
  percentText: {
    color: '#8DE2BE',
    fontSize: 24,
  },
});

export default MoverItem;
