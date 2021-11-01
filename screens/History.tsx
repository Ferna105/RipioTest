import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import {getAccountDataHistory} from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function History({ navigation }) {

  const dispatch = useDispatch();
  const reducer = useSelector(state => state.reducer);

  React.useEffect(() => {
    dispatch(getAccountDataHistory(reducer.user_account.account_id));
  },[]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola {reducer.user.username}!</Text>
      <Text style={styles.subtitle}>Tenés {reducer.user_account.balance } BTC</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        {reducer.user_account_history.map((row) => {
          return (
            <View style={styles.row}>
              <Text>{row.amount}</Text>
            </View>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'space-between'
  }
});
