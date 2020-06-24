import React, {useRef} from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { screenDimensions } from '../../Helpers/Orientation';
import { selectPeopleImage } from '../../Object/peoples';
import { PanGestureHandler, State, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useCode, cond, eq, set, add, min, not, clockRunning, call, abs } from 'react-native-reanimated';
import { panGestureHandler, useValue, snapPoint, timing, useClock } from 'react-native-redash';


import Action from './Action'
const BACKGROUND_COLOR = '#F3F3FA';
const BORDER_COLOR = '#e4edfc';
const TEXT_COLOR = '#6b7992';
const SUB_TEXT_COLOR = '#a2b1ca';
const BORDER_RADIUS = 15;
const BORDER_SIZE = 2;
export const CARD_HEIGHT = 120;
const MARGIN = 10;
const AVATAR_SIZE = CARD_HEIGHT - MARGIN;

const W_WIDTH = Dimensions.get('window').width;
const snapPoints = [-W_WIDTH, -100, 0];

const SwipeToRemoveItem = ({ item, isLast, onSwipe }) => {
    
    const WIDTH = screenDimensions().width;


    const { gestureHandler, translation, velocity, state } = panGestureHandler();
    const translateX = useValue(0);
    const ANIMATED_CARD_HEIGHT = useValue(CARD_HEIGHT);
    const deleteOpacity = useValue(1);
    const offsetX = useValue(0);
    const clock = useClock();
    const to = snapPoint(translateX, velocity.x, snapPoints);
    const shouldRemove = useValue(0);

    useCode(
        () => [
            cond(
                eq(state, State.ACTIVE),
                set(translateX, add(offsetX, min(translation.x, 0))),
            ),
            cond(eq(state, State.END), [
                set(translateX, timing({ clock, from: translateX, to })),
                set(offsetX, translateX),
                cond(eq(to, -WIDTH), set(shouldRemove, 1))
            ]),
            cond(shouldRemove, [
                set(ANIMATED_CARD_HEIGHT, timing({ from: CARD_HEIGHT, to: 0 })),
                set(deleteOpacity, 0),
                //cond(not(clockRunning(clock)), call([], onSwipe)),
            ]),
        ],
        [/*onSwipe */]
    );


    return (
        <>

            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={styles.container}>
                    <View style={styles.action}>
                        <TouchableWithoutFeedback onPress={() => shouldRemove.setValue(1)}>
                            <Action x={abs(translateX)} {...{ deleteOpacity }} />
                        </TouchableWithoutFeedback>
                    </View>
                    <Animated.View style={[styles.shape, {
                        marginBottom: isLast ? MARGIN : 0,
                        height: ANIMATED_CARD_HEIGHT,
                        transform: [{ translateX }]
                    }]}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={selectPeopleImage(item.image)}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textName}>{item.name}</Text>
                            <Text style={styles.textAge}>{item.age} anos</Text>
                            <Text style={styles.textEmail}>{item.email}</Text>
                        </View>
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </>
    )
}


const styles = StyleSheet.create({
    action: {
        width: '95%',
        height: CARD_HEIGHT,
        borderRadius: BORDER_RADIUS,
        top: MARGIN,
        //backgroundColor: "#999EAC",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        overflow: "hidden",
        position: 'absolute',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    shape: {
        width: '95%',
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: BORDER_RADIUS,
        padding: 5,
        alignItems: 'center',
        marginTop: MARGIN,
        flexDirection: 'row',
        elevation: 4,
    },
    imageContainer: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        elevation: 5,
        borderWidth: BORDER_SIZE,
        borderColor: BORDER_COLOR,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',

    },
    textContainer: {
        marginLeft: MARGIN / 2,
        height: '100%',
        justifyContent: 'center',

    },
    textName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },
    textAge: {
        color: SUB_TEXT_COLOR,
    },
    textEmail: {
        color: SUB_TEXT_COLOR,
    },

});

export default SwipeToRemoveItem;

