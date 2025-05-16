import Icon from '@react-native-vector-icons/lucide';
import { AnimatePresence, MotiView, SafeAreaView } from 'moti';
import React, { useEffect, useReducer, useState } from 'react'
import { Text, Touchable, TouchableOpacity, useWindowDimensions, View, TextInput } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, interpolate, runOnJS } from 'react-native-reanimated'

export default function ChatInput() {

    const [isOpen, toggleOpen] = useReducer((s) => !s, false);
    
    const animatedValue = useSharedValue(0); // Initial value
    const _bgStyle = useAnimatedStyle(() => {
        return {
            transform:
                [
                    { perspective: 400 },
                    { scale: interpolate(animatedValue.value, [0, 100], [1, 35]) },
                    { translateX: `${interpolate(animatedValue.value, [0, 100], [0, -20])}%` },
                    { translateY: `${interpolate(animatedValue.value, [0, 100], [0, -25])}%` },
                    //{ rotateY: `${interpolate(animatedValue.value, [0, 100], [0, -45])}deg` },

                ],
            opacity: interpolate(animatedValue.value, [0, 100], [1, .95])
        }
    })


    useEffect(() => {
        if (isOpen) {
            animatedValue.value = withTiming(100, { duration: 600, easing: Easing.bezier(0.96, -0.08, 0.25, 0.96), });
        }
        else {
            animatedValue.value = withTiming(0, { duration: 600, easing: Easing.bezier(0.96, -0.08, 0.25, 0.96), });
        }
    }, [isOpen]);

    const swipeGesture = Gesture.Pan()
        .onEnd((event) => {
          if (event.translationY > 50 && event.velocityY > 500) {
            console.log('Swiped Down!');
            // Your function here
            runOnJS(toggleOpen)()
          }
        });
    return (

        <>

            <View className='flex items-center justify-center p-12 relative z-10'>
                <View className='relative'>
                    <Animated.View className='w-20 h-20 bg-black rounded-full' style={[_bgStyle]} ></Animated.View>
                    <AnimatePresence>

                        {!isOpen && <MotiView
                            className='absolute w-20 h-20'
                            key="button-on"
                            from={{
                                opacity: 0,
                                translateY: -20,
                            }}
                            animate={{
                                opacity: 1,
                                translateY: 0,
                            }}
                            exit={{
                                opacity: 0,
                                translateY: -20,
                            }}
                            delay={300}
                        >
                            <TouchableOpacity onPress={toggleOpen} activeOpacity={1} className='absolute w-20 h-20 flex items-center justify-center' >
                                <Icon name="command" size={28} color="#FFF6EF" />
                            </TouchableOpacity>
                        </MotiView>}

                        {isOpen && <MotiView
                            className='absolute w-20 h-20'
                            key="button-submit"
                            from={{
                                opacity: 0,
                                translateY: -20,
                            }}
                            animate={{
                                opacity: 1,
                                translateY: 0,
                            }}
                            exit={{
                                opacity: 0,
                                translateY: -20,
                            }}
                            delay={300}
                        >
                            <TouchableOpacity onPress={toggleOpen} activeOpacity={1} className='absolute w-20 h-20 flex items-center justify-center' >
                                <Icon name="arrow-right" size={28} color="#FFF6EF" />
                            </TouchableOpacity>
                        </MotiView>}
                    </AnimatePresence>


                </View>
            </View>
            <AnimatePresence>

                {isOpen && <MotiView
                    className=' absolute w-20 h-20 z-20 right-0 top-16'
                    key="button-off"
                    from={{
                        opacity: 0,
                        translateY: 10,
                    }}
                    animate={{
                        opacity: 1,
                        translateY: 0,
                    }}
                    exit={{
                        opacity: 0,
                        translateY: 10,
                    }}
                    transition={{
                        type: 'timing',
                        delay: 300,
                    }}
                    exitTransition={{
                        type: 'timing',
                        delay: 0,
                    }}
                >
                    <TouchableOpacity onPress={toggleOpen} activeOpacity={1} className='absolute w-20 h-20 flex items-center justify-center' >
                        <Icon name="x" size={28} color="#FFF6EF" className='' />
                    </TouchableOpacity>
                </MotiView>}

                {isOpen && <MotiView className={`absolute w-full h-4/5 z-10`}
                    key={"chat-overlay"}
                    from={{
                        opacity: 0,
                        translateY: 20,
                    }}
                    animate={{
                        opacity: 1,
                        translateY: 0,
                    }}
                    exit={{
                        opacity: 0,
                        translateY: 20,
                    }}
                    transition={{
                        type: 'timing',
                        delay: 500,
                    }}
                    exitTransition={{
                        type: 'timing',
                        delay: 0,
                        duration: 200,
                    }}
                >
                    <GestureDetector gesture={swipeGesture}>
                    <SafeAreaView className='flex-1'>
                        <View className='px-8 py-16'>
                            <TextInput multiline placeholderTextColor='#ECDCC9' placeholder='Ask anything...' className='text-[#ECDCC9] text-4xl w-full h-full' />
                        </View>
                    </SafeAreaView>
                    </GestureDetector>
                    
                </MotiView>}
            </AnimatePresence>

        </>
    )
}
