import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { selectPostImage } from '../obj/posts'
import Animated, {
    Value,
    add,
    cond,
    eq,
    block,
    set,
    useCode,
    multiply,
    divide,
    and,
    round,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {
    moving,
    panGestureHandler,
    withSpringTransition,    
} from 'react-native-redash';


export const CARD_WIDTH = 200;
export const CARD_HEIGHT = 200;
export const ITEM_COLUMMS = 2;

const withOffset = ({ value, offset, state: gestureState }) => {
    //essa função serve para retornar o item após soltar para sua ultima posição caso não for trocado de posição
    const safeOffset = new Value(0);
    return cond(
        eq(gestureState, State.ACTIVE),
        add(safeOffset, value),
        set(safeOffset, offset)
    );

}

const CardTabOrderScreen = ({ item, index, offsets }) => {
    const { gestureHandler, state, translation, velocity } = panGestureHandler();

    const currentOffset = offsets[index];
    const x = withOffset({
        value: translation.x,
        offset: currentOffset.x,
        state,
    });
    const y = withOffset({
        value: translation.y,
        offset: currentOffset.y,
        state,
    });
    const zIndex = cond(eq(state, State.ACTIVE), 200, cond(moving(y), 100, 1));
    const offsetX = multiply(round(divide(x, CARD_WIDTH)), CARD_WIDTH);
    const offsetY = multiply(round(divide(y, CARD_HEIGHT)), CARD_HEIGHT);
    const translateX = withSpringTransition(x, {}, velocity.x, state);
    const translateY = withSpringTransition(y, {}, velocity.y, state);
    useCode(
        () =>
            block(
                offsets.map((offset) =>
                    cond(
                        and(
                            eq(offsetX, offset.x),
                            eq(offsetY, offset.y),
                            eq(state, State.ACTIVE)
                        ),
                        [
                            set(offset.x, currentOffset.x),
                            set(offset.y, currentOffset.y),
                            set(currentOffset.x, offsetX),
                            set(currentOffset.y, offsetY),
                        ]
                    )
                )
            ),
        [currentOffset.x, currentOffset.y, offsetX, offsetY, offsets, state]
    );

    return (
        <>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={[styles.container, {
                    zIndex,
                    transform: [{ translateX }, { translateY }]
                }]}>
                    <Animated.View style={styles.imageContainer}>
                        <Animated.Image source={selectPostImage(item.image)} style={styles.image} />
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',      

    },
    imageContainer: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        elevation: 7,
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',


    },
})

export default CardTabOrderScreen;