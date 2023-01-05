import { View, Text, StyleSheet, Dimensions, Modal, Pressable, Alert, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FAB, SegmentedButtons } from 'react-native-paper';
import CreateProfile from '../Login/CreateProfile';
import { ScrollView } from 'react-native-gesture-handler';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FarmRegistration = () => {


    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = useState();


    return (
        <>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => setModalVisible(true)}
                label="नयाँ दर्ता गर्नुहोस्"
                color='green'
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <ScrollView>

                            <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, fontWeight: '500', marginTop: 10 }}>खेत थप्नुहोस्</Text>

                            <View style={{ width: width * 0.8, marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }}>
                                <Text style={styles.label}>नाम:</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeText}
                                    value={text}
                                    placeholder="नाम राख्नुहोस्"
                                    placeholderTextColor="grey"

                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>


                                        <Text style={styles.label}>क्षेत्रफल:</Text>
                                        <TextInput
                                            style={[styles.input, { width: width * 0.3 }]}
                                            onChangeText={onChangeText}
                                            value={text}
                                            placeholder="क्षेत्रफल राख्नुहोस्"
                                            placeholderTextColor="grey"
                                            keyboardType='numeric'

                                        />
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>

                                        <Text style={styles.label}>क्षेत्रफल:</Text>
                                        <TextInput
                                            style={[styles.input, { width: width * 0.3 }]}
                                            onChangeText={onChangeText}
                                            value={text}
                                            placeholder="क्षेत्रफल राख्नुहोस्"
                                            placeholderTextColor="grey"
                                            keyboardType='numeric'

                                        />
                                    </View>
                                </View>

                                <Text style={styles.label}>
                                    मिति:</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeText}
                                    value={text}
                                    placeholder="
                                मिति राख्नुहोस्"
                                    placeholderTextColor="grey"


                                />
                                <Text style={styles.label}>

                                    ठाउँ:</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeText}
                                    value={text}
                                    placeholder="ठाउँ राख्नुहोस्"
                                    placeholderTextColor="grey"
                                    keyboardType='numeric'

                                />
                            </View>

                        </ScrollView>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btnCancel} onPress={() => setModalVisible(false)}>
                                <Text style={styles.btnTxt}>रद्द गर्नुहोस्</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSave}>
                                <Text style={styles.btnTxt}>थप्नुहोस्</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            </View>
        </>
    )
}

export default FarmRegistration


const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 25,
        right: 0,
        bottom: 0,
        color: 'black',
        width: width * 0.34,
        backgroundColor: '#d9d9d9'
    },
    centeredView: {
        // flex: 1,
        width: width * 0.85,
        height: height * 0.55,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 10
    },
    input: {
        height: 40,
        margin: 8,
        borderWidth: 0.5,
        padding: 10,
        color: 'black',
        borderRadius: 10,
        width: width * 0.6

    },
    label: {
        color: 'black',
        marginLeft: 12,

    },
    btnContainer: {
        flexDirection: 'row',
        width: width * 0.85,

    },
    btnSave: {
        width: width * 0.425,
        backgroundColor: 'green',
        padding: 10,
        borderBottomRightRadius: 10




    },
    btnCancel: {
        width: width * 0.425,
        backgroundColor: 'red',
        padding: 10,
        borderBottomLeftRadius: 10

    },
    btnTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }

})