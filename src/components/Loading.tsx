import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const OverlaySpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#545863" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 85,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default OverlaySpinner;
