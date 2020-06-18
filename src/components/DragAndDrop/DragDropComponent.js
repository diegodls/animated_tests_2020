import React, { useState } from 'react';
import { StatusBar } from 'react-native'
import styled from 'styled-components';
import Animated, { useCode, block, cond, eq } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { usePanGestureHandler, withDecay, withOffset, diffClamp, timing, mix, withTransition } from 'react-native-redash';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const radius = 200;

const DragDropComponent = () => {

  /* START - COMPONENTS STUFF */

  const CardShape = styled.View`
    width: ${radius}px;
    height: ${radius}px;
    border-radius: ${radius / 2}px;
    background-color: #050505;   
    justify-content: center;
    align-items: center;
    elevation: 5;    
  `;

  const AnimatedCardShape = Animated.createAnimatedComponent(CardShape);

  const Text = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: #fc3a52;
  `;

  const AnimatedText = Animated.createAnimatedComponent(Text);
  /* END - COMPONENTS STUFF */

  /* START - ANIMATION STUFF */

  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
  // const translateY = withOffset(translation.y, state);
  // const translateX = withOffset(translation.x, state);

  //withOffset serve para salvar onde parou o gesto, se não, após soltar o componente, ele reseta os valores.
  //diffClamp serve para limitar até aonde um valor vai, nesse caso os valores de x e y foram limitados para não ultrapassar o tamanho da tela, há a necessidade de remover o tamanho do componente visto que se não, ele vai sair totalmente da tela.
  //withDecay serve para adicionar velocidade no movimento, fazendo-o seguir o trajeto ao qual foi arrastado.

  const translateY = diffClamp(withDecay({
    value: translation.y,
    velocity: velocity.y,
    state
  }), 0, height - radius - StatusBar.currentHeight);

  const translateX = diffClamp(withDecay({
    value: translation.x,
    velocity: velocity.x,
    state
  }), 0, width - radius);

  const zIndex = cond(eq(state, State.ACTIVE), 100, 1);
  const progress = withTransition(eq(state, State.ACTIVE));
  const scale = mix(progress, 1, 1.2);

  const [buttonText, setButtonText] = useState('Drag');

  //useCode(() => block[], [state, translateY, translateX])

  /* END - ANIMATION STUFF */
  return (
    <PanGestureHandler {...gestureHandler}>
      <AnimatedCardShape style={{ zIndex, transform: [{ translateY }, { translateX }, { scale }] }}>
        <AnimatedText>{buttonText}</AnimatedText>
      </AnimatedCardShape>
    </PanGestureHandler>

  )
};
export default DragDropComponent;






