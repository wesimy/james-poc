import React from 'react'
import ChatInput from '../components/organisms/ChatInput'
import { useAPI } from '@context/APIProvider'
import { View } from 'react-native'
import DynamicScreen from '@screens/DynamicScreen'
import { AnimatePresence, MotiText, MotiView } from 'moti'
import Text from '@components/atoms/Text'

import ActionButton from '@components/atoms/ActionButton/ActionButton'
import Icon from '@react-native-vector-icons/lucide';
import SuccessCard from '@components/organisms/SuccessCard'
import { Flow } from 'react-native-animated-spinkit'



export default function MainScreen() {

    const { isLoading, uiData, initSession, sessionId } = useAPI();
    //const insets = useSafeAreaInsets();

    return (
        <View className='flex flex-1 relative' >

            <View className='flex-1 '>

                <AnimatePresence exitBeforeEnter>
                    {
                        (!isLoading && !Boolean(uiData)) &&
                        <MotiView
                            className="flex-1 justify-center p-8 gap-2" key="new"
                            from={{
                                opacity: 0,
                                scale: 1,
                                translateY: 10,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                translateY: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                translateY: 0
                            }}
                        >
                            <MotiText
                                from={{
                                    opacity: 0,
                                    translateY: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    translateY: 0
                                }}
                                delay={0}
                                className='text-2xl'>Hello,</MotiText>
                            <MotiText
                                from={{
                                    opacity: 0,
                                    translateY: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    translateY: 0
                                }}
                                delay={100}
                                className='text-4xl'>I'm <Text className='font-bold'>James</Text></MotiText>
                            <MotiText
                                from={{
                                    opacity: 0,
                                    translateY: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    translateY: 0
                                }}
                                delay={150}
                                className='text-2xl'>How may i help today...</MotiText>
                        </MotiView>
                    }


                    {(!isLoading && Boolean(uiData)) &&
                        <>
                            <MotiView
                                className="flex-1" key="dynamic"
                                from={{
                                    opacity: 0,
                                    scale: 1,
                                    translateY: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    translateY: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    translateY: 0
                                }}
                            >
                                <DynamicScreen />

                            </MotiView>
                        </>
                    }
                    {
                        isLoading &&
                        <>
                            <MotiView
                                className="flex-1 flex-row items-center justify-center" key="loading"
                                from={{
                                    opacity: 0,
                                    scale: 1,
                                    translateY: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    translateY: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    translateY: 0
                                }}
                            >
                                <Text className='font-medium text-lg'>{Boolean(sessionId) ? 'Thinking' : 'Starting Session'}</Text><View className='h-4 mx-2 justify-end'><Flow size={12} /></View>
                            </MotiView>


                        </>
                    }

                </AnimatePresence>

            </View>


            {
                Boolean(sessionId) &&
                <MotiView className='absolute bottom-12'
                    from={{
                        opacity: 0,
                        scale: 1,
                        translateY: 10,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        translateY: 0
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.9,
                        translateY: 0
                    }}
                    delay={200}
                    key='rest-button'
                >
                    <ActionButton onPress={initSession} className='bg-transparent'>
                        <Icon name='history' color="#322E2B" size={32} />
                    </ActionButton>
                </MotiView>
            }

            <ChatInput />
        </View>
    )
}
