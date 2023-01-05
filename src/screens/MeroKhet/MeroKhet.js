import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CommingSoon from '../../components/CommingSoon'

const MeroKhet = () => {
    return (
        <View style={styles.mainContainer}>
            <CommingSoon />
        </View>
    )
}

export default MeroKhet


const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }
})