import * as React from 'react';
import { StyleSheet, Button, Image, TextInput, Alert} from 'react-native';

import { Text, View } from '../components/Themed';
import { getAccountDataHistory, transfer } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Transfer({ navigation }) {

    const dispatch = useDispatch();
    const reducer = useSelector(state => state.reducer);
    const [amount,setAmount] = React.useState('1');
    const [address,setAddress] = React.useState('GAHLKSJDALLJGAAAKSDJJAANNSJ3FJ1LXJ');

    const isValidTransfer = () => {
        return amount && address;
    }

    const _transfer = () => {
        if(isValidTransfer()) {
            dispatch(transfer(reducer.user_account.address,address,amount))
        } else {
            Alert.alert('Error', 'El monto y dirección son obligatorios.')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transferir BTC</Text>
            <View style={styles.inputWrapper}>
                <TextInput style={styles.input} placeholder="Monto" value={amount} onChangeText={setAmount} />
            </View>
            <View style={styles.inputWrapper}>
                <TextInput style={styles.input} placeholder="Dirección de destino" value={address} onChangeText={setAddress} />
            </View>
            <View style={styles.inputWrapper}>
                <Button
                    onPress={_transfer}
                    title="Enviar"
                    color="#841584"
                />
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
    },
    inputWrapper: {
        margin: 10,
        width: "80%"
    },
    input: {
        width: "100%",
        padding: 10,
        backgroundColor: 'white'
    }, 
});
