import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import das telas usadas na navegação
import MainScreen from '../screens/MainScreen';
import DragDropScreen from '../screens/DragDropScreen';
import SliderScreen from '../screens/SliderScreen';
import FlatListWalletScreen from '../screens/FlatListWalletScreen';
import ButtonScreen from '../screens/ButtonScreen';
import TabOrderScreen from '../screens/TabOrderScreen';
import LongTapScreen from '../screens/LongTapScreen';


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
                    name='ButtonScreen'
                    component={ButtonScreen}
                    options={{
                        title: 'ButtonScreen'
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}