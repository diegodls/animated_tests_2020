import React from 'react';
import {State, TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {eq, Value} from 'react-native-reanimated';
import {mix, onGestureEvent, withSpringTransition} from 'react-native-redash';

const Click = ({children}) => {
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({state});
  const progress = withSpringTransition(eq(state, State.BEGAN));
  const scale = mix(progress, 1, 1.2);
  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          transform: [{scale}],
        }}>
        {children}
      </Animated.View>
    </TapGestureHandler>
  );
};
export default Click;
