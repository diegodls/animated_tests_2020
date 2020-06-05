import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Value, eq, interpolate, cond, useCode, set } from 'react-native-reanimated';

import ReloadButton from '../components/ReloadButton';
import ButtonLongTap, { RADIUS } from '../components/ButtonLongTap';
import CircularProgress from '../components/CircularProgress/CircularProgress';
import { onGestureEvent, withTransition, bInterpolatePath, timing } from 'react-native-redash';

const BACKGROUND_COLOR = '#ffc38b';
const BG_COLOR_CIRCULAR = '#FFFFFF';
const FG_COLOR_CIRCULAR = '#ffc38b';


const LongTapScreen = () => {
    const state = new Value(State.UNDETERMINED);
    const gestureHandler = onGestureEvent({ state });
    const isActive = eq(state, State.ACTIVE);
    const duration = cond(isActive, 2000, 500);
    // const progress = withTransition(eq(state, State.BEGAN), { duration });
    // const scale = interpolate(progress, {
    //     inputRange: [0, 1],
    //     outputRange: [1, 1.2]
    // });

    const progress = new Value(0);
    useCode(() => set(progress, timing({ duration: 10000 })), [progress]);

    return (<>
        <StatusBar barStyle={'dark-content'} backgroundColor={BACKGROUND_COLOR} />
        <ReloadButton />
        <SafeAreaView style={styles.container}>
            {/* <TapGestureHandler {...gestureHandler}>
                <Animated.View style={{ transform: [{ scale }] }}> */}
            <CircularProgress
                rd={RADIUS}
                bg={BG_COLOR_CIRCULAR}
                fg={FG_COLOR_CIRCULAR}
                {...{ progress }}
            />
            {/* <ButtonLongTap style={styles.circleContainer} {...{progress}} /> */}
            {/* </Animated.View>
            </TapGestureHandler> */}
        </SafeAreaView>
    </>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default LongTapScreen;