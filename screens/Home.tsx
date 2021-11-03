import * as React from 'react';
import { StyleSheet, ScrollView, RefreshControl, View } from 'react-native';

import {  getAccountDataByUser, getCotizations } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import AssetCard from '../components/AssetCard';
import Text from '../components/Text';

export default function Home({ navigation }) {

  const dispatch = useDispatch();
  const reducer = useSelector(state => state.reducer);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    dispatch(getCotizations());
  }, []);

  React.useEffect(() => {
    dispatch(getCotizations());
    dispatch(getAccountDataByUser(reducer.user.user_id));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Hola {reducer.user.username}!</Text>
        <Text style={styles.text}>Bienvenido a Ripio Test. Conocé el balance de tu cuenta, tus movimientos y hacé transferencias a otras direcciones.</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Text style={styles.title}>Balance</Text>
        <AssetCard />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  scrollView: {
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
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#841584'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
