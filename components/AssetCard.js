import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
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