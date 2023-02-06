import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Agriculture = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'खेती दर्ता',
      image: require('../../Assets/FarmImages/Farm.png'),
      navigateTo: 'FarmRegistration',
    },
    {
      id: 2,
      name: 'कृषि बजार',
      image: require('../../Assets/FarmImages/market.png'),
      navigateTo: 'TopNavigationKrishiBazzar',
    },
    {
      id: 4,
      name: 'खर्च / बिक्री ट्र्याकिंग',
      image: require('../../Assets/FarmImages/Expenses.png'),
      navigateTo: 'Agriculture',
    },
    // {
    //   id: 3,
    //   name: 'बीमा सेवाहरू',
    //   image: require('../../Assets/FarmImages/healthcare.png'),
    //   navigateTo: 'Agriculture',
    // },
    {
      id: 5,
      name: 'JTA संचार',
      image: require('../../Assets/FarmImages/JTA.png'),
      navigateTo: 'Queries',
    },
  ];

  return (
    <View>
      <Text style={styles.titleTxt}>कृषि सम्बन्धित सेवाहरू</Text>
      {data.map(item => {
        return (
          <TouchableOpacity
            style={styles.itemStyle}
            key={item.id}
            onPress={() => navigation.navigate(item.navigateTo)}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={[
                {width: 34, height: 34, tintColor: 'green', fontWeight: 'bold'},
              ]}
            />
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Agriculture;

const styles = StyleSheet.create({
  titleTxt: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
    // textAlign: 'center',
    marginTop: 20,
    marginBottom: 18,
    marginLeft: 10,
  },
  itemStyle: {
    backgroundColor: '#d4d4d4',
    padding: 20,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    // left: 10,
    // borderRadius: 10,
  },
  itemText: {
    fontSize: 15,
    color: 'black',
    marginLeft: 15,
  },
});
