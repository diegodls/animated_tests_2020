import React from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
} from 'react-native';

import ReloadButton from '../ReloadButtons/ReloadButton';
import ButtonInter from './TapAnimationButton'

const BACKGROUND_COLOR = '#e8e4e1';

const ButtonScreen = () => {

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={BACKGROUND_COLOR} />
            <View style={styles.container}>
                <ReloadButton />
                <ButtonInter icon={'heart'} />
                <ButtonInter icon={'check-circle-o'} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    },
})

export default ButtonScreen;