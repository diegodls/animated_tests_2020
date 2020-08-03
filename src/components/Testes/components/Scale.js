/* eslint-disable react-native/no-inline-styles */
//este efeito é melhor utilizado em listas fixas, uma vez que a lista é atualizada a cada adição.

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  concat,
  interpolate,
  multiply,
  round,
  set,
  useCode,
  Value,
} from 'react-native-reanimated';
import {ReText, timing} from 'react-native-redash';

import ClickEffect from './ClickEffect';

const Scale = ({item, index}) => {
  //FUNCTIONS
  function click() {
    Alert.alert(`Opa = ${index}`, 'Olha esse dedo ai!');
  }

  //ANIMATION STUFF

  const progress = new Value(0);

  const text = concat(round(multiply(progress, 100)));

  const scale = interpolate(progress, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.05, 1],
  });

  useCode(() => set(progress, timing({duration: 500 + index * 100})), [
    progress,
  ]);

  return (
    <ClickEffect>
      <Animated.View
        key={item.id}
        style={{
          alignItems: 'center',
          transform: [{scale}],
        }}>
        <TouchableWithoutFeedback onPress={click}>
          <View style={styles.container}>
            <View style={styles.idContainer}>
              <Text style={styles.idText}>{item.id}</Text>
              <ReText text={text} style={styles.progressText} />
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>Nome: {item.nome}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </ClickEffect>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
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
    paddingLeft: 10,
  },
  progressText: {
    color: '#FFF',
  },
});

export default Scale;
