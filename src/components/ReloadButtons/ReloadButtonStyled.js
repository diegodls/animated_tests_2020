import React from 'react'
import {NativeModules, DevSettings } from 'react-native';
import styled from 'styled-components'
import IconFA from 'react-native-vector-icons/FontAwesome';

const ReloadButtonStyled = () => {

    const Container = styled.View`
        background-color: #e30092;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        border-radius: 40px;
        position: absolute;
        z-index:100;
        bottom: 50px;
        right: 20px;
        elevation: 5;    
    `;

    const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

    return (
        <TouchableWithoutFeedback onPress={() => DevSettings.reload()}>
            <Container>
                <IconFA name={'refresh'} size={40} color={'#f9f9f9'} />
            </Container>
        </TouchableWithoutFeedback>
    )
};

export default ReloadButtonStyled;