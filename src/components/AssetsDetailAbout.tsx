import React, {FC, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Image, GestureResponderEvent} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

interface AssetsDetailAboutProps {
  name: string;
  symbol: string;
}

const AssetsDetailAbout: FC<AssetsDetailAboutProps> = ({name, symbol}: AssetsDetailAboutProps) => {
  const [aboutContent, setAboutContent] = useState('');
  const [isAbout, setIsAbout] = useState(false);
  useMemo(async () => {
    const coinResponse = await fetch(
      `https://www.coinbase.com/api/v2/assets/search?base=USD&country=US&filter=all&include_prices=false&limit=1&order=asc&query=${symbol}&resolution=day&sort=rank`
    ).then(res => res.json());
    const coinResponseData = coinResponse['data'][0]['description'];
    setAboutContent(coinResponseData);
    setIsAbout(true);
    return coinResponseData;
  }, [symbol]);

  const renderViewMores = (onPress: ((event: GestureResponderEvent) => void) | undefined) => {
    return (
      <Text style={styles.viewMore} onPress={onPress}>
        View More
      </Text>
    );
  };

  const renderViewLesss = (onPress: ((event: GestureResponderEvent) => void) | undefined) => {
    return (
      <Text style={styles.viewMore} onPress={onPress}>
        View Less
      </Text>
    );
  };

  return (
    <View style={styles.contain}>
      <View style={[styles.itemContain, styles.bestTimeContain]}>
        <Text style={styles.title}>When's the best time to buy?</Text>
        <View style={styles.timeContentView}>
          <Text style={styles.subTitle}>Timimg any investment is hard, which is why many investors use dollar cost averaging.</Text>
          <Image style={styles.image} source={{uri: 'https://i.imgur.com/9EEaSaS.png'}} />
        </View>
      </View>

      <View style={styles.about}>
        <Text style={styles.aboutName}>About {name}</Text>
        {isAbout && (
          <ViewMoreText numberOfLines={3} renderViewMore={renderViewMores} renderViewLess={renderViewLesss} textStyle={styles.aboutContent}>
            <Text>{aboutContent}</Text>
          </ViewMoreText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    alignSelf: 'flex-start',
    paddingBottom: 30,
  },

  itemContain: {
    minHeight: 130,
    marginHorizontal: '6%',
    marginTop: 20,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: 'column',
  },

  bestTimeContain: {},
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  timeContentView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
  subTitle: {
    fontSize: 17,
    color: 'gray',
    flex: 11,
  },
  image: {
    height: 40,
    width: 40,
    flex: 2,
  },
  about: {
    flexDirection: 'column',
    marginHorizontal: '6%',
    marginTop: 30,
  },
  aboutName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  aboutContent: {
    fontSize: 18,
  },
  viewMore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0148FF',
    marginTop: 8,
    marginBottom: 12,
  },
});

export default AssetsDetailAbout;
