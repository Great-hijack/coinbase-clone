import React, {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LineChart, Grid} from 'react-native-svg-charts';
import {DateRange} from '../store/actions/history';

interface BalanceGraphProps {
  data: number[];
  range: string;
  onChangeRange: (range: string) => void;
}

const BalanceGraph: FC<BalanceGraphProps> = ({data, range, onChangeRange}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Total balance</Text>
      <Text style={styles.balanceText}>$188,535.45</Text>
      {!!data && (
        <LineChart
          style={{height: 200}}
          data={data}
          svg={{stroke: 'rgb(50, 115, 244)', strokeWidth: 2}}
          contentInset={{top: 20, bottom: 20}}
        />
      )}
      <View style={styles.rangeSelector}>
        {Object.keys(DateRange).map(value => (
          <TouchableOpacity key={value} onPress={() => onChangeRange(value)}>
            <Text style={[styles.rangeText, range === value && styles.selected]}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '6%',
    marginTop: 25,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  balanceText: {
    fontSize: 28,
    fontWeight: '700',
  },
  rangeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rangeText: {
    fontSize: 16,
    color: 'black',
  },
  selected: {
    color: '#1140EE',
  },
});

export default BalanceGraph;
