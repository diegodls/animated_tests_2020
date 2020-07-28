import React from 'react';
import styled from 'styled-components';
import ReloadButtonStyled from '../ReloadButtons/ReloadButtonStyled';
import DragDropComponent from './DragDropComponent';

const BACKGROUND_COLOR = '#0b0b0d';

const DragDropScreen = () => {
  /* START - COMPONENTS STUFF */

  const StatusBar = styled.StatusBar``;

  const Container = styled.SafeAreaView`
    flex: 1;   
    background-color: ${BACKGROUND_COLOR};
  `;
  /* END - COMPONENTS STUFF */

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={BACKGROUND_COLOR} />
      <ReloadButtonStyled />
      <Container>
        <DragDropComponent />        
      </Container>
    </>
  )
};
export default DragDropScreen;

