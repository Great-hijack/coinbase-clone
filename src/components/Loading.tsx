import React from 'react';
import {View, Image} from 'react-native';
import LoadingImg from '../../assets/loading.gif';

const OverlaySpinner = () => {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000000',
      }}>
      <Image source={LoadingImg} />
    </View>
  );
};

export default OverlaySpinner;
