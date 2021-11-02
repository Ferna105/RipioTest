import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useSelector } from 'react-redux';

export default AssetCard = () => {
    const reducer = useSelector(state => state.reducer);

    const copyToClipboard = () => {
        Clipboard.setString(reducer.user_account.address);
        Alert.alert("Copiado", "La dirección fue copiada al portapapeles");
    };

    return (
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
    )
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
  