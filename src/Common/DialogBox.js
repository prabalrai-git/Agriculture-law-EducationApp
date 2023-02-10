import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';

import {
  InsertUpdateBaaliOfUserApi,
  InsertUpdateFarmApi,
} from '../Services/appServices/agricultureService';

const DialogBox = ({
  deletingFarm,
  dialogBoxVisible,
  setDialogBoxVisible,
  deletingProduct,
  setDeletingProduct,
  setDeletingFarm,
}) => {
  const onDelete = () => {
    const deletingFarmData = () => {
      return {...deletingFarm, IsDeleted: true};
    };

    const deletingProductData = () => {
      return {...deletingProduct, IsDeleted: true};
    };

    if (deletingFarm) {
      var formData = deletingFarmData();
    }
    if (deletingProduct) {
      var productformData = deletingProductData();
    }
    if (deletingFarm) {
      InsertUpdateFarmApi(formData, res => {
        if (res) {
          setDeletingFarm();
          setDialogBoxVisible(false);
          showMessage({
            message: 'सफल',
            description: 'हटाइएको छ',
            type: 'danger',
            color: 'white',
            position: 'bottom',
            style: {height: 81},

            icon: props => (
              <Image
                source={require('../Assets/flashMessage/x-mark.png')}
                {...props}
                style={{
                  tintColor: 'white',
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />
            ),
            // titleStyle: {textAlign: 'center'},
            // textStyle: {textAlign: 'center'},
          });
        }
      });
    }
    if (deletingProduct) {
      InsertUpdateBaaliOfUserApi(productformData, res => {
        if (res) {
          setDialogBoxVisible(false);
          setDeletingProduct();
          showMessage({
            message: 'सफल',
            description: 'हटाइएको छ',
            type: 'danger',
            color: 'white',
            position: 'bottom',
            style: {height: 81},

            icon: props => (
              <Image
                source={require('../Assets/flashMessage/x-mark.png')}
                {...props}
                style={{
                  tintColor: 'white',
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />
            ),
            // titleStyle: {textAlign: 'center'},
            // textStyle: {textAlign: 'center'},
          });
        }
      });
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={dialogBoxVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>तपाईं हटाउन चाहनुहुन्छ?</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setDialogBoxVisible(false);
                if (deletingProduct) {
                  setDeletingProduct();
                }
                if (deletingFarm) {
                  setDeletingFarm();
                }
              }}>
              <Text style={styles.textStyle}>चाहन्न</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={onDelete}>
              <Text style={styles.textStyle}>चाहन्छु</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DialogBox;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    width: Dimensions.get('window').width * 0.7,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 25,
    paddingBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: Dimensions.get('window').width * 0.27,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: 'red',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});
