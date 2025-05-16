import React from 'react'
import { Text, View } from 'react-native'
import ChatInput from '../components/organisms/ChatInput'
import { SafeAreaView } from 'moti'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

export default function MainScreen() {

    const swipeGesture = Gesture.Pan()
    .onEnd((event) => {
      if (event.translationY > 50 && event.velocityY > 500) {
        console.log('Swiped Down!');
        // Your function here
      }
    });

    return (
        <View className='flex flex-1 relative' >
            <GestureDetector gesture={swipeGesture}>
            <View className='flex flex-1 w-full p-8 justify-center'>
                <Text className='text-2xl font-bold'>Hello, I'm James</Text>
            </View>
            </GestureDetector>

            <ChatInput />

        </View>
    )
}
