import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';


import { selectPostImage } from '../../Object/posts'
import Animated, { add, cond, eq, block, Value, set, useCode, divide, floor, multiply, max, and, Clock, Easing, neq, not, clockRunning, startClock, stopClock } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { usePanGestureHandler, timing } from 'react-native-redash';


export const CARD_WIDTH = 200;
export const CARD_HEIGHT = 200;
export const ITEM_COLUMMS = 2;

const withSnap = ({ value, offset, state: gestureState }) => { //essa função serve para retornar o item após soltar para sua ultima posição caso não for trocado de posição
    const clock = new Clock();
    const state = {
        position: new Value(0),
        finished: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    }
    const config = {
        toValue: new Value(0),
        duration: 250,
        easing: Easing.linear

    }
    const position = new Value(0);
    const safeOffset = new Value(0);

    return block(
        [
            cond(eq(gestureState, State.ACTIVE), set(position, value)),

            cond(and(neq(gestureState, State.ACTIVE), not(clockRunning(clock))), [
                set(config.toValue, offset),
                set(state.position, add(safeOffset, position)),
                set(state.finished, 0),
                set(state.time, 0),
                set(state.frameTime, 0),
                startClock(clock)
            ]),
            cond(
                clockRunning(clock),
                [
                    timing(clock, state, config),
                    cond(eq(state.finished, 1), [
                        set(safeOffset, offset),
                        stopClock(clock)
                    ]),
                    state.position
                ],
                [add(safeOffset, value)]
            )
        ]
    )
}


const CardTabOrderScreen = ({ item, index, offsets }) => {
    const { gestureHandler, state, translation } = usePanGestureHandler();
    const zIndex = cond(eq(state, State.ACTIVE), 10, 1);
    const currentOffset = offsets[index];
    const translateX = withSnap({
        value: translation.x,
        offset: currentOffset.x,
        state
    });
    const translateY = withSnap({
        value: translation.y,
        offset: currentOffset.y,
        state
    });

    const offsetX = multiply(max(floor(divide(translation.x, CARD_WIDTH)), 0), CARD_WIDTH);
    const offsetY = multiply(max(floor(divide(translation.x, CARD_HEIGHT)), 0), CARD_HEIGHT);
    useCode(() =>
        block(
            offsets.map(item =>
                cond(
                    and(
                        eq(offsetX, item.x),
                        eq(offsetY, item.y),
                        eq(state, State.ACTIVE)
                    ),
                    [
                        set(item.x, currentOffset.x),
                        set(item.y, currentOffset.y),
                        set(currentOffset.x, offsetX),
                        set(currentOffset.y, offsetY),
                    ]
                )
            )
        ), [])

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
        backgroundColor: '#CF0'

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