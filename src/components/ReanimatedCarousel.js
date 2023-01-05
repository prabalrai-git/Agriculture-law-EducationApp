import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { Button } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

const width = Dimensions.get('window').width;
function ReanimatedCarousel() {
    const images = [{ id: 1, source: require('../Assets/Carouselimages/carousel1.jpg'), title: 'hello' }, { id: 2, source: require('../Assets/Carouselimages/carousel2.jpg'), title: 'hello' }, { id: 3, source: require('../Assets/Carouselimages/carousel3.jpg'), title: 'hello' }, { id: 4, source: require('../Assets/Carouselimages/carousel4.jpg'), title: 'hello' }, { id: 5, source: require('../Assets/Carouselimages/carousel5.jpg'), title: 'hello' }, { id: 6, source: require('../Assets/Carouselimages/carousel6.jpg'), title: 'hello' }]
    return (
        <View style={{ marginTop: 2 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={6000}
                // onSnapToItem={(index,) => console.log('current index:', index)}
                renderItem={({ index, item }) =>

                (
                    <View
                        style={{
                            flex: 1,
                            // borderWidth: 0.5,
                            justifyContent: 'center',
                            // bordercolor: 'black',
                            marginTop: 1.5
                            // borderRadius: 10,


                        }}
                    >
                        <Image source={item.source} style={{ width: width * 0.99, height: width / 1.5 }} />
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.txt}>अझ धेरै हेर्नुहोस्</Text>
                        </TouchableOpacity>

                        {/* <Text style={{ color: 'black' }}>hello</Text> */}
                    </View>
                )


                }
            />
        </View>
    );
}

export default ReanimatedCarousel;


const styles = StyleSheet.create({
    btn: {
        borderWidth: 0.55,
        borderColor: 'white',
        top: -70,
        width: width * 0.33,
        alignSelf: 'center',
        // borderRadius: 10,
        backgroundColor: 'green',
        padding: 1,
        paddingTop: 5,
        paddingBottom: 5,


    },
    txt: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})