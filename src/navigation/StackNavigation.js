import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import SoilTesting from '../screens/Agriculture/Soil/SoilTesting';
import TopTabNavigation from './TopTabNavigation';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import Queries from '../screens/Agriculture/JTACommunications/Queries/Queries';
import Comments from '../screens/Agriculture/JTACommunications/Comments/Comments';
import TopNavigationKrishiBazzar from './TopNavigationKrishiBazzar';
import ItemFullDescription from '../screens/Agriculture/FarmMarket.js/ItemFullDescription';
import {createDrawerNavigator} from '@react-navigation/drawer';
import OwnItems from '../screens/Agriculture/FarmMarket.js/OwnItems';
import BikriReport from '../screens/Agriculture/KharchaBikri/Reports/BikriReport';
import KharchReport from '../screens/Agriculture/KharchaBikri/Reports/KharchReport';
import FarmMarketDashboard from '../screens/Agriculture/FarmMarket.js/FarmMarketDashboard';

const width = Dimensions.get('window').width;

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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

  const CustomReportHeaderKharchaBikri = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width * 0.75,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '500',
            alignSelf: 'center',
          }}>
          खर्च र बिक्री
        </Text>
        <TouchableOpacity>
          <Image
            source={require('../Assets/FarmImages/compare.png')}
            style={{
              tintColor: 'white',
              width: 35,
              height: 35,
              // backgroundColor: 'red',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const CustomReportHeaderFarmerMarket = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width * 0.78,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '500',
            alignSelf: 'center',
          }}>
          बजार
        </Text>
        {/* <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={require('../Assets/Images/list.png')}
            style={{
              tintColor: 'white',
              width: 25,
              height: 25,
              // backgroundColor: 'red',
            }}
          />
        </TouchableOpacity> */}
      </View>
    );
  };
  const CustomReportHeaderFarmerMarketMag = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width * 0.78,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '500',
            alignSelf: 'center',
          }}>
          माग
        </Text>
        {/* <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={require('../Assets/Images/list.png')}
            style={{
              tintColor: 'white',
              width: 25,
              height: 25,
              // backgroundColor: 'red',
            }}
          />
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTitleStyle: {
            fontWeight: '500',
            color: 'white',
          },
          headerTintColor: '#fff',
        }}>
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
        <Stack.Screen
          name="Education"
          component={Education}
          options={{title: 'शिक्षा'}}
        />
        <Stack.Screen name="Law" component={Law} options={{title: 'कानुन'}} />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{title: 'सूचना'}}
        />
        <Stack.Screen
          name="Bali"
          component={Bali}
          options={{title: 'बाली/पशु'}}
        />
        <Stack.Screen
          name="TopTabNavigation"
          component={TopTabNavigation}
          options={{headerTitle: () => <CustomReportHeaderKharchaBikri />}}
        />
        <Stack.Screen
          name="SoilTesting"
          component={SoilTesting}
          options={{
            title: 'माटो परीक्षण',
          }}
        />
        <Stack.Screen
          name="Queries"
          component={Queries}
          options={{
            title: 'जिज्ञासाहरू',
          }}
        />
        <Stack.Screen
          name="OwnItems"
          component={OwnItems}
          options={{
            title: 'मेरो उत्पादनहरु',
          }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{
            title: 'टिप्पणीहरू',
          }}
        />

        <Stack.Screen
          name="ItemFullDescription"
          component={ItemFullDescription}
          options={{
            title: 'विवरण',
          }}
        />
        <Stack.Screen
          name="BikriReport"
          component={BikriReport}
          options={{
            title: 'बिक्री रिपोर्ट',
          }}
        />
        <Stack.Screen
          name="KharchReport"
          component={KharchReport}
          options={{
            title: 'खर्च रिपोर्ट',
          }}
        />
        <Stack.Screen
          name="FarmerMarketDash"
          component={FarmMarketDashboard}
          options={{
            title: 'कृषि बजार',
          }}
        />
        <Stack.Screen
          name="TopNavigationKrishiBazzar"
          component={TopNavigationKrishiBazzar}
          options={{
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: 'white',
            title: 'बजार',
            headerTitle: () => <CustomReportHeaderFarmerMarket />,
          }}
        />
        <Stack.Screen
          name="TopNavigationKrishiBazzarMag"
          component={TopNavigationKrishiBazzar}
          options={{
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: 'white',
            title: 'बजार',
            headerTitle: () => <CustomReportHeaderFarmerMarketMag />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
