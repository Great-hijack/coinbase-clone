import React, {FC, useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import {LineChart, Grid} from 'react-native-svg-charts';
import {DateRange} from '../store/actions/history';
import {getMinMax, getLocaleCurrencyString} from '../utils';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

interface BalanceGraphProps {
  data: number[];
  range: string;
  onChangeRange: (range: string) => void;
}

const BalanceGraph: FC<BalanceGraphProps> = ({data, range, onChangeRange}) => {
  const [minMaxData, setMinMaxData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const minMaxInfo = getMinMax(data);
    let minVal = minMaxInfo[0];
    const minIndex = minMaxInfo[1];
    let maxVal = minMaxInfo[2];
    const maxIndex = minMaxInfo[3];
    const dataLength = minMaxInfo[4];
    let minValLeft = Number((((windowsWidth * 0.88) / dataLength) * minIndex).toFixed(0));
    let maxValLeft = Number((((windowsWidth * 0.88) / dataLength) * maxIndex).toFixed(0));

    if (!Number.isFinite(maxValLeft) || Number.isNaN(maxValLeft)) {
      maxValLeft = 0;
      maxVal = 0;
    }
    if (!Number.isFinite(minValLeft) || Number.isNaN(minValLeft)) {
      minValLeft = 0;
      minVal = 0;
    }

    setMinMaxData([minVal, minValLeft, maxVal, maxValLeft]);
  }, [data]);

  return (
    <View style={styles.container}>
      {!!data && (
        <View>
          <LineChart
            style={{height: 200}}
            data={data}
            svg={{stroke: 'rgb(50, 115, 244)', strokeWidth: 2}}
            contentInset={{top: 20, bottom: 20}}
          />
          <Text style={[styles.minValText, {left: minMaxData[1]}]}>
            {minMaxData[0] == 0 && minMaxData[2] == 0 ? '' : `$${minMaxData[0]}`}
          </Text>
          <Text style={[styles.maxValText, {left: minMaxData[3]}]}>
            {minMaxData[0] == 0 && minMaxData[2] == 0 ? '' : `$${minMaxData[2]}`}
          </Text>
        </View>
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
  minValText: {
    position: 'absolute',
    bottom: -5,
    transform: [{translateX: -20}],
  },
  maxValText: {
    position: 'absolute',
    top: -5,
    transform: [{translateX: -20}],
  },
});

export default BalanceGraph;
