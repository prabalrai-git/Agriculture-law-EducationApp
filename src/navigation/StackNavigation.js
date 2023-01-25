import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard/Dashboard';
import Login from '../screens/Login/Login';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import BottomNavigation from './BottomNavigation';
import Notification from '../screens/commonScreens/Notification';
import CreateProfile from '../screens/Login/CreateProfile';
import Agriculture from '../screens/Agriculture/Agriculture';
import Education from '../screens/Education/Education';
import Law from '../screens/Law/Law';
import FarmRegistration from '../screens/Agriculture/FarmRegistration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bali from '../screens/Agriculture/Bali';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  const [userCode, setUserCode] = React.useState(null);

  React.useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userCode');
      if (value !== null) {
        // value previously stored
        // console.log(value, 'this is the value form async storage');
        setUserCode(value);
      }
    } catch (e) {
      // error reading value
      console.log('this is error from sync');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userCode == null && (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="SplashScreen"
              component={SplashScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="CreateProfile"
              options={{headerShown: false}}
              component={CreateProfile}
            />
          </>
        )}
        <Stack.Screen
          options={{headerShown: false}}
          name="BottomNavigation"
          component={BottomNavigation}
        />
        <Stack.Screen
          name="Agriculture"
          component={Agriculture}
          options={{title: 'कृषि'}}
        />
        <Stack.Screen
          name="FarmRegistration"
          component={FarmRegistration}
          options={{title: 'खेती दर्ता'}}
        />
        <Stack.Screen name="Education" component={Education} />
        <Stack.Screen name="Law" component={Law} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Bali" component={Bali} options={{title: 'बाली'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
