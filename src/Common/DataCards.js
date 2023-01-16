import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const width = Dimensions.get('window').width;

const DataCards = () => {
  const data = [
    {
      id: 1,
      title: 'खेतहरूको कुल संख्या',
      icon: require('../Assets/FarmImages/total.png'),
      number: '१०,०००',
    },
    {
      id: 2,
      title: 'कुल दर्ता फार्महरू',
      icon: require('../Assets/FarmImages/registered.png'),
      number: '४,०००',
    },
    {
      id: 3,
      title: 'कुल दर्ता नभएका खेतहरू',
      icon: require('../Assets/FarmImages/unregistered.png'),
      number: '६,०००',
    },
  ];
  return (
    <View style={styles.mainContainer}>
      {data.map(item => {
        return (
          <TouchableOpacity style={styles.card} key={item.id}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.title}>{item.title}:</Text>
            <Text style={styles.number}>{item.number}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default DataCards;

const styles = StyleSheet.create({
  mainContainer: {
    width: width * 0.95,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  card: {
    width: width * 0.3,
    padding: 10,
    backgroundColor: '#01a16c',
    borderRadius: 6,
    height: 130,
  },
  icon: {
    height: 38,
    width: 38,
    tintColor: 'white',
    alignSelf: 'center',
    marginTop: 5,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  number: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
