import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    Alert
} from 'react-native';
import Animated, {
    interpolate,
    Value,
    useCode,
    cond,
    eq,
    block,
    sub,
    divide,
    call,
    Easing,
} from 'react-native-reanimated';
import {
    State,
    TapGestureHandler
} from 'react-native-gesture-handler';
import {
    onGestureEvent,
    timing,
} from 'react-native-redash';
import IconFA from 'react-native-vector-icons/FontAwesome';

const SQUARE_SIZE = 200;
const CIRCLE_RADIUS = SQUARE_SIZE - 50;
const ButtonInter = ({ icon }) => {

    /* START ANIMATION STUFF */

    const tapState = useRef(new Value(State.UNDETERMINED)).current;
    const tapFocal = useRef({ x: new Value(0), y: new Value(0) }).current;

    const tapGestureHandler = onGestureEvent({
        state: tapState,
        x: tapFocal.x,
        y: tapFocal.y
    });

    const translateX = cond(eq(tapState, State.END), sub(tapFocal.x, divide(CIRCLE_RADIUS, 2)));
    const translateY = cond(eq(tapState, State.END), sub(tapFocal.y, divide(CIRCLE_RADIUS, 2)));

    const transition = cond(eq(tapState, State.END), timing({
        duration: 500,
        from: 0,
        to: 1,
        easing: Easing.linear,
    }));

    const scale = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, 3]
    });

    const opacity = interpolate(transition, {
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.5, 0]
    });

    useCode(() => block([
        cond(eq(transition, 1),
            call([], () => (
                Alert.alert('Opa!', `Você clicou no: ${icon}`)
            )
            )),

    ]), [tapState]);

    /* END ANIMATION STUFF */

    return (
        <TapGestureHandler {...tapGestureHandler}>
            <Animated.View style={styles.container}>
                <Animated.View style={[
                    styles.animatedCircle, {
                        opacity,
                        transform: [
                            { translateX },
                            { translateY },
                            { scale }
                        ]
                    }]} />
                <View style={styles.circleContainer}>
                    <IconFA name={icon} size={CIRCLE_RADIUS / 2} color={'#333'} />
                </View>
            </Animated.View>
        </TapGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        backgroundColor: '#ec823a',
        borderRadius: SQUARE_SIZE / 10,
        overflow: 'hidden',
        elevation: 10,

    },
    animatedCircle: {
        width: CIRCLE_RADIUS,
        height: CIRCLE_RADIUS,
        backgroundColor: '#FFFFFF',
        borderRadius: CIRCLE_RADIUS / 2,
    },
    circleContainer: {
        width: CIRCLE_RADIUS,
        height: CIRCLE_RADIUS,
        backgroundColor: '#f9c49a',
        borderRadius: CIRCLE_RADIUS / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: SQUARE_SIZE / 2 - CIRCLE_RADIUS / 2,
        left: SQUARE_SIZE / 2 - CIRCLE_RADIUS / 2,
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