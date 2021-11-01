import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {signOut, getAccountDataByUser} from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Home({ navigation }: RootTabScreenProps<'TabOne'>) {

  const dispatch = useDispatch();
  const reducer = useSelector(state => state.reducer);

  React.useEffect(() => {
    dispatch(getAccountDataByUser(reducer.user.user_id));
  },[]);

  const _signOut = () => {
    dispatch(signOut());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola {reducer.user.username}!</Text>
      <Text style={styles.subtitle}>Tenés {reducer.user_account.balance } BTC</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
          onPress={_signOut}
          title="Cerrar Sesión"
          color="#841584"
      />
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
});
