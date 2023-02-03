import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

// const data = [
//   {label: 'Item 1', value: '1'},
//   {label: 'Item 2', value: '2'},
//   {label: 'Item 3', value: '3'},
//   {label: 'Item 4', value: '4'},
//   {label: 'Item 5', value: '5'},
//   {label: 'Item 6', value: '6'},
//   {label: 'Item 7', value: '7'},
//   {label: 'Item 8', value: '8'},
//   {label: 'hello wrold', value: '9'},
// ];
const width = Dimensions.get('window').width;
const DropdownComponent = props => {
  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState();
  const [editingValue, setEditingValue] = useState();
  const [editingProductValue, setEditingProductValue] = useState();

  const [valueOnDropDown, setValueOnDropDown] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const {
    editingFarm,
    areaUnits,
    setAreaType,
    setEditingFarm,
    agriType,
    baliType,
    onSelectAgriType,
    onSelectBaliType,
    breedType,
    setBreedId,
    editingProduct,
    setEditingProduct,
    GenderType,
    setGender,
    createUser,
    stateList,
    AddressForm,
    ProfessionForm,
    professionType,
    onSelectState,
    districtsList,
    municipalityList,
    onSelectDistrict,
    setSelectedProfession,
    setMunicipality,
    editingFarmId,
    editBreedType,
    editBaliType,
    editChecker,
  } = props;

  // useEffect(() => {
  //   console.log(editingProduct, 'this is the editedit');
  // }, []);

  useEffect(() => {
    dropDownData();
    // console.log('This is props', props);
  }, [
    areaUnits,
    baliType,
    breedType,
    stateList,
    professionType,
    districtsList,
    municipalityList,
    editBreedType,
    editBaliType,
  ]);
  const dropDownData = () => {
    setData();
    let data = [];
    if (areaUnits) {
      const newData = data.concat(areaUnits);
      // console.log('This is the props data', newData);
      setData(newData);
      return;
    }
    if (agriType) {
      const newData = data.concat(agriType);
      setData(newData);
      return;
    }
    if (baliType && !editBaliType) {
      const newData = data.concat(baliType);
      // console.log(baliType, 'thi 1010101010');
      setData(newData);
      return;
    }
    if (breedType && !editBreedType) {
      const newData = data.concat(breedType);
      setData(newData);
      return;
    }
    if (GenderType) {
      const newData = data.concat(GenderType);
      setData(newData);
    }
    if (stateList) {
      const newData = data.concat(stateList);
      setData(newData);
    }
    if (professionType) {
      const newData = data.concat(professionType);
      setData(newData);
    }
    if (districtsList) {
      const newData = data.concat(districtsList);
      setData(newData);
    }
    if (municipalityList) {
      const newData = data.concat(municipalityList);
      setData(newData);
    }
    if (editBaliType) {
      setData(editBaliType);
    }
    if (editBreedType) {
      setData(editBreedType);
    }
  };

  const onSelect = item => {
    // console.log('running again', item);
    if (setAreaType) {
      // console.log('hello ', item);
      setAreaType(item);
    }
    if (setEditingFarm && editingFarmId) {
      setEditingFarm(prev => {
        return {...prev, frmAreaUnit: item?.label};
      });
    }
    if (setEditingProduct && editBaliType) {
      if (editChecker) {
        setEditingProduct(prev => {
          return {...prev, cropName: item.label, ProdCropID: item.value};
        });
      }
    }
    if (setEditingProduct && editBreedType) {
      if (editChecker) {
        // console.log('this ran');

        setEditingProduct(prev => {
          return {...prev, BreedId: item.value};
        });
      }
    }
    if (onSelectAgriType) {
      onSelectAgriType(item);
    }
    if (onSelectBaliType) {
      onSelectBaliType(item);
    }
    if (setBreedId) {
      // console.log(item?.value, 'breed id');
      setBreedId(item?.value);
    }
    // if (editingProduct && onSelectAgriType) {
    //   setEditingProduct(prev => ({...prev, ProdFarmTypeID:}));
    // }
    if (setGender) {
      setGender(item?.label);
    }
    if (onSelectState) {
      onSelectState(item);
    }
    if (onSelectDistrict) {
      onSelectDistrict(item);
    }
    if (setSelectedProfession) {
      setSelectedProfession(item.value);
    }
    if (setMunicipality) {
      setMunicipality(item.label);
    }
  };

  const setEditingValueMethod = () => {
    if (editingFarm) {
      setEditingValue([
        {
          label: editingFarm.frmAreaUnit,
          value: areaUnits
            // .filter(item => item.label == editingFarm.framAreaUnit)
            .find(item => {
              if (item.label == editingFarm.frmAreaUnit) {
                return item.value;
              }
            }),
        },
      ]);
      // console.log(editingFarm.frmAreaUnit, '0000000000000');
    }
  };

  useEffect(() => {
    setEditingValueMethod();
    // console.log('hello');

    // console.log(editingFarm);
  }, [editingFarm, editingProduct]);
  useEffect(() => {
    returnDropDownValue();

    // console.log(editingFarm);
  }, [editingProduct, editingValue, data, editBreedType]);

  const returnDropDownValue = () => {
    // if (areaType) {
    //   setSelectedItem(agriType);
    //   // return areaType;
    //   console.log('selected this', areaType);
    // }
    if (editingValue) {
      return editingValue[0].value;
    }
    if (editingProduct && agriType) {
      return editingProduct.ProdFarmTypeID;
    }
    if (editingProduct && editBaliType) {
      return editingProduct.ProdCropID;
    }
    if (editingProduct && editBreedType) {
      return editingProduct.BreedId;
    }
  };

  return (
    <View
      style={[
        styles.container,
        createUser && {width: width * 0.73},
        AddressForm && {
          width: width * 0.45,
          // marginLeft: 'auto',
          // marginRight: 'auto',
          marginLeft: 10,
        },
        ProfessionForm && {width: width * 0.73},
      ]}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: 'green', color: 'black'},
          createUser && {
            width: width * 0.73,
          },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={{color: 'black'}}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'चयन गर्नुहोस्' : '...'}
        searchPlaceholder="खोज्नुहोस्..."
        value={returnDropDownValue()}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onSelect(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginLeft: -1,

    // padding: 16,
    margin: 8,
    color: 'black',
    width: '100%',
  },
  dropdown: {
    height: 40,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
    // paddingHorizontal: 8,
    color: 'black',
  },
  icon: {
    marginRight: 5,
    color: 'black',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'grey',
    paddingLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 10,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
});
