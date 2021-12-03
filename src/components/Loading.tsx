import React from 'react';
import {View, Image} from 'react-native';
import {appImages} from '../utils/images';

const OverlaySpinner = () => {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 85,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <Image source={appImages.LoadingImg} />
    </View>
  );
};

export default OverlaySpinner;
