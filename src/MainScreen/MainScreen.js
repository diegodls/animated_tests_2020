import React from 'react';
import { FlatList } from 'react-native'
import styled from 'styled-components';

import { links } from '../Object/links'
import ReloadButtonStyled from '../components/ReloadButtons/ReloadButtonStyled'
import CardMainScreen from './CardMainScreen'

const BACKGROUND_COLOR = '#0b0b0d';

const MainScreen = () => {

  /* START - COMPONENTS STUFF */

  const StatusBar = styled.StatusBar``;

  const Text = styled.Text`
    color: red;
    `;

  const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${BACKGROUND_COLOR};
  `;

  const ItemContainer = styled.View`
    flex:1;
    width: 100%;
    height: 100%;    
    align-items: center;
    justify-content: center;      
`;
  /* END - COMPONENTS STUFF */

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={BACKGROUND_COLOR} />
      <ReloadButtonStyled />
      <Container>
        <Text>Nota: após atualizações, alguns códigos ficaram quebrados, em breve serão corrigidos</Text>
        <FlatList
          style={{ flex: 1, width: '100%' }}
          showVerticalScrollIndicator={false}
          data={links.reverse()}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <ItemContainer>
              <CardMainScreen item={item} pairOrOdd={index % 2 === 0} />
            </ItemContainer>
          )}
        />
      </Container>
    </>
  )
};
export default MainScreen;

//Nota: depois da atualização de alguns módulos, partes dos códigos quebraram, em breve serão corrigidos...