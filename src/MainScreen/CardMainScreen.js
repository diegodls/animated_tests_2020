import React, { useState, useRef } from 'react';
import { Dimensions } from 'react-native'
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  interpolate,
  Value,
  useCode,
  cond,
  eq,
  block,
  sub,
  divide,
  call,
  Easing,
} from 'react-native-reanimated';

import {
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

import {
  onGestureEvent,
  timing,
} from 'react-native-redash';

const CardMainScreen = (props) => {
  const [item] = useState(props.item);
  const [pairOrOdd] = useState(props.pairOrOdd);
  const COLOR = pairOrOdd ? `#e30092` : `#fc3a52`;
  const navigation = useNavigation();
  const CARD_WIDTH = Dimensions.get('screen').width;
  const CARD_HEIGHT = 200;
  const CIRCLE_RADIUS = CARD_HEIGHT - 50;

  /* START ANIMATION STUFF */

  const tapState = useRef(new Value(State.UNDETERMINED)).current;
  const tapFocal = useRef({ x: new Value(0), y: new Value(0) }).current;

  const tapGestureHandler = onGestureEvent({
    state: tapState,
    x: tapFocal.x,
    y: tapFocal.y
  });

  const translateX = cond(eq(tapState, State.END), sub(tapFocal.x, divide(CIRCLE_RADIUS, 2)));
  const translateY = cond(eq(tapState, State.END), sub(tapFocal.y, divide(CIRCLE_RADIUS, 2)));

  const transition = cond(eq(tapState, State.END), timing({
    duration: 500,
    from: 0,
    to: 1,
    easing: Easing.linear,
  }));

  const scale = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 3]
  });

  const opacity = interpolate(transition, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 0]
  });

  useCode(() => block([
    cond(
      eq(tapState, State.END),
      call([],
        () => (navigation.navigate(`${item.navigation}`))
      )
    ),
  ]), [tapState]);

  /* END ANIMATION STUFF */

  /* START - COMPONENTS STUFF */


  const CardShape = styled.View`
    width: ${(CARD_WIDTH * 95) / 100}px;
    height: ${CARD_HEIGHT}px;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;    
    elevation: 5;    
    background-color: ${ pairOrOdd ? `#000000` : `#050505`} ;  
    overflow: hidden;
  `;

  const CardShapeAnimated = Animated.createAnimatedComponent(CardShape);

  const BgEffect = styled.View`
    background-color: ${COLOR};
    width: ${CIRCLE_RADIUS}px;
    height: ${CIRCLE_RADIUS}px;
    border-radius: ${CIRCLE_RADIUS / 2}px;    
  `;
  const BgEffectAnimated = Animated.createAnimatedComponent(BgEffect);

  const TextShape = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  `;

  const Title = styled.Text`
    font-size: 40px;
    font-weight: bold;    
    color: ${COLOR} ;
    
  `;

  const SubTitle = styled.Text`
      font-size: 20px;
      font-weight: bold;    
      color: ${COLOR} ;    
  `;

  /* END - COMPONENTS STUFF */

  return (
    <TapGestureHandler {...tapGestureHandler}>
      <CardShapeAnimated>
        <BgEffectAnimated style={{
          opacity,
          transform: [
            { translateX },
            { translateY },
            { scale }
          ]
        }} />
        <TextShape>
          <Title>{item.title}</Title>
          <SubTitle>{item.subTitle}</SubTitle>
        </TextShape>
      </CardShapeAnimated>
    </TapGestureHandler>
  )
};
export default CardMainScreen;

