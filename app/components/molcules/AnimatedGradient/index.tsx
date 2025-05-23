import { useWindowDimensions, } from 'react-native';

import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import { getBiasedRandomColor, getRandomColor } from '../../../utils';
import { useEffect } from 'react';

const AnimatedGradient = () => {
    const { width, height } = useWindowDimensions();

    const topColor = useSharedValue('#DDCAB0');
    //const middleColor = useSharedValue('#FFEBDB');
    const bottomColor = useSharedValue('#FFEBDB');

    const colors = useDerivedValue(() => {
        return [topColor.value, bottomColor.value];
    }, []);

    // useEffect(() => {

    //     setInterval(() => {
    //         topColor.value = withTiming(getBiasedRandomColor([
    //             { r: 221, g: 202, b: 176 },
    //             { r: 221, g: 202, b: 176 },
    //             { r: 223, g: 227, b: 204 },
    //             { r: 224, g: 192, b: 180 },
    //         ]), { duration: 2000 });

    //         bottomColor.value = withTiming(getBiasedRandomColor([
    //             { r: 255, g: 235, b: 219 },
    //             { r: 255, g: 235, b: 219 },
    //             { r: 249, g: 241, b: 232 },
    //             { r: 251, g: 246, b: 241 },

    //         ]), { duration: 2000 });

    //     }, 4000)
    // }, [])
    return (
        <>
            <Canvas style={{ flex: 1, opacity: 1 }} >
                <Rect x={0} y={0} width={width} height={height}>
                    <LinearGradient
                        start={vec(0, 0)}
                        end={vec(width, height)}
                        colors={['#FFEBDB', '#DDCAB0']}
                    />
                </Rect>
            </Canvas>

        </>
    );
};

export default AnimatedGradient;
