import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { multiply, interpolate, Extrapolate, lessThan } from 'react-native-reanimated';

import HalfCircle from './HalfCircle'
import { transformOrigin } from 'react-native-redash';

const CircularProgress = ({ progress, bg, fg, rd, stroke_w }) => {

    const theta = multiply(progress, 2 * Math.PI);
    const opacity = lessThan(theta, Math.PI);
    const rotate = interpolate(theta, {
        inputRange: [Math.PI, 2 * Math.PI],
        outputRange: [0, Math.PI],
        extrapolate: Extrapolate.CLAMP,
    });
    return (<>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ position: 'absolute', zIndex: 2 }}>
                <View style={{
                    width: rd * 2 - stroke_w,
                    height: rd * 2 - stroke_w,
                    borderRadius: rd - stroke_w / 2,
                    backgroundColor: stroke_w > 0 ? fg : null,
                }} />
            </View>
            <View style={{ zIndex: 1, }}>
                <HalfCircle rd={rd} color={bg} />
                <Animated.View style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity,
                    transform: transformOrigin(
                        { x: 0, y: rd / 2 },
                        { rotate: theta }
                      ),
                }}>
                    <HalfCircle rd={rd} color={fg} />
                </Animated.View>
            </View>
            <View style={{ transform: [{ rotate: "180deg" }] }}>
                <HalfCircle rd={rd} color={bg} />
                <Animated.View style={{
                    ...StyleSheet.absoluteFillObject,                    
                    transform: transformOrigin({ x: 0, y: rd / 2 }, { rotate }),
                }}>
                    <HalfCircle rd={rd} color={fg} />
                </Animated.View>
            </View>

        </View>
    </>);
}

/* ===NOTAS===
N1 - por padrão, o rotate irá rotacionar o elemento no eixo central, logo deve-se mover (translateY) o elemento para que o centro fique na parte debaixo e não no meio, e depois move-lo de volta.

transform: transformOrigin(0, RADIUS / 2, { rotate: rotateTop })
equivale a:
transform: [{ translateY: RADIUS / 2 }, { rotate: rotateTop },{ translateY: -RADIUS / 2 }]

*/

export default CircularProgress;

