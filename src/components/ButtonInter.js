import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Animated, {
    interpolate,
    Value,
    useCode,
    cond,
    eq,
    set,
    not,
    block,
    sub,
    divide,
    call
} from 'react-native-reanimated';
import {
    State,
    TapGestureHandler
} from 'react-native-gesture-handler';
import {
    onGestureEvent,
    withTimingTransition,
} from 'react-native-redash';
import IconFA from 'react-native-vector-icons/FontAwesome';

const SQUARE_SIZE = 200;
const CIRCLE_RADIUS = SQUARE_SIZE / 2;
const ButtonInter = ({ icon }) => {

    /* START ANIMATION STUFF */
    const tapClick = new Value(0);
    const tapState = useRef(new Value(State.UNDETERMINED)).current;
    const tapFocal = useRef({ x: new Value(0), y: new Value(0) }).current;
    const tapGestureHandler = onGestureEvent({
        state: tapState,
        x: tapFocal.x,
        y: tapFocal.y
    });

    const transition = withTimingTransition(tapClick);
    const translateX = new Value(0);
    const translateY = new Value(0);

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
        cond(eq(tapState, State.END), set(tapClick, not(tapClick))),
        cond(eq(tapState, State.END), set(translateX, sub(tapFocal.x, divide(CIRCLE_RADIUS, 2)))),
        cond(eq(tapState, State.END), set(translateY, sub(tapFocal.y, divide(CIRCLE_RADIUS, 2)))),
        cond(eq(tapClick, 1), call([], () => (console.log('clicou')))),
    ]), [tapState]);

    /* END ANIMATION STUFF */


    return (
        //<TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <TapGestureHandler
            {...tapGestureHandler}
        >
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
                    <IconFA name={icon} size={CIRCLE_RADIUS / 2} />
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
        position: 'absolute',
        top: SQUARE_SIZE / 2 - CIRCLE_RADIUS / 2,
        left: SQUARE_SIZE / 2 - CIRCLE_RADIUS / 2,
    },
    animatedCircle: {
        width: CIRCLE_RADIUS,
        height: CIRCLE_RADIUS,
        backgroundColor: '#FFFFFF',
        borderRadius: CIRCLE_RADIUS / 2,
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