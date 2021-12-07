import React from 'react';
import {StyleSheet, Dimensions, View, Text, SafeAreaView, Pressable, BackHandler} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

const {width: windowsWidth, height: windowsHeight} = Dimensions.get('window');

const Deny = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          style={[styles.closePress]}
          android_ripple={{color: 'grey', radius: 20, borderless: true}}
          onPress={() => {
            BackHandler.exitApp();
          }}>
          <AntDesign name="close" size={30} color="transparent" />
        </Pressable>
        <Pressable style={styles.closePress} android_ripple={{color: 'grey', radius: 20, borderless: true}}>
          <AntDesign name="close" size={30} color="#FFFFFF" />
        </Pressable>
      </View>

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
