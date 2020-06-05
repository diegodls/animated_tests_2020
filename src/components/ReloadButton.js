import React from 'react';
import {
    StyleSheet,
    View,
    DevSettings,
    NativeModules,
    TouchableWithoutFeedback,
} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

const ReloadButton = () => {

    return (
        <TouchableWithoutFeedback onPress={() => DevSettings.reload()} >
            <View style={styles.container}>
                <IconFA name={'refresh'} size={40} color={'#f9f9f9'} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e43f5a',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 50,
        position: 'absolute',
        zIndex: 100,
        bottom: 20,
        right: 20,
        elevation: 5,
    },

})

export default ReloadButton;

