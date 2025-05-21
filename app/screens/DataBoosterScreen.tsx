import DataBoosterSliderCard from '@components/organisms/DataBoosterSliderCard';
import DataUsageCard from '@components/organisms/DataUsageCard';
import { MotiView } from 'moti'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Easing } from 'react-native-reanimated';

const DATABOOSTERS = [{
    id: "booster_1gb",
    value: 1,
    valueUnit: 'GB',
    price: 20,
    vat: 0.8,
    priceUnit: 'AED',
    validity: 24,
    validityUnit: 'Hours'
}, {
    id: "booster_2gb",
    value: 2,
    valueUnit: 'GB',
    price: 30,
    vat: 1.2,
    priceUnit: 'AED',
    validity: 2,
    validityUnit: 'Days'
}, {
    id: "booster_5gb",
    value: 5,
    valueUnit: 'GB',
    price: 50,
    vat: 2,
    priceUnit: 'AED',
    validity: 5,
    validityUnit: 'Days'
},
{
    id: "booster_10gb",
    value: 10,
    valueUnit: 'GB',
    price: 90,
    vat: 3.6,
    priceUnit: 'AED',
    validity: 15,
    validityUnit: 'Days'
}
]

export default function DataBoosterScreen({used, bought}:any) {
    //const { isLoading, uiData, simulateLoading } = useAPI();
    const [addon, setAddon] = useState(0);

    return (
       
            
                <MotiView className='flex flex-1 w-full'
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
                    <View className='flex-1 items-center justify-center gap-16'>
                        <DataUsageCard total={bought + addon} value={used} unit='GB' />
                        <DataBoosterSliderCard onSubmit={(v)=>setAddon(v)} dataset={DATABOOSTERS} />
                    </View>

                </MotiView>
        
    )
}
