import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  concat,
  divide,
  Extrapolate,
  interpolate,
  multiply,
  round,
  set,
  useCode,
  Value,
} from 'react-native-reanimated';
import {delay, ReText, timing} from 'react-native-redash';

const Scale = ({index, item}) => {
  //FUNCTIONS
  function click() {
    Alert.alert(`Opa = ${index}`, 'Olha esse dedo ai!');
  }

  //ANIMATION STUFF

  const progress = new Value(0);

  const text = concat(round(multiply(progress, 100)));

  const scale = interpolate(progress, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.1, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(() => set(progress, timing({duration: 500})), [progress]);

  return (
    <>
      <Animated.View
        style={{
          alignItems: 'center',
          transform: [{scale}],
        }}>
        <TouchableWithoutFeedback onPress={click}>
          <View style={styles.container}>
            <View style={styles.idContainer}>
              <Text style={styles.idText}>{index}</Text>
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>Progress</Text>
              <ReText text={text} style={styles.progressText} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#040408',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  idContainer: {
    backgroundColor: '#E11905',
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  idText: {    
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFF',
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressText: {
    color: '#FFF',
  },
});

export default Scale;
