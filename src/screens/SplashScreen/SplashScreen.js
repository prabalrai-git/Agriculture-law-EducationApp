import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => navigation.navigate('Login'), 3000)
    }, [])

    return (
        <>
            <StatusBar backgroundColor={"white"} />
            <View style={styles.container}>

                {/* <Image source={require('../../Assets/Images/logo1.png')} resizeMode="cover" styles={styles.logo} /> */}
                <Text style={{ color: 'black', fontSize: 25, textAlign: 'center' }}>Powered By{`\n`}Luniva Technology</Text>
            </View>
        </>
    )
}

export default SplashScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        alignSelf: 'center',
        width: 30,
        width: 30

    },


})