import {StyleSheet, FlatList, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import WebView from 'react-native-webview';
import Loading from './src/components/Loading'

const App = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const items = ['SSLCommerz', 'Bkash', 'Nagad'];

  const fetchPaymentURL = async () => {
    setLoading(true);
    const data = await axios.get('http://10.0.2.2:5000/api/v1/ssl/init');
    if (data?.data?.URL) {
      setUrl(data?.data?.URL);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && <Loading/>}

      {!url ? (
        <FlatList
          data={items}
          renderItem={({item}) => (
            <TouchableOpacity onPress={fetchPaymentURL} style={styles.method}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.methodContainer}
        />
      ) : (
        <WebView
          onNavigationStateChange={event => {
            if (event.url === 'http://localhost:5000/success') {
              setUrl('');
            }
          }}
          source={{uri: url}}
          style={{width: '100%', height: '80%'}}
        />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  methodContainer: {
    marginTop: '75%',
  },
  method: {
    backgroundColor: '#000000',
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
});
