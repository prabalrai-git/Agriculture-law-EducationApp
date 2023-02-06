import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AllItems from '../screens/Agriculture/FarmMarket.js/AllItems';
import {GetBajarItemTypeApi} from '../Services/appServices/agricultureService';

const Tab = createMaterialTopTabNavigator();

const TopNavigationKrishiBazzar = () => {
  const [options, setOptions] = useState();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    GetBajarItemTypeApi(res => {
      console.log(res);
      setOptions(res);
    });
  }, []);

  return (
    <>
      <Tab.Navigator
        initialRouteName="All"
        screenOptions={{
          tabBarScrollEnabled: true,
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
          tabBarStyle: {backgroundColor: '#4cbb17', height: 32},
          tabBarIndicatorStyle: {
            backgroundColor: 'darkgreen',
            height: 4,
            borderRadius: 10,
          },
        }}>
        <Tab.Screen
          name="All"
          component={AllItems}
          options={{
            title: 'सबै',
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <Text style={styles.topTabsOptionStyles}>सबै</Text>

                {/* <Image
                source={require('../Assets/FarmImages/arrowup.png')}
                style={{width: 10, height: 10, alignSelf: 'center'}}
              /> */}
              </View>
            ),
          }}
          initialParams={{typeId: 0}}
        />
        <Tab.Screen
          name="तरकारी"
          component={AllItems}
          options={{
            title: 'तरकारी',
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <View style={{flexDirection: 'row', width: '200%'}}>
                <Text style={styles.topTabsOptionStyles}>तरकारी</Text>

                {/* <Image
                source={require('../Assets/FarmImages/arrowdown.png')}
                style={{width: 10, height: 10, alignSelf: 'center'}}
              /> */}
              </View>
            ),
          }}
          initialParams={{typeId: 1}}
        />
        <Tab.Screen
          name="फलफुल"
          component={AllItems}
          options={{
            title: 'फलफुल',
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <View style={{flexDirection: 'row', width: '200%'}}>
                <Text style={styles.topTabsOptionStyles}>फलफुल</Text>

                {/* <Image
                source={require('../Assets/FarmImages/arrowdown.png')}
                style={{width: 10, height: 10, alignSelf: 'center'}}
              /> */}
              </View>
            ),
          }}
          initialParams={{typeId: 2}}
        />
        <Tab.Screen
          name="पशु"
          component={AllItems}
          options={{
            title: 'पशु',
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text style={styles.topTabsOptionStyles}>पशु</Text>
                {/* 
              <Image
                source={require('../Assets/FarmImages/arrowdown.png')}
                style={{width: 10, height: 10, alignSelf: 'center'}}
              /> */}
              </View>
            ),
          }}
          initialParams={{typeId: 3}}
        />
        <Tab.Screen
          name="बिउ/बेर्ना"
          component={AllItems}
          options={{
            title: 'बिउ/बेर्ना',
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <View
                style={{
                  flexDirection: 'row',
                  width: '200%',
                }}>
                <Text style={styles.topTabsOptionStyles}>बिउ/बेर्ना</Text>

                {/* <Image
                source={require('../Assets/FarmImages/arrowdown.png')}
                style={{width: 10, height: 10, alignSelf: 'center'}}
              /> */}
              </View>
            ),
          }}
          initialParams={{typeId: 4}}
        />
      </Tab.Navigator>
    </>
  );
};

export default TopNavigationKrishiBazzar;

const styles = StyleSheet.create({
  topTabsOptionStyles: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 14,
    // fontWeight: 'bold',
    marginTop: -6,
    marginRight: 4,
  },
});
