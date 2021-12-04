import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import NewsListItem from './NewsListItem';
import News from '../models/News';
import Colors from '../constants/Colors';

interface NewsProps {
  newsData: News[];
  isHomeScreen: boolean;
  viewMoreHandler?: any;
}

const NewsList: FC<NewsProps> = ({newsData, isHomeScreen, viewMoreHandler}) => {
  return (
    <View style={styles.container}>
      {isHomeScreen && (
        <View style={styles.listHeader}>
          <Text style={styles.newsText}>News</Text>
          <TouchableOpacity onPress={viewMoreHandler}>
            <Text selectable style={styles.viewMoreButton}>
              View more
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        scrollEnabled={!isHomeScreen}
        showsVerticalScrollIndicator={false}
        data={isHomeScreen ? newsData.slice(0, 5) : newsData}
        keyExtractor={item => item.url}
        style={styles.flatStyle}
        renderItem={itemData => {
          return (
            <NewsListItem
              newsOutlet={itemData.item.newsOutlet}
              date={itemData.item.date}
              title={itemData.item.title}
              image={itemData.item.image}
              url={itemData.item.url}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  newsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewMoreButton: {
    color: Colors.cbBlue,
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatStyle: {
    marginHorizontal: 8,
  },
});

export default NewsList;
