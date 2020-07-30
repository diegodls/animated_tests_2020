import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  Platform,
} from 'react-native';

//MY IMPORTS
import ReloadButton from '../ReloadButtons/ReloadButton';
import Scale from './components/Scale';

//MY CONST
let renderCount = 0;

const Testes = () => {
  //STATE
  const array = useState([]);
  const [text, setText] = useState();

  //FUNCTIONS

  // useEffect(() => {
  //   const quant = 15;
  //   for (let i = 0; i < quant; i++) {
  //     array.push(i);
  //   }
  // }, []);

  function populate() {
    const quant = array.length;
    array.push(quant + 1);
  }

  renderCount++;

  return (
    <>
      <ReloadButton />
      <View style={styles.container}>        
        <View style={styles.formContainer}></View>
        <FlatList
          style={styles.flatlist}
          contentContainerStyle={styles.flatlistContent}
          data={array}
          keyExtractor={(index) => String(index)}
          renderItem={({item, index}) => <Scale item={item} index={index} />}
        />
        <Text style={styles.renderCount}>Renders: {renderCount}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderCount:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#E11905',
    bottom: 10,
  },
  formContainer:{

  },
  flatlist: {
    flex: 1,
    width: '100%',
    //backgroundColor: '#F0C',
    paddingTop: Platform.OS === 'ios' ? 45 : 0,
  },
  flatlistContent: {
   //backgroundColor: '#0FC',
  },
});

export default Testes;
