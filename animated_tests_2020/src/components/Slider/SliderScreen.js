import React from 'react';
import styled from 'styled-components';

import ReloadButtonStyled from '../ReloadButtons/ReloadButtonStyled'
import SliderComponent from './SliderComponent'

const BACKGROUND_COLOR = '#222831';

const Slider = () => {   

    /* START - COMPONENTS STUFF */
    const StatusBar = styled.StatusBar``;

    const Container = styled.SafeAreaView`
        flex: 1;  
        background-color: ${BACKGROUND_COLOR};          
        align-items: center;
        justify-content: center;  
    `;    
    /* END - COMPONENTS STUFF */


    return (
        <>
            <StatusBar barStyle={'light-content'} backgroundColor={BACKGROUND_COLOR} />
            <ReloadButtonStyled />
            <Container>
                <SliderComponent />               
                <SliderComponent />               
                <SliderComponent />               
            </Container>
        </>
    )
};
export default Slider;

/*
BUG: ao importar mais de um slider na mesma tela, os valores acabam interferindo um no outro
*/

