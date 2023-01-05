import { View, Text, TextInput, StyleSheet, PermissionsAndroid, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SegmentedButtons } from 'react-native-paper';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { getListOfDistricts } from '../../Services/appServices/agricultureService';
import { getlistofDisctrictByStateIdApi, getListOfStatesApi, getListOfVDCByDistrictIdApi } from '../../Services/appServices/geographyService';


const width = Dimensions.get('window').width;

const CreateProfile = ({ navigation }) => {

    const [text, onChangeText] = useState();
    const [number, onChangeNumber] = useState(null);
    const [cameraImage, setCameraImage] = useState();
    const [galleryImage, setGalleryImage] = useState()
    const [value, setValue] = React.useState('');




    const [stateList, setStateList] = useState();
    const [districtsList, setDistrictsList] = useState();
    const [municipalityList, setMunicipalityList] = useState();




    useEffect(() => {
        // getListOfDistricts((res) => {
        //     console.log(res, 'this is res');
        //     const data = res.map(item => ({ id: item.DID, title: item.District }))
        //     // console.log(data);
        //     setDistricts(data)
        // })

        getListOfStatesApi((res) => {
            if (res) {
                const data = res.map(item => ({
                    id: item.StateId,
                    title: item.StateName,
                }))
                setStateList(data)
            }
        })
    }, [])

    const onSelectState = (item) => {


        if (item) {

            setDistrictsList();
            const data = {
                stateId: item.id
            }
            getlistofDisctrictByStateIdApi(data, (res) => {
                if (res) {
                    const data = res.map(item => ({
                        id: item.DId,
                        title: item.District
                    }))
                    setDistrictsList(data);
                }
            })
        }
    }
    const onSelectDistrict = (item) => {


        if (item) {

            setMunicipalityList();
            const data = {
                districtId: item.id
            }
            getListOfVDCByDistrictIdApi(data, (res) => {
                if (res) {
                    const data = res.map(item => ({
                        id: item.VdcID,
                        title: item.Name
                    }))
                    setMunicipalityList(data);
                }
            })
        }
    }







    useEffect(() => {
        console.log(galleryImage);
    }, [galleryImage])


    let options = {
        saveToPhotos: true,
        mediaType: 'photo'
    }


    const openCamera = async () => {

        // console.log('pressed')
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera(options);
            console.log("this is the uri", result.assets[0].uri);
            setCameraImage(result.assets[0].uri);
            setGalleryImage()
        }
    }
    const openGallery = async () => {

        // console.log('pressed')

        const result = await launchImageLibrary(options);
        setGalleryImage(result.assets[0].uri);
        setCameraImage();

    }


    return (

        <ScrollView>
            <View>
                <Text style={{ textAlign: 'center', color: 'black', margin: 18, fontSize: 24, fontWeight: 'bold' }}>प्रोफाइल सिर्जना </Text>
            </View>

            <View>
                <Text style={styles.label}>पुरा नाम:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="आफ्नो नाम राख्नुहोस्"
                    placeholderTextColor="grey"

                />
                <Text style={styles.label}>
                    पासवर्ड:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="आफ्नो पासवर्ड राख्नुहोस्"
                    placeholderTextColor="grey"
                    secureTextEntry={true}


                />
                <Text style={styles.label}>पुन: पासवर्ड:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="पुन: पासवर्ड राख्नुहोस्"
                    placeholderTextColor="grey"
                    secureTextEntry={true}

                />
                <View style={{ flexDirection: 'row', width: width * 0.96, marginRight: 'auto', marginLeft: 'auto', alignItems: 'center', marginTop: 10 }}>
                    <View style={{ backgroundColor: 'grey', height: 2, width: width * 0.3 }}></View>
                    <Text style={{ color: 'black', marginTop: 1, fontSize: 16, fontWeight: '500', margin: 5 }}>ठेगाना</Text>
                    <View style={{ backgroundColor: 'grey', height: 2, width: width * 0.54 }}></View>
                </View>




                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>

                        <Text style={styles.label}>प्रदेश:</Text>
                        <AutocompleteDropdown
                            onSelectItem={text => onSelectState(text)}
                            dataSet={stateList}
                            textInputProps={{
                                style: {
                                    color: 'black',
                                    paddingLeft: 18,
                                },
                            }}

                            containerStyle={{ width: width * 0.458, margin: 8 }}

                        />
                    </View>

                    <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>

                        <Text style={styles.label}>जिल्ला:</Text>
                        {/* <TextInput
                            style={[styles.input, { width: width * 0.458 }]}
                            onChangeText={onChangeText}
                            value={text}
                            placeholderTextColor="grey"

                        /> */}
                        <AutocompleteDropdown
                            onSelectItem={item => onSelectDistrict(item)}
                            dataSet={districtsList}
                            textInputProps={{
                                style: {
                                    color: 'black',
                                    paddingLeft: 18,
                                },
                            }}
                            containerStyle={{
                                width: width * 0.458, margin: 8
                            }}

                        />
                    </View>

                    <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                        <Text style={[styles.label, { marginTop: 5 }]}>नगरपालिका/ गाउँपालिका:</Text>
                        <AutocompleteDropdown
                            // onSelectItem={setSelectedItem}
                            dataSet={municipalityList}
                            textInputProps={{
                                style: {
                                    color: 'black',
                                    paddingLeft: 18,
                                    // borderRadius: 10,

                                },
                            }}
                            containerStyle={{
                                width: width * 0.458, margin: 8
                            }}

                        />
                    </View>

                    <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>

                        <Text style={[styles.label, { marginTop: 5 }]}>वडा:</Text>
                        <TextInput
                            style={[styles.input, {
                                width: width * 0.458, marginTop: 3, borderRadius: 5, backgroundColor: '#e5ecf2', borderWidth: 0
                            }]}
                            onChangeText={onChangeText}
                            value={text}
                            placeholderTextColor="grey"
                            keyboardType='numeric'

                        />
                    </View>
                    <View style={{ backgroundColor: 'grey', height: 2, width: width * 0.95, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, marginTop: 15 }}>

                    </View>


                </View>
                <Text style={styles.label}>
                    नागरिकता नम्बर:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="आफ्नो नागरिकता नम्बर राख्नुहोस्"
                    placeholderTextColor="grey"
                    keyboardType='numeric'

                />
                <Text style={styles.label}>
                    प्रोफाइल फोटो अपलोड गर्नुहोस्:</Text>

                <SegmentedButtons
                    value={value}
                    onValueChange={setValue}
                    style={{ marginTop: 10, width: 250, marginLeft: 12 }}
                    buttons={[
                        {
                            value: 'gallery',
                            label: 'Gallery',
                            onPress: openGallery,
                            icon: 'image-multiple'

                        },
                        {
                            value: 'camera',
                            label: 'Camera',
                            onPress: openCamera,
                            icon: 'camera'

                        },

                    ]}
                />
                {
                    (galleryImage || cameraImage) && (

                        <Image source={{ uri: galleryImage ? galleryImage : cameraImage }} style={styles.image} />
                    )
                }
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('BottomNavigation')}>
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }} >सिर्जना</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default CreateProfile
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 8,
        borderWidth: 0.5,
        padding: 10,
        color: 'black',
        borderRadius: 10
    },
    label: {
        color: 'black',
        marginLeft: 12,

    },
    image: {
        width: 45,
        height: 45,
        margin: 10,
        borderRadius: 6,
        marginLeft: 14,
        borderWidth: 0.5,
        borderColor: 'black'
    },
    btn: {
        backgroundColor: 'green', width: width * 0.95, padding: 8, alignSelf: 'center', marginTop: 20, borderRadius: 20
    }
});