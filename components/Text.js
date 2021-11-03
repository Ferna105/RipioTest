import React from 'react';
import {Text as NativeText} from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const Text = (props) => {
    const colorScheme = useColorScheme();

    return <NativeText {...props} style={[{color: Colors[colorScheme].text},{...props.style}]}></NativeText>
}

export default Text;