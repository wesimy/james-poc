import Text from '@components/atoms/Text';
import { useAPI } from '@context/APIProvider';
import Icon from '@react-native-vector-icons/lucide';
import { Formik, FormikProps } from 'formik';
import { AnimatePresence, MotiView, SafeAreaView } from 'moti';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { TouchableOpacity, View, TextInput } from 'react-native'
import { Flow } from 'react-native-animated-spinkit';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, interpolate, runOnJS } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatInput() {

    const { isLoading, storeData, submitRequest } = useAPI();

    const formikRef = useRef<FormikProps<{ message: string }> | null>(null);
    const insets = useSafeAreaInsets();
    const [isOpen, toggleOpen] = useState(false);

    const animatedValue = useSharedValue(0); // Initial value
    const animatedLoadingValue = useSharedValue(0);


    const _bgStyle = useAnimatedStyle(() => {
        return {
            transform:
                [
                    { perspective: 400 },
                    { scale: interpolate(animatedValue.value, [0, 100], [1, 35]) },
                    { translateX: `${interpolate(animatedValue.value, [0, 100], [0, -20])}%` },
                    { translateY: `${interpolate(animatedValue.value, [0, 100], [0, -25])}%` },
                ],
            opacity: interpolate(animatedValue.value, [0, 100], [1, .95])
        }
    })

    // const _containerStyle = useAnimatedStyle(() => {
    //     return {
    //         transform:
    //             [
    //                 { translateY: `${interpolate(animatedLoadingValue.value, [0, 100, 50], [0, -500, 0])}%` },
    //                 { scale: interpolate(animatedLoadingValue.value, [0, 100, 50], [1, 1, 30]) },
    //             ],
    //     }
    // })

    useEffect(() => {
        if (isLoading) {
            toggleOpen(false);
            animatedLoadingValue.value = withTiming(100, { duration: 400, easing: Easing.bezier(0.96, -0.08, 0.25, 0.96), });
        }
        else {
            animatedLoadingValue.value = withTiming(0, { duration: 400, easing: Easing.bezier(0.96, -0.08, 0.25, 0.96), });
        }
    }, [isLoading])

    useEffect(() => {
        if (isOpen) {
            animatedValue.value = withTiming(100, { duration: 400, easing: Easing.bezier(0.96, -0.08, 0.25, 0.96), });
        }
        else {
            animatedValue.value = withTiming(0, { duration: 400, easing: Easing.bezier(0.96, -0.08, 0.25, 0.96), });
        }
    }, [isOpen]);

    const swipeGesture = Gesture.Pan()
        .onEnd((event) => {
            if (event.translationY > 50 && event.velocityY > 500) {
                console.log('Swiped Down!');
                // Your function here
                runOnJS(toggleOpen)(false)
            }
        });

    return (
        <>
            <View className='flex items-center justify-center p-12 relative'>
                <Animated.View className='relative'>
                    <Animated.View className='w-20 h-20 bg-dark rounded-full' style={[_bgStyle]} ></Animated.View>
                    <AnimatePresence>
                        {(isLoading) ?
                            <MotiView
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
                                    translateY: 20,
                                }}
                                delay={200}
                            >
                                <TouchableOpacity onPress={() => { toggleOpen(false) }} activeOpacity={1} className='absolute w-20 h-20 flex items-center justify-center' >
                                    <Flow size={32} color='#FFF6EF' />
                                </TouchableOpacity>
                            </MotiView>
                            :
                            <>
                                {(!isOpen) &&
                                    <MotiView
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
                                            translateY: 20,
                                        }}
                                        delay={200}
                                    >
                                        <TouchableOpacity onPress={() => { toggleOpen(true) }} activeOpacity={1} className='absolute w-20 h-20 flex items-center justify-center' >
                                            <Icon name="keyboard" size={28} color="#FFF6EF" />
                                        </TouchableOpacity>
                                    </MotiView>
                                }

                                {(isOpen) &&
                                    <MotiView
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
                                            translateY: 20,
                                        }}
                                        delay={200}
                                    >
                                        <TouchableOpacity onPress={() => formikRef.current?.handleSubmit()} activeOpacity={1} className='absolute w-20 h-20 flex items-center justify-center' >
                                            <Icon name="arrow-right" size={28} color="#FFF6EF" />
                                        </TouchableOpacity>
                                    </MotiView>
                                }
                            </>
                        }
                    </AnimatePresence>
                </Animated.View>
            </View>

            <AnimatePresence>
                {isOpen && <MotiView
                    className={`absolute flex w-12 h-12  right-6 items-center justify-center z-20`}
                    style={{ marginTop: insets.top, marginRight: insets.right }}
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
                    <TouchableOpacity onPress={() => { toggleOpen(false) }} activeOpacity={1} className={`flex items-center justify-center`} >
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
                        <View className='flex-1' style={{ paddingTop: insets.top }}>

                            <Formik
                                innerRef={formikRef}
                                initialValues={{ message: '' }}
                                onSubmit={submitRequest}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values }) => (
                                    <View className='px-8 py-16'>
                                        <TextInput
                                            onChangeText={(text) => {
                                                if (text.endsWith('\n')) {
                                                    handleSubmit();
                                                } else {
                                                    handleChange('message')(text);  // Formik update
                                                    storeData('message', values.message)
                                                }
                                            }}
                                            onBlur={handleBlur('message')}
                                            value={values.message}
                                            //onSubmitEditing={() => handleSubmit()}
                                            multiline={true}
                                            placeholderTextColor='#fffcf7'
                                            placeholder='Ask anything...'
                                            style={{
                                                textAlignVertical: 'top',
                                            }}

                                            className='text-[#fffcf7] text-4xl w-full max-h-full' />
                                    </View>
                                )}
                            </Formik>
                        </View>
                    </GestureDetector>

                </MotiView>}
            </AnimatePresence>
        </>
    )
}
