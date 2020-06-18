import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import ReloadButton from '../ReloadButtons/ReloadButton';
import ReloadButtonStyled from '../ReloadButtons/ReloadButtonStyled'


const SwipeToRemove = () => {

    const styles = Styles

    return (
        <SafeAreaView>  
            <ReloadButtonStyled />         
            <Text>SwipeToRemove AAA</Text>            
        </SafeAreaView>
    )
}

export default SwipeToRemove;