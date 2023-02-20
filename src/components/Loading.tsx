import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';

type LoadingType = {
  show?: boolean;
  text?: string;
};

function Loading({show, text}: LoadingType) {
  return (
    <Modal
      visible={show}
      transparent
      statusBarTranslucent
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={50} color={'#fff'} />
      </View>
    </Modal>
  );
}

export default Loading;
