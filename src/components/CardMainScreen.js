import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

const CardMainScreen = (props) => {
  const [item] = useState(props.item);
  const [pairOrOdd] = useState(props.pairOrOdd);
  const navigation = useNavigation();

  /* START - COMPONENTS STUFF */
  const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

  const CardShape = styled.View`
    width: 95%;
    height: 200px;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    elevation: 5;    
    background-color: ${ pairOrOdd ? `#000000` : `#050505`} ;
  `;

  const Title = styled.Text`
    font-size: 40px;
    font-weight: bold;    
    color: ${ pairOrOdd ? `#e30092` : `#fc3a52`} ;
    
  `;
  const SubTitle = styled.Text`
      font-size: 20px;
      font-weight: bold;    
      color: ${ pairOrOdd ? `#e30092` : `#fc3a52`} ;    
    `;
  /* END - COMPONENTS STUFF */

  return (
    <TouchableWithoutFeedback onPress={() => { navigation.navigate(`${item.navigation}`) }}>
      <CardShape>
        <Title>{item.title}</Title>
        <SubTitle>{item.subTitle}</SubTitle>
      </CardShape>
    </TouchableWithoutFeedback>
  )
};
export default CardMainScreen;

