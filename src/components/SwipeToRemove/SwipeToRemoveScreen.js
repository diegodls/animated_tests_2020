import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, View, Text } from 'react-native';
import ReloadButton from '../ReloadButtons/ReloadButton';
import SwipeToRemoveItem from './SwipeToRemoveItem';
import { generatePeoples, staticPeoples } from '../../Object/peoples';

const BACKGROUND_COLOR = '#e4edfc';

const SwipeToRemove = () => {

    const [data, setData] = useState(staticPeoples);

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={BACKGROUND_COLOR} />
            <SafeAreaView style={styles.container}>
                <ReloadButton />
                <View>
                    <Text>
                        Tem uns probleminhas aqui, logo logo será corrigido!
                    </Text>
                </View>
                <FlatList    
                style={styles.flatlist}                
                    data={data}
                    keyExtractor={(_, index) => String(index)}
                    renderItem={({ item, index }) => (
                        <SwipeToRemoveItem
                            {...{item}}
                            isLast={index === data.length - 1}
                            onSwipe={() => {
                                const newData = [...data];
                                newData.splice(newData.indexOf(item), 1);
                                setData(newData);
                            }}
                        />
                    )}
                />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center'
    },
    flatlist:{
        width: '100%'
    }
})

export default SwipeToRemove;


/*
#db7b96
#bea9df
#0d66d0
#637efd
#6b7992
#a2b1ca
#dee9fd
#e4edfc
#999EAC
#e43f5a
#F3F3FA
*/