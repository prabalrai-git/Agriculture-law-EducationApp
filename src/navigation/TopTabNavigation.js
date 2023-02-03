import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Image, Text, View} from 'react-native';
import Bikri from '../screens/Agriculture/KharchaBikri/Bikri/Bikri';
import Kharcha from '../screens/Agriculture/KharchaBikri/Kharcha/Kharcha';

const Tab = createMaterialTopTabNavigator();

function TopTabNavigation({route}) {
  // console.log(route, 'from top');
  return (
    <Tab.Navigator
      initialRouteName="Kharcha"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
          color: 'black',
        },
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTitleStyle: {
          fontWeight: '500',
          color: 'white',
        },
        headerTintColor: '#fff',
        tabBarStyle: {backgroundColor: 'white'},
        tabBarIndicatorStyle: {
          backgroundColor: 'green',
          height: 4,
          borderRadius: 10,
        },
      }}>
      <Tab.Screen
        name="Bikri"
        component={Bikri}
        options={{
          title: 'बिक्री',
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <View style={{flexDirection: 'row', width: '150%'}}>
              <Text
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  fontSize: 14,
                  // fontWeight: 'bold',
                  marginRight: 4,
                }}>
                बिक्री
              </Text>

              <Image
                source={require('../Assets/FarmImages/arrowup.png')}
                style={{width: 10, height: 10, alignSelf: 'center'}}
              />
            </View>
          ),
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name="Kharcha"
        component={Kharcha}
        options={{
          title: 'खर्च',
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <View style={{flexDirection: 'row', width: '150%'}}>
              <Text
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  fontSize: 14,
                  // fontWeight: 'bold',
                  marginRight: 4,
                }}>
                खर्च
              </Text>

              <Image
                source={require('../Assets/FarmImages/arrowdown.png')}
                style={{width: 10, height: 10, alignSelf: 'center'}}
              />
            </View>
          ),
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
}

export default TopTabNavigation;
