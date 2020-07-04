import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewGame from '../Screens/newGame';
import OptionList from '../Screens/optionList';
import Landing from '../Screens/landing';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator>
        <RootStack.Screen name="Landing"
            component={Landing}
            options={{ headerShown: false }}
        />
        <RootStack.Screen name="OptionList"
            component={OptionList}
            options={{ headerShown: false }}
        />
        <RootStack.Screen name="NewGame"
            component={NewGame}
            options={{ headerShown: false }}
        />
    </RootStack.Navigator>

);

export default RootStackScreen;

