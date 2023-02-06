import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';
import {width} from '../../../Common/WidthAndHeight';
import {
  Divider,
  Drawer,
  FAB,
  Menu,
  Portal,
  Provider,
  Searchbar,
} from 'react-native-paper';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  GetBajarItemByTypeIdApi,
  GetBajarItemTypeApi,
} from '../../../Services/appServices/agricultureService';
import EmptyFarmAfterFetch from '../../../Common/EmptyFarmAfterFetch';
import AddMarketItemModal from './AddMarketItemModal';

const AllItems = ({navigation, route}) => {
  const [searchText, setSearchText] = useState();
  const [items, setItems] = useState();
  const [state, setState] = useState({open: false});
  const [modalVisibility, setModalVisiblity] = useState(false);
  const [itemTypeList, setItemTypeList] = useState();
  const [itemIdList, setItemIdList] = useState();
  console.log(route, 'this route params ');

  useEffect(() => {
    GetBajarItemTypeApi(res => {
      const data = res.map(item => ({label: item.ItemType, value: item.TId}));
      setItemTypeList(data);
    });
  }, []);

  useEffect(() => {
    const data = {
      typeId: route?.params.typeId,
    };

    GetBajarItemByTypeIdApi(data, res => {
      if (res.length > 0) {
        const data = res.map(item => ({label: item.ItemName, value: item.TId}));
        setItemIdList(data);
        setItems(res);
      }
    });
  }, []);

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
          itemTypeList={itemTypeList}
          itemIdList={itemIdList}
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

                  onPress: () => console.log('hello'),
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
              {items ? items.length : 0} उत्पादनहरु
            </Text>
            <Searchbar
              placeholder="खोज.."
              placeholderTextColor={'grey'}
              inputStyle={{
                fontSize: 16,
              }}
              onChangeText={text => setSearchText(text)}
              style={{
                width: width * 0.67,
                height: 40,
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
                items ? styles.itemMainContainer : styles.mainContainerEmpty
              }>
              {!items ? (
                <EmptyFarmAfterFetch message={'कुनै उत्पादन छैन!!!'} />
              ) : (
                items?.map(item => {
                  return (
                    <TouchableOpacity
                      style={styles.eachItem}
                      key={item.id}
                      onPress={() =>
                        navigation.navigate('ItemFullDescription', {
                          item: item.TId,
                        })
                      }>
                      <View style={styles.imageContainer}>
                        <Image
                          style={styles.image}
                          source={require('../../../Assets/Carouselimages/carousel1.jpg')}
                        />
                      </View>
                      <View style={{marginLeft: 10, marginTop: 5}}>
                        <Text style={styles.title}>{item.ItemName}</Text>
                        <Text style={styles.description}>
                          This is the description
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.Price}>रु.1500</Text>
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
    padding: 10,
    paddingHorizontal: 11,
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
    resizeMode: 'contain',
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
    marginBottom: 3,
  },
  description: {
    fontSize: 12,
    color: 'grey',
  },
  Price: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
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
});
