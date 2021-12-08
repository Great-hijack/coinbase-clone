import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';

const Deny = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={styles.animText}>User not exist.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#0149FF',
  },
  header: {
    flexDirection: 'row',
    marginTop: 6,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  closePress: {
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  animText: {
    flex: 1,
    color: '#FFF',
    fontSize: 30,
    fontFamily: 'CoinbaseDisplay-Medium',
    textAlignVertical: 'center',
  },
});

export default Deny;
