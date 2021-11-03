import * as React from 'react';
import {  StyleSheet, TextInput, Button, Image, Alert, Text, View } from 'react-native';

import {signIn} from '../actions';
import { useDispatch } from 'react-redux';

export default function SignIn() {

    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');

    const dispatch = useDispatch()

    const isValidLogin = () => {
        return (username && password);
    }

    const _signIn = () => {
        if (isValidLogin()) {
            dispatch(signIn(username,password));
        } else {
            Alert.alert('Error','Por favor, complete su usuario y contraseña.')
        }
    }

    let passwordInput = null;

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../assets/images/logo.png')} />
            <Text style={styles.title}>Iniciar Sesión</Text>
            <View style={styles.inputWrapper}>
                <TextInput 
                    autoCapitalize="none" 
                    style={styles.input} 
                    autoFocus={true} 
                    placeholder="Usuario" 
                    value={username} 
                    onChangeText={setUsername}
                    onSubmitEditing={(event) => { passwordInput.focus() }}
                />
            </View>
            <View style={styles.inputWrapper}>
                <TextInput 
                    ref={(input) => { passwordInput = input }}
                    autoCapitalize="none" 
                    secureTextEntry={true} 
                    style={styles.input} 
                    placeholder="Contraseña" 
                    value={password} 
                    onChangeText={setPassword} 
                />
            </View>
            <View style={styles.inputWrapper}>
                <Button
                    onPress={_signIn}
                    title="Inciar Sesión"
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
    inputWrapper: {
        margin: 10,
        width: "80%"
    },  
    input: {
        width: "100%",
        padding: 10,
        backgroundColor: 'white'
    }, 
    img: {
        marginBottom: 10,
        width: 100,
        height: 100
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
