import CircularProgress from '@components/atoms/CircularProgress'
import Text from '@components/atoms/Text'
import React from 'react'
import { View } from 'react-native'

type DataUsageProgressProps = {
    total: number;
    value: number;
    unit?: string;
}

export default function DataUsageProgress({ total = 0, value = 0, unit = 'GB' }: DataUsageProgressProps) {
    return (
        <View className='flex items-center justify-center'>
            <View className='absolute flex items-center justify-center'>
                <Text className='font-bold text-4xl'>{value} <Text className='text-2xl'>{unit}</Text></Text>
                <Text className='font-medium text-sm'>OF {total} {unit}</Text>
            </View>
            <CircularProgress
                size={180}
                width={10}
                fill={(value / total) * 100}
            />
        </View>


    )
}