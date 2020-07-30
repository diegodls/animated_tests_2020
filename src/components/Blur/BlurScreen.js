import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
  Image,
} from 'react-native';

//MY imports
import SliderComponent, {value} from '../Slider/SliderComponent';

//MY CONST

const BACKGROUND_COLOR = '#DCDCDC';
const image_post_1 = require('../../Object/imgs/image_post_1.jpeg');

const Opacity = () => {

  const [blur, setBlur] = useState(0);

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={BACKGROUND_COLOR} />
      <View style={styles.container}>
        <View style={styles.imageContainer} blurRadius={10}>
          <Image blurRadius={blur} source={image_post_1} style={styles.image} />
        </View>
        <View style={styles.sliderContainer}>
          <SliderComponent onPress={setBlur} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    //paddingTop: Platform.OS == 'ios' ? 35 : 0,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  sliderContainer:{
    position: 'absolute',
    bottom:0,
  }
});

export default Opacity;

