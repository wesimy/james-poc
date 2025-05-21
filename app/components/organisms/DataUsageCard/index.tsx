import Text from '@components/atoms/Text'
import DataUsageProgress from '@components/molcules/DataUsageProgress'
import React from 'react'
import { View } from 'react-native'

type DataUsageCardProps = {
    total: number;
    value: number;
    unit?: string;
}
export default function DataUsageCard({total=0, value=0, unit = 'GB'}: DataUsageCardProps) {
    return (
        <View className='w-full items-center justify-center gap-8'>
            <Text className='text-2xl font-semibold'>My Data</Text>
            <DataUsageProgress total={total} value={value}  unit={unit} />
        </View>
    )
}


