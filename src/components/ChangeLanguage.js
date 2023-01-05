import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import '../Languages/i18n'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


const ChangeLanguage = () => {
    const { t, i18n } = useTranslation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'English', value: 'En' },
        { label: 'Nepali', value: 'Np' }
    ]);


    const changeLanguage = (e) => {

        i18next.changeLanguage(e)

    }

    return (
        <>
            {/* <StatusBar backgroundColor={'white'} */}
            {/* /> */}
            <View style={styles.container}>
                <Text style={styles.text}>{t('label1')}</Text>
                <Text style={styles.text} >{t('Greeting')}</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={(e) => changeLanguage(e)}
                />
            </View>
        </>
    )
}

export default ChangeLanguage


const styles = StyleSheet.create({
    container: {

        backgroundColor: 'white',
        justifyContent: 'center'
    },
    text: {
        color: 'black',
        alignSelf: 'center'

    },
    input: {
        height: 50,
        margin: 50,
        borderWidth: 2,
        padding: 10,
        color: 'black'
    },
});