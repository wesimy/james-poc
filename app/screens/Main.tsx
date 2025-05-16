import React from 'react'
import { Text, View } from 'react-native'
import ChatInput from '../components/organisms/ChatInput'
import { SafeAreaView } from 'moti'

export default function MainScreen() {
  return (
    <SafeAreaView className='flex flex-1 relative' >
      <View className='flex flex-1 w-full items-center justify-center border-4 border-red-500'>
        <Text className='text-2xl font-bold text-white'>Hello, I'm James</Text>
      </View>
      
        <ChatInput/>
    
    </SafeAreaView>
  )
}
