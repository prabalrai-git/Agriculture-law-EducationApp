import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import ChangeLanguage from '../../components/ChangeLanguage'
import { Avatar } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import ReanimatedCarousel from '../../components/ReanimatedCarousel';
import '../../../global'


const width = Dimensions.get('window').width;


const Dashboard = ({ navigation }) => {





    // setTimeout(() => {
    //     navigation.reset({
    //         index: 1,
    //         routes: [{ name: 'Dashboard' }],
    //     });
    // }, );









    const ServicesData = [{ id: 1, image: require('../../Assets/Images/tractor.png'), title: 'कृषि', navigationPath: 'Agriculture' }, { id: 2, image: require('../../Assets/Images/reading.png'), title: 'शिक्षा', navigationPath: 'Education' }, { id: 3, image: require('../../Assets/Images/compliant.png'), title: 'कानुन', navigationPath: 'Law' }]



    return (
        <View>
            {/* Start of header */}
            <View style={styles.topbar}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white', alignSelf: 'center' }}>LUNIVA TECHNOLOGY</Text>

                </View>
                <View style={{ flexDirection: 'row', width: width * 0.22, justifyContent: 'space-around', right: -10 }}>
                    <TouchableOpacity>
                        <Avatar.Image size={25} source={require('../../Assets/Images/avatar.png')} style={styles.avatar} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                        <Image source={require('../../Assets/Images/notification.png')}
                            resizeMode='contain'
                            style={[{ width: 22, height: 22, tintColor: "white", fontWeight: 'bold' }, styles.notification]} />
                    </TouchableOpacity>

                </View>
            </View>

            <ScrollView >
                <ReanimatedCarousel />
                <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>


                    <View style={styles.services}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginLeft: 15 }}>हाम्रा सेवाहरू</Text>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-around',
                        }}>

                            {
                                ServicesData.map((item) => {
                                    return (
                                        <TouchableOpacity style={styles.serviceContainer} key={item.id} onPress={() => navigation.navigate(item.navigationPath)}>

                                            <View  >
                                                <View style={styles.serviceImage}>

                                                    <Image source={item.image}
                                                        resizeMode='contain'
                                                        style={[{ width: 45, height: 45, tintColor: global.SecondaryColor, fontWeight: 'bold' }]} />
                                                </View>
                                                <Text style={{ color: 'black', fontSize: 16, marginTop: 10, textAlign: 'center' }}>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                })
                            }
                        </View>


                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>


                    <View style={styles.services}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginLeft: 15 }}>हाम्रा सेवाहरू</Text>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-around',
                        }}>

                            {
                                ServicesData.map((item) => {
                                    return (
                                        <TouchableOpacity style={styles.serviceContainer} key={item.id} onPress={() => navigation.navigate(item.navigationPath)}>

                                            <View  >
                                                <View style={styles.serviceImage}>

                                                    <Image source={item.image}
                                                        resizeMode='contain'
                                                        style={[{ width: 45, height: 45, tintColor: global.SecondaryColor, fontWeight: 'bold' }]} />
                                                </View>
                                                <Text style={{ color: 'black', fontSize: 16, marginTop: 10, textAlign: 'center' }}>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                })
                            }
                        </View>


                    </View>
                </View>




            </ScrollView>
            {/* End of Body */}



        </View>
    )
}

export default Dashboard


const styles = StyleSheet.create({
    topbar: {
        backgroundColor: global.SecondaryColor,
        height: 50,
        justifyContent: 'space-around',
        flexDirection: 'row',
        elevation: 2,
        alignItems: 'center'
        // borderBottomEndRadius: 10,
        // borderBottomLeftRadius: 10

    },
    avatar: {
        margin: 12,
        elevation: 2
    },

    notification: {
        marginTop: 14,
    },
    services: {
        width: width * 0.95,
        padding: 6,
        backgroundColor: 'white',
        // borderRadius: 8,
        marginTop: 20,
        elevation: 2


    },
    serviceContainer: {
        // width: width * 0.23,
        margin: 15,
        // backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        // paddingRight: 25,
        // paddingLeft: 25


    },
    serviceImage: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 10,

    }
})