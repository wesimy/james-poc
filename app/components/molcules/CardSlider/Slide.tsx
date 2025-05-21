import { Text, View } from 'moti'
import React, { useEffect } from 'react'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'

type DataBosster = {
    id: string;
    value: number;
    valueUnit: string;
    price: number;
    vat: number;
    priceUnit: string;
    validity: number;
    validityUnit: number;
}

type SlideProps = {
    dataset: DataBosster
}
export default function Slide({ item, index, width, height, scrollX }: any) {


    const _hdStyle = useAnimatedStyle(() => {
        return {
            transform:
                [
                    {
                        //scale: interpolate(scrollX.value, [index - 1, index, index + 1], [1.5, 1, 1.5])
                        translateX: interpolate(scrollX.value, [index - 1, index, index + 1], [30, 0, -30])
                    }
                ],
            opacity: interpolate(scrollX.value, [index - 1, index, index + 1], [0.3, 1, .30])
        }
    })

    const _cardStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollX.value, [index - 1, index, index + 1], [.35, 1, .35])
        }
    })

    return (
        <Animated.View style={[{ width: width, height: height }, _cardStyle]} className='bg-white/30 rounded-xl overflow-hidden' >
            <View className='flex-1 justify-center items-center p-8 gap-6'>
                <View className='gap-2 items-center'>
                    <Text className='text-4xl text-dark font-bold' style={[_hdStyle]}>
                        {item.value}{item.valueUnit}

                    </Text>
                    <Text className='text-dark/50 ' style={[_hdStyle]} >
                        {item.validity} {item.validityUnit}

                    </Text>
                </View>
                <View className='items-center'>
                    <Text className='text-dark text-lg font-bold' style={[_hdStyle]}>
                        {item.price} {item.priceUnit}
                    </Text>
                </View>


            </View>
        </Animated.View>
    )
}
