import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Value } from 'react-native-reanimated';



import ReloadButton from '../components/ReloadButton';
import CardTabOrder, { CARD_WIDTH, CARD_HEIGHT, ITEM_COLUMMS } from '../components/CardTabOrder';
import { generatePosts } from '../obj/posts';

const BACKGROUND_COLOR = '#162447'
const TabOrderScreen = () => {

    const obj = generatePosts(5);

    const offsets = obj.map((_, index) => ({
        x: new Value(index % ITEM_COLUMMS === 0 ? 0 : CARD_HEIGHT),
        y: new Value(Math.floor((index / ITEM_COLUMMS) * CARD_WIDTH))
    }))

    return (
        <>
            <StatusBar barStyle={'light-content'} backgroundColor={BACKGROUND_COLOR} />
            <SafeAreaView style={styles.container}>
            <ReloadButton />
                {obj.map((item, index) => (
                    <CardTabOrder
                        key={item.id}
                        {...{ item, index, offsets }}
                    />
                ))}
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    },    
})

export default TabOrderScreen;