import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const SSLPayment = (): any => {
  return (
    <View>
      <WebView
        source={{uri: 'https://www.youtube.com/'}}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
};

export default SSLPayment;

const styles = StyleSheet.create({});
