import React, {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface AssetsDetailAboutProps {
  name: string;
}

const AssetsDetailAbout: FC<AssetsDetailAboutProps> = ({name}: AssetsDetailAboutProps) => {
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
        <Text style={styles.aboutContent}>
          Bitcoin is the world's first widely-adopted cryptocurrency. With Bitcoin, people can securely and directly send each other digital
          money on the internet.
        </Text>
        <Text style={styles.viewMore}>View more</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    alignSelf: 'flex-start',
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
