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
import ClickEffect from './components/ClickEffect';

//MY CONST

let renderCount = 0;

const Testes = () => {
  //STATE AND CONST
  const [arrayTeste, setArrayTeste] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const {register, handleSubmit, setValue} = useForm();

  //USE_EFFECTS

  // useEffect(() => {
  //   let quant = 5;
  //   let tempArray = [];

  //   for (let i = 0; i <= quant; i++) {
  //     tempArray.push({
  //       id: i,
  //       nome: 'A',

  //     });
  //   }
  //   setArrayTeste(tempArray);
  //   setLoaded(true);
  // }, []);

  useEffect(() => {
    register('firstName');
  }, [register]);

  //FUNCTIONS
  function onSubmit(data) {
    let lastID = 0;

    if (arrayTeste.length > 0) {
      lastID = arrayTeste[arrayTeste.length - 1].id + 1;
    }

    setArrayTeste([
      ...arrayTeste,
      {
        id: lastID,
        nome: data.firstName,
      },
    ]);
    setLoaded(true);
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
          </View>
          <ClickEffect>
            <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Salvar</Text>
              </View>
            </TouchableWithoutFeedback>
          </ClickEffect>
        </View>
        <Text style={styles.renderCount}>Renders: {renderCount}</Text>
        {loaded && (
          <FlatList
            style={styles.flatlist}
            contentContainerStyle={styles.flatlistContent}
            data={arrayTeste}
            keyExtractor={(item, _) => String(item.id)}
            renderItem={({item, index}) => (
              <Scale key={item.id} item={item} index={index} />
            )}
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
  },
  inputContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 10,
  },
  textInput: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#FEFDFD',
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 60,
    borderRadius: 8,
    borderColor: '#040408',
    backgroundColor: '#E11905',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FEFDFD',
  },
  flatlist: {
    flex: 1,
    width: '100%',
  },
  flatlistContent: {},
  renderCount: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#E11905',
    bottom: 10,
  },
});

export default Testes;
