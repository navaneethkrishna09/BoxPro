import React from 'react';
import {
    View,
    StatusBar,
    Image
} from 'react-native';

const Landing = (props) => {
    setTimeout(() => props.navigation.navigate('OptionList'), 1000)
    return (
        <View style={{ flex: 1, backgroundColor: '#9099a4', alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar backgroundColor='#36393f' barStyle='light-content' />
            <Image source={require('../Assets/logo.png')} style={{ height: 150, width: 150 }} />
        </View>
    )

}

export default Landing;