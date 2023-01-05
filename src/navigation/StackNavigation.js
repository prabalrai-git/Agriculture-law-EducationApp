import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard/Dashboard';
import Login from '../screens/Login/Login';
import SplashScreen from '../screens/SplashScreen/SplashScreen'
import BottomNavigation from './BottomNavigation';
import Notification from '../screens/commonScreens/Notification';
import CreateProfile from '../screens/Login/CreateProfile';
import Agriculture from '../screens/Agriculture/Agriculture';
import Education from '../screens/Education/Education';
import Law from '../screens/Law/Law';
import FarmRegistration from '../screens/Agriculture/FarmRegistration';



const Stack = createNativeStackNavigator();

function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen options={{ headerShown: false }} name="SplashScreen" component={SplashScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} /> */}
                <Stack.Screen name="CreateProfile" options={{ headerShown: false }} component={CreateProfile} />
                <Stack.Screen options={{ headerShown: false }} name="BottomNavigation" component={BottomNavigation} />
                <Stack.Screen name="Agriculture" component={Agriculture} />
                <Stack.Screen name="FarmRegistration" component={FarmRegistration} />
                <Stack.Screen name="Education" component={Education} />
                <Stack.Screen name="Law" component={Law} />
                <Stack.Screen name="Notification" component={Notification} />

            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default StackNavigation;