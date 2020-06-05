import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import Animated, {
    interpolate,
    Value,
    useCode,
    cond,
    eq,
    set,
    not,
    block
} from 'react-native-reanimated';
import {
    State,
    TapGestureHandler
} from 'react-native-gesture-handler';
import {
    useTransition,
    onGestureEvent,
    withTimingTransition,
    delay,
    timing
} from 'react-native-redash';
import IconFA from 'react-native-vector-icons/FontAwesome';

const SQUARE_SIZE = 200;
const CIRCLE_RADIUS = SQUARE_SIZE / 2;
const ButtonInter = (props) => {

    const icon = props.icon;


    /* START ANIMATION STUFF */
    const open = new Value(0);
    const state = useRef(new Value(State.UNDETERMINED)).current;
    const gestureHandler = onGestureEvent({ state })

    const transition = withTimingTransition(open);

    const scale = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, 3]
    });


    //fazer um 'opacity_in' usando o abaixo e um 'opacity_out' onde não tem opacity, ai quando clicar usa o 'opacity_in' e soltar, usa o 'opacity_out'
    const opacity = interpolate(transition, {
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.5, 0]
    });

    useCode(() => block([
        cond(eq(state, State.END), set(open, not(open)))
    ]), [state]);

    /* END ANIMATION STUFF */


    return (
        //<TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <TapGestureHandler
            {...gestureHandler}
        >
            <Animated.View style={styles.container}>
                <Animated.View style={[styles.animatedCircle, {
                    opacity,
                    transform: [{ scale }]
                }]} />
                <View style={styles.circleContainer}>
                    <IconFA name={icon} size={50} />
                </View>
            </Animated.View>
        </TapGestureHandler>
        //</TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        backgroundColor: '#ec823a',
        borderRadius: SQUARE_SIZE / 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        elevation: 10,
    },
    circleContainer: {
        width: CIRCLE_RADIUS,
        height: CIRCLE_RADIUS,
        backgroundColor: '#f9c49a',
        borderRadius: CIRCLE_RADIUS / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    animatedCircle: {
        width: CIRCLE_RADIUS,
        height: CIRCLE_RADIUS,
        backgroundColor: '#FFFFFF',
        borderRadius: CIRCLE_RADIUS / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 40,
        color: '#7c3c21'
    },
});

export default ButtonInter;

/*
const transition = useTransition(open, { duration: 400, easing: Easing.inOut(Easing.ease) });
const transition = useTransition(open);
const transition = useSpringTransition(open, { duration: 400, easing: Easing.inOut(Easing.ease) });
*/