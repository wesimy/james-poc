import Text from '@components/atoms/Text'
import CheckMark from '@components/molcules/CheckMark'
import React from 'react'
import { View } from 'react-native'

interface SuccessCard {
    message: string;
    title: string;
}
export default function SuccessCard({ message, title }: SuccessCard) {
    return (
        <View className='flex-1 items-center justify-center gap-8 min-h-40'>

            <CheckMark />
            <View className='items-center gap-4 p-4 w-full'>
                <Text className='font-bold text-2xl text-center'>{title}</Text>
                <Text className='p-4'>{message}</Text>
            </View>

        </View>
    )
}
