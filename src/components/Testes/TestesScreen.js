import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';

import {useForm} from 'react-hook-form';

//MY IMPORTS
import ReloadButton from '../ReloadButtons/ReloadButton';
import Scale from './components/Scale';

//MY CONST

let renderCount = 0;

const Testes = () => {
  //STATE AND CONST
  const [arrayTeste, setArrayTeste] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const {register, handleSubmit, setValue} = useForm();

  //USE_EFFECTS

  useEffect(() => {
    let quant = 5;
    let tempArray = [];

    for (let i = 0; i <= quant; i++) {
      tempArray.push({
        id: i,
        nome: 'A',
        sobreNome: 'A',
      });
    }
    setArrayTeste(tempArray);
    setLoaded(true);
  }, []);

  useEffect(() => {
    register('firstName');
    register('lastName');
  }, [register]);

  //FUNCTIONS
  function onSubmit(data) {
    const lastID = arrayTeste[arrayTeste.length - 1].id;
    setArrayTeste([
      ...arrayTeste,
      {
        id: lastID + 1,
        nome: data.firstName,
        sobreNome: data.lastName,
      },
    ]);
  }

  renderCount++;

  return (
    <>
      <ReloadButton />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Nome'}
              style={styles.textInput}
              onChangeText={(text) => setValue('firstName', text)}
            />
            <TextInput
              placeholder={'Sobrenome'}
              style={styles.textInput}
              onChangeText={(text) => setValue('lastName', text)}
            />
          </View>
          <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Salvar</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.renderCount}>Renders: {renderCount}</Text>
        {loaded && (
          <FlatList
            style={styles.flatlist}
            contentContainerStyle={styles.flatlistContent}
            data={arrayTeste}
            keyExtractor={(item, _) => String(item.id)}
            renderItem={({item, index}) => <Scale key={item.id} item={item} index={index} />}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 35 : 0,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: 140,
    flexDirection: 'row',
    marginBottom: 5,
    //backgroundColor: '#F0C'
  },
  inputContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 10,
    // backgroundColor: '#CF0'
  },
  textInput: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    //borderWidth: 1,
    borderColor: '#040408',
    backgroundColor: '#FEFDFD',
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: '100%',
    borderRadius: 8,
    borderColor: '#040408',
    backgroundColor: '#E11905',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FEFDFD',
    bottom: 10,
  },
  flatlist: {
    flex: 1,
    width: '100%',
    //backgroundColor: '#F0C',
  },
  flatlistContent: {
    //backgroundColor: '#0FC',
  },
  renderCount: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#E11905',
    bottom: 10,
  },
});

export default Testes;
