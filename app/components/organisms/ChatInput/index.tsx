import React from 'react'
import { Text, Touchable, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, interpolate } from 'react-native-reanimated'

export default function ChatInput() {

    const animatedValue = useSharedValue(0); // Initial value

    const _bgStyle = useAnimatedStyle(() => {
        return {
            transform:
                [
                    { perspective: 400 },
                    { scale: interpolate(animatedValue.value, [0, 100], [1, 35]) },
                    { rotateY: `${interpolate(animatedValue.value, [0, 100], [0, -45])}deg` },
                    { translateX: `${interpolate(animatedValue.value, [0, 100], [0, -20])}%` },
                    { translateY: `${interpolate(animatedValue.value, [0, 100], [0, -25])}%` },

                ],
            opacity: interpolate(animatedValue.value, [0, 100], [1, .9])
        }
    })

    const handlePress = () => {
        animatedValue.value = withTiming(animatedValue.value === 0 ? 100 : 0, { duration: 600, easing: Easing.bezier(0.96, 0.01, 0.25, 0.96), });
    };

    return (
        <>
            <View className='flex items-center justify-center p-8'>
                <TouchableOpacity onPress={handlePress} activeOpacity={1} >
                    <Animated.View className='w-20 h-20 bg-black rounded-full' style={[_bgStyle]} ></Animated.View>
                </TouchableOpacity>
                
            </View>
            {/* <View className='absolute w-full h-screen bg-red-500/50'>

            </View> */}
        </>
    )
}
