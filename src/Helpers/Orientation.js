import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
export const screenDimensions = () => {
    const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));
    useEffect(() => {
        const onChange = result => {
            setScreenInfo(result.screen);
        };
        Dimensions.addEventListener('change', onChange);

        return () => Dimensions.removeEventListener('change', onChange);

    }, []);

    return {
        ...screenInfo,
        isPortait: screenInfo.width < screenInfo.height
    };

};