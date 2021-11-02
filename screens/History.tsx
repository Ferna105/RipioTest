import * as React from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native';

import AssetCard from '../components/AssetCard';
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

  const showDetails = (row) => {
    if (row.from_address == reducer.user_account.address) {
      Alert.alert('Detalle', `Envío de ${row.amount} BTC a:\n\n${row.to_address}\n\nEstado: ${row.status}`);
    }
  }

  return (
    <View style={styles.container}>
      <AssetCard />
      <View>
        <Text style={styles.title}>Balance</Text>
        <View>
          <View style={styles.header}>
            <Text style={[styles.text,{flex: 1}]}>ID</Text>
            <Text style={[styles.text,{flex: 2}]}>Tipo</Text>
            <Text style={[styles.text,{flex: 2}]}>Fecha y Hora</Text>
            <Text style={[styles.text,{flex: 1}]}>Monto</Text>
          </View>
          { reducer.user_account_history.length > 0 && reducer.user_account_history.map((row, key) => {
            return (
              <TouchableOpacity onPress={() => showDetails(row)} key={key} style={styles.row}>
                <Text style={[styles.text,{flex: 1}]}>{row.history_id}</Text>
                <Text style={[styles.text,{flex: 2}]}>{row.from_address == reducer.user_account.address ? "Envío" : "Recepción"}</Text>
                <Text style={[styles.text,{flex: 2}]}>{row.created_datetime}</Text>
                <Text style={[styles.text,{flex: 1}]}>{row.amount}</Text>
              </TouchableOpacity>
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
    color: 'white'
  },
  title: {
    fontSize: 20,
    color: 'white',
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
