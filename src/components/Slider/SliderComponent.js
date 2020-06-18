import React, { useRef } from 'react';
import { Dimensions } from 'react-native'
import styled from 'styled-components';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Value, diffClamp, sub, interpolate, concat, round, divide, multiply, useCode, cond, call, eq } from 'react-native-reanimated';
import { onGestureEvent, withOffset, ReText } from 'react-native-redash';

import SliderItem from './SliderItem'

const { width, height } = Dimensions.get('window');
const ICON_SIZE = 80;
const SLIDER_WIDTH = width - 100;
const SLIDER_HEIGHT = 50;


const Slider = () => {

    /* START - ANIMATION STUFF */

    const state = useRef(new Value(State.UNDETERMINED)).current;
    const translationX = useRef(new Value(0)).current;
    const gestureHandler = useRef(onGestureEvent({ state, translationX })).current;
    const x = useRef(diffClamp(withOffset(translationX, state), 0, SLIDER_WIDTH)).current;
    const translateX = useRef(sub(x, (ICON_SIZE / 2))).current;
    const rotateZ = useRef(interpolate(x, {
        inputRange: [0, SLIDER_WIDTH], //controla o tamanho do percurso
        outputRange: [0, 2 * Math.PI] //controla a quantidade de rotações que será feita com base no percurso do inputRange
    })).current;

    const scaleX = useRef(interpolate(x, {
        inputRange: [0, SLIDER_WIDTH], //controla o tamanho do percurso
        outputRange: [0, SLIDER_WIDTH] //controla o tamanho da escala de 0% à 100%, sendo o 0% = 0px e 100% = {SLIDER_WIDTH}px, pode ser usado para outras medidas
    })).current;
    
    const value = round(multiply(divide(x, SLIDER_WIDTH), 100));
    const text = concat(value);

    //usecode abaixo para quando soltar o icone, setar o valor de onde parou, pode usar essa valor para outras coisas
    useCode(
        () => cond(
            eq(state, State.END),
            call([value], (v) => simpleFunction(v))
        ), [state, value]
    );

    /* END - ANIMATION STUFF */

    /* START - JAVASCRIPT STUFF */
    function simpleFunction(value) {
        //use esta função para quaisquer fins   
        console.log(value)   ;
    }
    /* END - JAVASCRIPT STUFF */

    /* START - COMPONENTS STUFF */
    const Slider = styled.View`
        width: ${SLIDER_WIDTH}px;
        height: ${SLIDER_HEIGHT}px;    
        justify-content: center;  
        /* background-color: #cf0; */
    `;

    const SliderBackGround = styled.View`        
        height: 20px;
        background-color: #CECECE;
        border-radius: 10px;       
        z-index: 1;        
    `;

    const SliderBackGroundPercent = styled.View`        
        height: 20px;
        background-color: #fc3a52;
        border-radius: 10px;       
        z-index: 2;
    `;


    const ItemContainer = styled.View`        
        width: ${ICON_SIZE}px;
        height: ${ICON_SIZE}px;       
        position: absolute;
        z-index: 3;
        /* background-color: #fc0;  */
        

    `;

    const Text = styled.Text`
    font-size: 40px;
    color: #fc3a52;
    
    `;


    const AnimatedItemContainer = Animated.createAnimatedComponent(ItemContainer);
    const AnimatedSliderBackGroundPercent = Animated.createAnimatedComponent(SliderBackGroundPercent);

    /* END - COMPONENTS STUFF */


    return (
        <>
            <Slider>
                <SliderBackGround>
                    <AnimatedSliderBackGroundPercent style={{ width: scaleX, }} />
                </SliderBackGround>
                <PanGestureHandler {...gestureHandler}>
                    <AnimatedItemContainer
                        style={{
                            transform: [
                                { translateX },
                                { rotateZ }]
                        }}>
                        <SliderItem
                            state={state}
                            size={ICON_SIZE}
                        /*{...{state}}*/ />
                    </AnimatedItemContainer>
                </PanGestureHandler>
            </Slider>
            <ReText text={text} style={{ color: '#fc3a52', fontSize: 40 }} />
        </>
    )
};
export default Slider;


/*resposta
https://www.youtube.com/watch?v=D2p26Cgj40I
Awesome video as always. I use width, not scaleX and have the same result
and i don't have to use the trick with the small ball overlay, as the icon is above the bar , is better use scaleX or width?
*/
