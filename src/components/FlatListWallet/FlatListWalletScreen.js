/*
NOTAS:
 1 - Este exemplo faz o uso da "Vanilla" para fazer as animações, sistema nativo do react-native e não do reanimated devido a problemas do reanimated com o android nessa aplicação
*/

import React from 'react';
import styled from 'styled-components';
import { FlatList, Animated, Dimensions } from 'react-native';
import ReloadButtonStyled from '../ReloadButtons/ReloadButtonStyled';

import CardFlatListWalletScreen from './CardFlatListWalletScreen'
import { generatePosts } from '../../Object/posts'

const BACKGROUND_COLOR = '#e8e4e1';
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('screen');
const CONTAINER_HEIGHT = WINDOW_HEIGHT;
const CONTAINER_WIDTH = WINDOW_WIDTH;

const FlatListScreen = () => {

    const obj = generatePosts(10);

    /* START - COMPONENTS STUFF */

    const StatusBar = styled.StatusBar``;

    const Container = styled.View`
    height: ${CONTAINER_HEIGHT}px; 
    width: ${CONTAINER_WIDTH}px; 
    background-color: ${BACKGROUND_COLOR};
    justify-content: center;
  `;

    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    /* END - COMPONENTS STUFF */

    /* START - ANIMATION STUFF */
    const y = new Animated.Value(0);
    const onScroll = Animated.event([
        {
            nativeEvent: { contentOffset: { y } }
        }
    ], { useNativeDriver: true });
    /* END - ANIMATION STUFF */


    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={BACKGROUND_COLOR} />
            <ReloadButtonStyled />
            <Container>
                <AnimatedFlatList
                
                    //style={{ backgroundColor: '#000' }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    {...{ onScroll }}
                    bounces={false}
                    data={obj}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => (
                        <CardFlatListWalletScreen
                            container_height={CONTAINER_HEIGHT}
                            item={item}
                            index={index}
                            isLast={index === obj.length - 1}
                            y={y} />
                    )} />
            </Container>
        </>
    )
};
export default FlatListScreen;

