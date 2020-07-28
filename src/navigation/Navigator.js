import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import das telas usadas na navegação
import MainScreen from '../MainScreen/MainScreen';
import DragDropScreen from '../components/DragAndDrop/DragDropScreen';
import SliderScreen from '../components/Slider/SliderScreen';
import FlatListWalletScreen from '../components/FlatListWallet/FlatListWalletScreen';
import TapAnimation from '../components/TapAnimation/TapAnimationScreen';
import TabOrderScreen from '../components/TabOrder/TabOrderScreen';
import LongTapScreen from '../components/LongPress/LongTapScreen';
import SwipeToRemove from '../components/SwipeToRemove/SwipeToRemoveScreen';


//criação da stack principal
const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen
                    name='MainScreen'
                    component={MainScreen}
                    options={{
                        title: 'MainScreen'
                    }}
                />
                <Stack.Screen
                    name='DragDropScreen'
                    component={DragDropScreen}
                    options={{
                        title: 'DragDropScreen'
                    }}
                />
                <Stack.Screen
                    name='SliderScreen'
                    component={SliderScreen}
                    options={{
                        title: 'SliderScreen'
                    }}
                />
                <Stack.Screen
                    name='FlatListWalletScreen'
                    component={FlatListWalletScreen}
                    options={{
                        title: 'FlatListWalletScreen'
                    }}
                />
                <Stack.Screen
                    name='TapAnimation'
                    component={TapAnimation}
                    options={{
                        title: 'Tap Animation'
                    }}
                />
                <Stack.Screen
                    name='TabOrderScreen'
                    component={TabOrderScreen}
                    options={{
                        title: 'TabOrderScreen'
                    }}
                />
                <Stack.Screen
                    name='LongTapScreen'
                    component={LongTapScreen}
                    options={{
                        title: 'LongTapScreen'
                    }}
                />
                <Stack.Screen
                    name='SwipeToRemove'
                    component={SwipeToRemove}
                    options={{
                        title: 'SwipeToRemove'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}