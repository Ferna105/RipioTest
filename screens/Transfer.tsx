import * as React from 'react';
import { StyleSheet, Button, Text, View, TextInput, Alert} from 'react-native';

import {  transfer } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import AssetCard from '../components/AssetCard';
export default function Transfer({ navigation }) {

    const dispatch = useDispatch();
    const reducer = useSelector(state => state.reducer);
    const [amount,setAmount] = React.useState('1');
    const [address,setAddress] = React.useState('GAHLKSJDALLJGAAAKSDJJAANNSJ3FJ1LXJ');
    const [fee,setFee] = React.useState('');
    const [buttonDisabled,setButtonDisabled] = React.useState(true);

    React.useEffect(() => {
        fetch("https://bitcoinfees.earn.com/api/v1/fees/recommended")
            .then(resJson => resJson.json())
            .then(response => {
                //Se usuará la comisión más barata para el ejemplo
                setFee((response.hourFee / 100000000).toFixed(7))  
                setButtonDisabled(false)  
            });
    },[])

    const isValidTransfer = () => {
        return amount && address;
    }

    const _transfer = () => {
        if(isValidTransfer()) {
            let total = parseFloat(amount) + parseFloat(fee);
            Alert.alert(
                "Confirmar Envío",
                `Usted está por realizar un envío a la cuenta ${address} de ${total} BTC (${amount} + ${fee})`,
                [
                  {
                    text: "Confirmar",
                    onPress: () => dispatch(transfer(reducer.user_account.address,address,amount, fee)),
                    style: "cancel",
                  },
                ],
                {
                  cancelable: true
                }
            );
        } else {
            Alert.alert('Error', 'El monto y dirección son obligatorios.')
        }
    }

    return (
        <View style={styles.container}>
            <AssetCard />
            <Text style={styles.title}>Transferir BTC</Text>
            <View style={styles.inputWrapper}>
                <Text style={styles.text}>Monto</Text>
                <TextInput style={styles.input} placeholder="Monto" value={amount} onChangeText={setAmount} />
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.text}>Dirección de destino</Text>
                <TextInput style={styles.input} placeholder="Dirección de destino" value={address} onChangeText={setAddress} />
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.text}>Comisión de la red</Text>
                <TextInput editable={false} style={styles.input} value={fee} />
            </View>
            <View style={styles.inputWrapper}>
                <Button
                    onPress={_transfer}
                    disabled={buttonDisabled}
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
        justifyContent: 'flex-start',
        margin: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#841584',
        marginBottom: 5
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputWrapper: {
        marginVertical: 10,
    },
    input: {
        width: "100%",
        padding: 10,
        backgroundColor: 'white'
    }, 
});
