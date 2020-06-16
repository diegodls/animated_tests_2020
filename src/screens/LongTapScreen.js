import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { Value, eq, cond, useCode, set } from 'react-native-reanimated';

import ReloadButton from '../components/ReloadButton';
import { onGestureEvent, withTransition, timing, mix, use } from 'react-native-redash';
import ButtonLongTap from '../components/ButtonLongTap';


const BACKGROUND_COLOR = '#fff3cd';
const BG_COLOR_CIRCULAR = '#ff926b'; //color of progress bar
const FG_COLOR_CIRCULAR = '#ffc38b';

const RADIUS = 200;
const STROKE_WIDTH = RADIUS / 5; //size of progress bar

const LongTapScreen = () => {
    const state = new Value(State.UNDETERMINED);
    const gestureHandler = onGestureEvent({ state });
    const isActive = eq(state, State.BEGAN);
    const duration = cond(isActive, 2000, 200);
    const progress = withTransition(eq(state, State.BEGAN));
    const scale = mix(progress, 1, 1.2);

    // const progress = new Value(0);
    // useCode(() => set(progress, timing({ duration: 10000 })), [progress]);
    //parei 19: 11
    return (<>
        <StatusBar barStyle={'dark-content'} backgroundColor={BACKGROUND_COLOR} />
        <ReloadButton />
        <SafeAreaView style={styles.container}>
            <TapGestureHandler {...gestureHandler}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <ButtonLongTap
                        {...{ progress }}
                        rd={RADIUS}
                        bg={BG_COLOR_CIRCULAR}
                        fg={FG_COLOR_CIRCULAR}
                        stroke_w={STROKE_WIDTH}
                    />
                </Animated.View>
            </TapGestureHandler>
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