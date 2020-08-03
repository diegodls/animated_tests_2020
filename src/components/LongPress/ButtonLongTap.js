/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import CircularProgressComponent from '../CircularProgress/CircularProgressComponent';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Animated, {
  useCode,
  cond,
  eq,
  call,
  block,
} from 'react-native-reanimated';
import {mix} from 'react-native-redash';

IconEntypo.loadFont();

const ButtonLongTap = ({progress, rd, bg, fg, stroke_w}) => {
  const [isActive, setIsActive] = useState(false);

  const ICON_SIZE = (rd * 2) / 2 / 2;
  const RADIUS = rd - stroke_w;
  const CENTER = RADIUS / 2 - ICON_SIZE / 2;
  const height = mix(progress, 0, ICON_SIZE);

  // useCode(() =>
  //     cond(eq(progress, 1), call([], () => setIsActive(true)), [progress]),
  // );

  useCode(
    () =>
      block[
        cond(
          eq(progress, 1),
          call([], () => setIsActive(true)),
        )
      ],
    [progress],
  );

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <CircularProgressComponent
        rd={rd / 2}
        bg={bg}
        fg={fg}
        stroke_w={stroke_w}
        {...{progress}}
      />
      <View
        style={{
          zIndex: 2,
          position: 'absolute',
          width: RADIUS,
          height: RADIUS,
          borderRadius: RADIUS / 2,
          backgroundColor: fg,
        }}>
        <IconEntypo
          name={isActive ? 'check' : 'fingerprint'}
          size={ICON_SIZE}
          color={isActive ? bg : '#CECECE'}
          style={{
            top: CENTER,
            left: CENTER,
          }}
        />
        <Animated.View
          style={{
            height: height,
            width: ICON_SIZE,
            top: CENTER,
            left: CENTER,
            position: 'absolute',
            overflow: 'hidden',
          }}>
          <IconEntypo
            name={'fingerprint'}
            size={isActive ? 0 : ICON_SIZE}
            color={bg}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default ButtonLongTap;
