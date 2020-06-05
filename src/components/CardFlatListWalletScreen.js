import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Animated } from 'react-native';


import { selectPostImage } from '../obj/posts'

const CardFlatListWalletScreen = (props) => {

    const item = props.item;
    const index = props.index;
    const isLast = props.isLast;
    const y = props.y;
    const container_height = props.container_height;


    const { height: WINDOW_HEIGHT } = Dimensions.get('window');
    const QUANT_CARDS = 3;
    const MARGIN = QUANT_CARDS * 2.5;
    const DEFAULT_CARD_HEIGHT = (container_height / QUANT_CARDS) - MARGIN * QUANT_CARDS;
    //const DEFAULT_CARD_HEIGHT = 300;
    const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN;

    /* START - COMPONENTS STUFF */

    const Container = styled.SafeAreaView`   
        align-self: center;  
        width: 98%;
        height: ${DEFAULT_CARD_HEIGHT}px;
        border-radius: 20px;
        margin-top: ${MARGIN}px;
        margin-bottom: ${isLast ? MARGIN * 4 : 0}px;
        overflow: hidden;
        elevation: 2;
  `;

    const Image = styled.Image`
        width: 100% ;
        height: 100% ;    
        resizeMode: cover;
    
    `;

    const AnimatedContainer = Animated.createAnimatedComponent(Container);

    /* END - COMPONENTS STUFF */

    /* START - ANIMATION STUFF */
    const position = Animated.subtract(index * CARD_HEIGHT, y);
    const isDisappearing = -CARD_HEIGHT;
    const isTop = 0;
    const isBottom = container_height - CARD_HEIGHT;
    const isAppearing = container_height;
    const translateY = Animated.add(Animated.add(y,
        y.interpolate({
            inputRange: [0, 0.0001 + index * CARD_HEIGHT],
            outputRange: [0, - index * CARD_HEIGHT],
            extrapolateRight: 'clamp'
        })),
        position.interpolate({ //esse position define a distância do 4º card
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -CARD_HEIGHT / 4],
            extrapolate: 'clamp'
        }));

    const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolate: 'clamp'
    });
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
    });

    /* END - ANIMATION STUFF */

    return (
        <AnimatedContainer style={{
            opacity,
            transform: [{ translateY }, { scale }]
        }}>
            <Image source={selectPostImage(item.image)} />
        </AnimatedContainer>
    )
};
export default CardFlatListWalletScreen;

