import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { divide, interpolate, sub, Extrapolate, cond, lessThan, add, multiply } from 'react-native-reanimated';


import { CARD_HEIGHT } from './SwipeToRemoveItem';

const Action = ({ x, deleteOpacity }) => {

    const HEIGHT = CARD_HEIGHT;
    const SIZE = cond(lessThan(x, HEIGHT), x, add(x, sub(x, HEIGHT)));
    const translateX = cond(lessThan(x, HEIGHT), 0, divide(sub(x, HEIGHT), 2));
    const BORDER_RADIUS = divide(SIZE, 2);
    const scale = interpolate(SIZE, {
        inputRange: [20, 30],
        outputRange: [0.001, 1],
        extrapolate: Extrapolate.CLAMP,
    });

    const minusOpacity = interpolate(SIZE, {
        inputRange: [HEIGHT - 20, HEIGHT + 20],
        outputRange: [1, 0]
    });
    const textOpacity = sub(1, minusOpacity);

    return (
        <Animated.View style={[styles.container, {
            height: SIZE,
            width: SIZE,
            borderRadius: BORDER_RADIUS,
            transform: [{ translateX }]

        }]}>
            <Animated.View style={
                [styles.minus,
                {
                    opacity: minusOpacity,
                    transform: [{ scale }]
                }]
            } />
            <Animated.View style={
                [styles.remove,
                { opacity: multiply(textOpacity, deleteOpacity) }]
            }>
                <Text style={styles.removeText}>Remove</Text>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D93F12',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    remove: {
        justifyContent: "center",
        alignItems: "center",
    },
    minus: {
        height: 5,
        width: 20,
        backgroundColor: '#FFF',
        position: 'absolute',
    },
    removeText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
})

export default Action;
