import React from 'react';
import { View } from 'react-native';

const HalfCircle = ({ color, rd }) => {
    return (
        <View
            style={{
                width: rd * 2,
                height: rd,
                overflow: 'hidden',
            }} >
            <View
                style={{
                    backgroundColor: color,
                    width: rd * 2,
                    height: rd * 2,
                    borderRadius: rd,
                }} >
            </View>
        </View>
    );
}

export default HalfCircle;