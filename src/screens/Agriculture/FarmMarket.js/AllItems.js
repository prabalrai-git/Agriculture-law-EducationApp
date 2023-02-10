import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {width} from '../../../Common/WidthAndHeight';
import {FAB, Portal, Provider, Searchbar} from 'react-native-paper';
import {useState} from 'react';
import {useEffect} from 'react';
import {GetBajarItemByItemTypeApi} from '../../../Services/appServices/agricultureService';
import EmptyFarmAfterFetch from '../../../Common/EmptyFarmAfterFetch';
import AddMarketItemModal from './AddMarketItemModal';

const AllItems = ({navigation, route}) => {
  const [searchText, setSearchText] = useState();
  const [itemsList, setItemsList] = useState();
  const [state, setState] = useState({open: false});
  const [modalVisibility, setModalVisiblity] = useState(false);
  const [reload, setReload] = useState(false);

  // form states

  useEffect(() => {
    // setItemsList();
    const data = {
      itemtypeId: route?.params.typeId,
    };
    // console.log(data, 'this data');
    GetBajarItemByItemTypeApi(data, res => {
      setItemsList(res);
    });

    // GetBajarItemByTypeIdApi(data, res => {
    //   if (res.length > 0) {
    //     const data = res.map(item => ({label: item.ItemName, value: item.TId}));
    //     setItemsList(res);
    //   }
    // });
  }, [route, reload]);

  const [visible, setVisible] = useState(false);

  const onStateChange = ({open}) => setState({open});
  const {open} = state;
  // const MyComponent = () => {
  //   const openMenu = () => setVisible(true);

  //   const closeMenu = () => setVisible(false);

  //   return (

  //   );
  // };

  return (
    <>
      <Provider>
        <AddMarketItemModal
          setModalVisiblity={setModalVisiblity}
          modalVisibility={modalVisibility}
          setReload={setReload}
          reload={reload}
        />
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            zIndex: 10,
            margin: 0,
            padding: 0,
          }}>
          <Portal>
            <FAB.Group
              fabStyle={{
                backgroundColor: '#4cbb17',
              }}
              open={open}
              visible
              backdropColor="rgba(0,0,0,0.6)"
              icon={open ? 'close' : 'menu'}
              actions={[
                {
                  icon: 'plus',
                  color: 'white',
                  style: {backgroundColor: 'green'},
                  labelTextColor: 'white',
                  label: 'उत्पादन थप्नुहोस्',
                  onPress: () => {
                    setModalVisiblity(true);
                  },
                },
                {
                  icon: 'notebook-multiple',
                  style: {backgroundColor: 'green'},

                  label: 'मेरो उत्पादनहरु',
                  color: 'white',
                  labelTextColor: 'white',

                  onPress: () => navigation.navigate('OwnItems'),
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </View>
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: width,
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: 'white',
              // elevation: 10,
            }}>
            <Text style={styles.itemNumberTxt}>
              कुल उत्पादन: {itemsList ? itemsList.length : 0}
            </Text>
            <Searchbar
              placeholder="खोज्नुहोस्.."
              placeholderTextColor={'grey'}
              inputStyle={{
                fontSize: 12,
                color: 'black',
              }}
              onChangeText={text => setSearchText(text)}
              style={{
                width: width * 0.67,
                height: 35,
                marginLeft: 10,
                marginTop: 10,
                marginRight: 10,
                marginBottom: 10,
                backgroundColor: 'white',
                borderRadius: 5,
              }}
              value={searchText}
            />
          </View>
          <ScrollView>
            <View
              style={
                itemsList ? styles.itemMainContainer : styles.mainContainerEmpty
              }>
              {!itemsList ? (
                <EmptyFarmAfterFetch message={'कुनै उत्पादन छैन!!!'} />
              ) : (
                itemsList?.map(item => {
                  // console.log(
                  //   'https://lunivacare.ddns.net/Luniva360Agri' +
                  //     item.ImageFilePath,
                  // );
                  return (
                    <TouchableOpacity
                      style={styles.eachItem}
                      key={item.KId}
                      onPress={() =>
                        navigation.navigate('ItemFullDescription', {
                          krishiSaleId: item.KId,
                        })
                      }>
                      <View style={styles.imageContainer}>
                        <Image
                          style={styles.image}
                          source={{
                            uri:
                              'https://lunivacare.ddns.net/Luniva360Agri' +
                              item.ImageFilePath,
                          }}
                          defaultSource={require('../../../Assets/FarmImages/fallbackMarket.jpg')}
                        />
                      </View>
                      <View style={{marginLeft: 10, marginTop: 8}}>
                        <Text style={styles.title}>{item.ItemName}</Text>
                        <Text style={styles.description}>
                          {item.ItemDescription.length > 30
                            ? item.ItemDescription.slice(0, 30) + '...'
                            : item.ItemDescription}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: width * 0.4,
                            marginTop: 4,
                          }}>
                          <Text style={styles.Price}>रु.{item.Price}</Text>

                          <Text style={styles.Quantity}>
                            मात्रा: {item.Quantity}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </ScrollView>
        </View>
      </Provider>
    </>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  itemNumberTxt: {
    color: 'white',
    fontSize: 14,
    margin: 10,
    alignSelf: 'center',
    backgroundColor: '#01a16c',
    fontWeight: '600',
    padding: 7,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  itemMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 100,
  },
  mainContainerEmpty: {
    alignItems: 'center',
  },
  eachItem: {
    width: width * 0.466,
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    // alignItems: 'center',
    // elevation: 3,
    borderRadius: 8,
    // paddingHorizontal: 30,
    paddingVertical: 10,
    // paddingLeft: 8,
    paddingTop: 0,
    margin: 6,
  },
  image: {
    width: width * 0.466,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: width * 0.3,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  title: {
    fontWeight: '400',
    fontSize: 16,
    color: 'black',
    marginBottom: 3,
  },
  description: {
    fontSize: 12,
    color: 'grey',
    textAlign: 'justify',
    marginRight: 8,
  },
  Price: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    left: 0,
  },
  // imageContainer: {
  //   width: width * 0.466,
  //   backgroundColor: 'lightgrey',

  //   paddingTop: 30,
  //   paddingBottom: 10,
  //   borderTopStartRadius: 8,
  //   borderTopEndRadius: 8,
  // },
  Quantity: {
    color: 'white',
    fontWeight: '500',
    backgroundColor: '#01a16c',
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});
