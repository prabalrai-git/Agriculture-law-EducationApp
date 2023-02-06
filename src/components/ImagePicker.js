import {View, Text, StyleSheet, PermissionsAndroid, Image} from 'react-native';
import React from 'react';
import {SegmentedButtons} from 'react-native-paper';
import {useState} from 'react';
import {width} from '../Common/WidthAndHeight';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {use} from 'i18next';
import {useEffect} from 'react';

const ImagePicker = ({setImageValueQuery, setLalPurjaImage}) => {
  const [image, setImage] = useState();
  const [value, setValue] = useState();

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
    maxWidth: 1080,
    maxHeight: 701,
    // includeBase64: true,
  };

  // useEffect(() => {
  //   console.log(image, 'this si the image uri selected');
  // }, [image]);

  const clearAllStates = () => {
    if (setImageValueQuery) {
      setImageValueQuery();
    }
    setImage();

    setValue();
    if (setLalPurjaImage) {
      setLalPurjaImage();
    }
  };

  const OpenCamera = async () => {
    // console.log('pressed')
    // setCameraImage(result.assets[0].base64);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        console.log('this is the uri', result);
        clearAllStates();

        const result = await launchCamera(options);
        if (setLalPurjaImage) {
          setLalPurjaImage(result.assets[0]);
        }
        if (setImageValueQuery) {
          setImageValueQuery(result.assets[0]);
          // console.log(result.assets[0], 'hello world');
        }
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const OpenGallery = async () => {
    // console.log('pressed')
    try {
      const result = await launchImageLibrary(options);
      console.log('this is the uri', result);

      clearAllStates();
      console.log('this is the uri', result);
      if (setLalPurjaImage) {
        // console.log(
        //   'helllo  from lalprja selection11111111111111111111111',
        //   result.assets[0],
        // );
        setLalPurjaImage(result.assets[0]);
      }
      if (setImageValueQuery) {
        setImageValueQuery(result.assets[0]);
      }
      setImage(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View style={[styles.eachContainer, {marginTop: 10}]}>
        <Text style={styles.label}>
          {setLalPurjaImage ? 'लालपुर्जा फोटो अपलोड' : 'फोटो अपलोड'}:
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View>
            <SegmentedButtons
              value={value}
              onValueChange={setValue}
              style={{marginTop: 10, width: width * 0.5, marginLeft: 12}}
              buttons={[
                {
                  value: 'gallery',
                  label: 'Gallery',
                  onPress: OpenGallery,
                  icon: 'image-multiple',
                },
                {
                  value: 'camera',
                  label: 'Camera',
                  onPress: OpenCamera,
                  icon: 'camera',
                },
              ]}
            />
          </View>
          <View>
            {image && <Image source={{uri: image}} style={styles.image} />}
          </View>
        </View>
      </View>
    </>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  label: {
    color: 'black',
    marginLeft: 20,
    // width: width * 0.2,
    fontWeight: '600',
    // alignSelf: 'center',
  },
  eachContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: width * 0.95,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 6,
  },
  image: {
    width: 75,
    height: 55,
    margin: 10,
    borderRadius: 6,
    marginLeft: 14,
    borderWidth: 0.5,
    borderColor: 'black',
  },
});
