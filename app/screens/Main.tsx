import React, { useReducer } from 'react'
import { Text as RNText, TouchableHighlight, View } from 'react-native'
import ChatInput from '../components/organisms/ChatInput'
import { AnimatePresence, MotiText, MotiView } from 'moti'
import { Stagger } from '@animatereactnative/stagger'
import Text from '../components/atoms/Text'
import { VortexSphere } from '../components/molcules/VortexSphere'
import { Easing, FadeInDown, FadeOutDown, ZoomInEasyDown } from 'react-native-reanimated'

export default function MainScreen() {


    const [isBusy, toggleIsBusy] = useReducer((s) => !s, false);

    return (
        <View className='flex flex-1 relative' >
            <AnimatePresence exitBeforeEnter>
                {isBusy &&
                    <MotiView key="screen-loading" className="flex p-8 flex-1 justify-center"
                        from={{
                            opacity: 0,
                            scale: 1.2,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.2,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 500,
                            easing: Easing.out(Easing.quad), // Fast to slow transition
                        }}
                    >
                        <VortexSphere />
                    </MotiView>
                }

                {!isBusy &&
                    <MotiView className='flex flex-1 w-full p-8 justify-center'
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
                            duration: 500,
                            easing: Easing.out(Easing.quad), // Fast to slow transition
                        }}
                    >

                        <MotiText className='text-2xl'>Hello,</MotiText>
                        <MotiText className='text-4xl font-bold'>I'm James</MotiText>

                    </MotiView>}

            </AnimatePresence>
<TouchableHighlight onPress={toggleIsBusy}><Text>X</Text></TouchableHighlight>
            <ChatInput />

        </View>
    )
}
