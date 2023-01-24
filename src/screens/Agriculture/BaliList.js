import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {GetFarmProductionDetailsByFarmIdApi} from '../../Services/appServices/agricultureService';
import {useEffect} from 'react';
import {useState} from 'react';
import DialogBox from '../../Common/DialogBox';

const width = Dimensions.get('window').width;

const BaliList = ({
  reloadList,
  setModalVisiblitiy,
  setEditingProduct,
  FarmId,
  setReloadForEdit,
  reloadForEdit,
}) => {
  const [productionList, setProductionList] = useState();
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState();

  useEffect(() => {
    const data = {
      farmId: FarmId,
    };

    GetFarmProductionDetailsByFarmIdApi(data, res => {
      if (res.length > 0) {
        // console.log(res);
        setProductionList(res.filter(item => item.IsDeleted === false));
      }
    });
  }, [reloadList, dialogBoxVisible]);

  return (
    <View style={styles.mainContainer}>
      {productionList?.map(item => {
        return (
          <TouchableOpacity
            key={item.ProdID}
            onPress={() => console.log(item, 'this is selected item')}>
            <View style={styles.eachContainer}>
              <View>
                <Text style={styles.itemName}>{item.cropName}</Text>
                <View style={styles.eachRow}>
                  <Image
                    style={styles.infoImage}
                    source={require('../../Assets/FarmImages/Crop-animal.png')}
                  />
                  <Text style={styles.descText}>
                    उत्पादन प्रकार:{' '}
                    <Text style={styles.txt}>{item.CTypName}</Text>
                  </Text>
                </View>
                <View style={styles.eachRow}>
                  <Image
                    style={styles.infoImage}
                    source={require('../../Assets/FarmImages/Farm.png')}
                  />
                  <Text style={styles.descText}>
                    नस्ल प्रकार:<Text style={styles.txt}>{item.BreedId}</Text>
                  </Text>
                </View>
                <View style={styles.eachRow}>
                  <Image
                    style={styles.infoImage}
                    source={require('../../Assets/FarmImages/calendar1.png')}
                  />
                  <Text style={styles.descText}>
                    उत्पादन मिति:
                    <Text style={styles.txt}>
                      {' '}
                      {item.ProdEndDate.split('T')[0]}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.actionIconContainer}>
                <TouchableOpacity
                  style={{height: 40}}
                  onPress={() => {
                    // setEditingFarmId(item.frmID);
                    setEditingProduct(item);
                    setReloadForEdit(!reloadForEdit);
                    setModalVisiblitiy(true);
                  }}>
                  <Image
                    source={require('../../Assets/FarmImages/writing.png')}
                    style={{width: 28, height: 28, tintColor: 'green'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{height: 40}}
                  onPress={() => {
                    setDialogBoxVisible(true);
                    setDeletingProduct(item);
                  }}>
                  <Image
                    source={require('../../Assets/FarmImages/garbage.png')}
                    style={{
                      width: 28,
                      height: 28,
                      tintColor: 'red',
                      marginLeft: 15,
                    }}
                  />
                </TouchableOpacity>
                {deletingProduct && (
                  <DialogBox
                    setDeletingProduct={setDeletingProduct}
                    deletingProduct={deletingProduct}
                    dialogBoxVisible={dialogBoxVisible}
                    setDialogBoxVisible={setDialogBoxVisible}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BaliList;

const styles = StyleSheet.create({
  txt: {
    color: 'black',
  },
  mainContainer: {
    width: width * 0.95,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
    marginBottom: 100,
  },
  eachContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.95,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 10,
    backgroundColor: '#d4d4d4',
    borderRadius: 5,
    padding: 10,
  },
  itemName: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '500',
  },
  infoImage: {
    width: 20,
    height: 20,
    tintColor: 'green',
    marginRight: 5,
  },
  eachRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  descText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'center',
  },
  actionIconContainer: {
    flexDirection: 'row',
  },
  txt: {
    fontWeight: '400',
  },
});
