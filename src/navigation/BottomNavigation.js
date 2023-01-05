import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import Chat from '../screens/Chat/Chat';
import Dashboard from '../screens/Dashboard/Dashboard';
import MenuBar from '../screens/MenuBar/MenuBar';
import MeroKhet from '../screens/MeroKhet/MeroKhet';


const Tab = createBottomTabNavigator();



const BottomNavigation = () => {
    const { t, i18n } = useTranslation();
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, tabBarStyle: {
                position: 'absolute',
                // bottom: -10,
                // left: 8,
                // right: 8,
                elevation: 8,
                // borderRadius: 25,
                height: 55,
                backgroundColor: 'white'
            },
            tabBarShowLabel: false
        }}>

            <Tab.Screen name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.container}>
                            <Image source={require('../Assets/Images/homepage.png')}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: focused ? "green" : "black" }} />
                            <Text style={{ color: focused ? "green" : "black", fontSize: 14 }}>{t('Home')}</Text>
                        </View>
                    ),
                }} />
            <Tab.Screen name="Chat" component={Chat} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.container}>
                        <Image source={require('../Assets/Images/chat.png')}
                            resizeMode='contain'
                            style={{ width: 25, height: 25, tintColor: focused ? "green" : "black" }} />
                        <Text style={{ color: focused ? "green" : "black", fontSize: 14 }}>{t('Chats')}</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="MeroKhet" component={MeroKhet} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.container}>
                        <Image source={require('../Assets/Images/field.png')}
                            resizeMode='contain'
                            style={{ width: 25, height: 25, tintColor: focused ? "green" : "black" }} />
                        <Text style={{ color: focused ? "green" : "black", fontSize: 14 }}>{t('Mero Khet')}</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="MenuBar" component={MenuBar} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.container}>
                        <Image source={require('../Assets/Images/list.png')}
                            resizeMode='contain'
                            style={{ width: 25, height: 25, tintColor: focused ? "green" : "black" }} />
                        <Text style={{ color: focused ? "green" : "black", fontSize: 14 }}>{t('More')}</Text>
                    </View>
                ),
            }} />
        </Tab.Navigator>
    )
}

export default BottomNavigation;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },

})