import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const CommingSoon = () => {
    return (
        <View style={{ marginTop: 300 }}>
            <Image source={require('../Assets/Images/coming-soon.png')} style={styles.image} />
            <Text style={styles.txt}>
                असुविधाको लागि माफ गर्नुहोस् !{`\n`}
                हामी यो सुविधा मा काम गर्दैछौं !!</Text>
        </View>
    )
}

export default CommingSoon


const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        tintColor: 'green',
        alignSelf: 'center'

    },
    txt: {
        color: 'black',
        textAlign: 'center',
        fontSize: 12,
        margin: 10
    }
})