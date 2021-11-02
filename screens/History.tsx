import * as React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native';

import { Text } from '../components/Themed';
import { getAccountDataHistory } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Clipboard from 'expo-clipboard';

export default function History({ navigation }) {

  const dispatch = useDispatch();
  const reducer = useSelector(state => state.reducer);

  React.useEffect(() => {
    dispatch(getAccountDataHistory(reducer.user_account.account_id));
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(reducer.user_account.address);
    Alert.alert("Copiado", "La dirección fue copiada al portapapeles");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.subtitle}>{reducer.user_account.balance} BTC</Text>
            <Text style={styles.text}>({reducer.user_account.balance * reducer.ars_cotizations.sell} ARS)</Text>
          </View>
          <Image style={{ width: 50, height: 50 }} source={require('../assets/images/btc.png')} />
        </View>
        <TouchableOpacity activeOpacity={.5} onPress={copyToClipboard} >
          <>
            <Text style={styles.text}>Dirección:</Text>
            <Text style={styles.subtitle} >{reducer.user_account.address}</Text>
          </>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>Balance</Text>
        <View>
          <View style={styles.header}>
            <Text style={{flex: 1}}>ID</Text>
            <Text style={{flex: 1}}>Tipo</Text>
            <Text style={{flex: 3}}>Fecha y Hora</Text>
            <Text style={{flex: 1}}>Monto</Text>
          </View>
          { reducer.user_account_history.length > 0 && reducer.user_account_history.map((row, key) => {
            console.warn(row)
            return (
              <View key={key} style={styles.row}>
                <Text style={{flex: 1}}>{row.history_id}</Text>
                <Text style={{flex: 1}}>Envío</Text>
                <Text style={{flex: 3}}>{row.created_datetime}</Text>
                <Text style={{flex: 1}}>{row.amount}</Text>
              </View>
            )
          })}
        </View>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 20
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#841584'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#841584'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  header: {
    flexDirection: 'row',
    borderColor: 'white',
    borderBottomWidth: 1,
  }
});
