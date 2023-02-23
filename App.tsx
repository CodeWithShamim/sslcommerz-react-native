import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import WebView from 'react-native-webview';
import Loading from './src/components/Loading';
import GetAllUrlParams from './src/utils/GetAllUrlParams';
import ConfettiCannon from 'react-native-confetti-cannon';

const App = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConfettiShow, setIsConfettiShow] = useState(false);
  const items = ['SSLCommerz', 'Bkash', 'Nagad'];

  const fetchPaymentURL = async () => {
    setLoading(true);
    const data = await axios.get('http://10.0.2.2:5000/api/v1/ssl/init');
    if (data?.data?.URL) {
      setUrl(data?.data?.URL);
    }
    setLoading(false);
  };

  const TrackURL = (data: any) => {
    const url = data?.url;
    const baseURL = 'http://10.0.2.2:5000/api/v1/ssl';

    interface paramsInterface {
      status?: string;
      tran_id?: string;
      total_amount?: string;
      method?: string;
    };

    if (url.includes('tran_id')) {
      setUrl('');
      const {status, tran_id, total_amount, method}:paramsInterface = GetAllUrlParams(url);

      if (status) {
        setIsConfettiShow(true);
        setTimeout(() => setIsConfettiShow(false), 8000);
        Alert.alert(
          'Congratulations!',
          `Your payment successfully completed.
        Transaction ID: ${tran_id}
        Total Amount: ${total_amount}
        Payment Method: ${method}
        `,
        );
      }
    }

    if (
      url === `${baseURL}/fail` ||
      url === `${baseURL}/cancel` ||
      url === `${baseURL}/ipn`
    ) {
      setUrl('');
    }
  };

  function onMessage(data: any) {
    Alert.alert(data);
    console.log('msg', data);
  }

  return (
    <View style={styles.container}>
      {loading && <Loading />}

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
          originWhitelist={['*']}
          onNavigationStateChange={TrackURL}
          source={{uri: url}}
          style={{width: '100%', height: '100%'}}
          startInLoadingState={true}
          onMessage={onMessage}
          sharedCookiesEnabled={true}
          renderLoading={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // alignItems: "center"
              }}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
        />
      )}

      {isConfettiShow && (
        <ConfettiCannon
          count={80}
          autoStartDelay={1}
          // fallSpeed={3000}
          // explosionSpeed={500}
          origin={{x: 0, y: 0}}
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
