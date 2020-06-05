import React from 'react';
import { View, StyleSheet } from 'react-native';


export const RADIUS = 200;

const ButtonLongTap = ({ progress }) => {
    return (
        <View style={[styles.circleContainer, {
            
        }]}>

        </View>
    );
}

const styles = StyleSheet.create({
    circleContainer: {
        width: RADIUS,
        height: RADIUS,
        borderRadius: RADIUS / 2,
        backgroundColor: '#FFFFFF',
        elevation: 2,
    }
});

export default ButtonLongTap;