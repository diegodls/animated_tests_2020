import React from 'react';
import { View } from 'react-native';


import HalfCircle from './HalfCircle'


const CircularProgress = ({ progress, bg, fg, rd }) => {
    return (<>

        <View style={{ zIndex: 1 }}>
            <HalfCircle color={bg} />
            <HalfCircle color={fg} />
        </View>
        <View>
            <HalfCircle color={bg} />
            <HalfCircle color={fg} />
        </View>

    </>);
}
https://www.youtube.com/watch?v=K6X9Xcy6oio
4:35
export default CircularProgress;