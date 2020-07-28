import React, { useRef } from 'react';
import styled from 'styled-components';
import { State } from 'react-native-gesture-handler';
import Animated, { cond, eq, } from 'react-native-reanimated';
import IconFA from 'react-native-vector-icons/FontAwesome'


const SliderComponent = (props) => {

    const state = useRef(props.state).current;
    const ICON_SIZE = props.size;

    /* START - ANIMATION STUFF */

    
    const opacityINACTIVE = cond(eq(state, State.ACTIVE), 0, 1); //necessário colocar os dois elementos sobrepostos e quanto o state muda, o de cima fica invisivel
    const opacityACTIVE = cond(eq(state, State.ACTIVE), 1, 0); //necessário colocar os dois elementos sobrepostos e quanto o state muda, o de cima fica invisivel
    /* END - ANIMATION STUFF */

    /* START - COMPONENTS STUFF */

    const IconContainer = styled.View`
    width: ${ICON_SIZE}px;
    height: ${ICON_SIZE}px;  
    position: absolute;
    /* left:0;
    right: 0;
    top: 0;
    bottom: 0; */
`;
    const AnimatedIconContainer = Animated.createAnimatedComponent(IconContainer);

    /* END - COMPONENTS STUFF */


    return (
        <>
            <AnimatedIconContainer  style={{ opacity: opacityINACTIVE }}>
                <IconFA name={'star'} size={ICON_SIZE} />
            </AnimatedIconContainer>
            <AnimatedIconContainer style={{ opacity: opacityACTIVE }}>
                <IconFA name={'star'} size={ICON_SIZE} color={'#fc3a52'} />
            </AnimatedIconContainer>
        </>
    )
};
export default SliderComponent;

