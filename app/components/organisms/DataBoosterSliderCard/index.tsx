import Text from '@components/atoms/Text'
import CardSlider from '@components/molcules/CardSlider'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {View } from 'react-native'
import BottomSheet, { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';
import GlassSurface from '@components/atoms/GlassSurface';
import { DataBooster } from '@types/index';
import Button from '@components/atoms/Button';


type DataBoosterSliderCardProps = {
  dataset: Array<any>;
  onSubmit: (value:number)=>void;
}

export default function DataBoosterSliderCard({ dataset, onSubmit }: DataBoosterSliderCardProps) {

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedBooster, setSelectedBooster] = useState<DataBooster | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSheetDismiss = useCallback(() => {
    setSelectedBooster(null);
  }, []);

  const handleCardPress = useCallback((item: any) => {
    setSelectedBooster(item);
  }, []);

  const handleSimulatePurchase = () => { 
    setIsLoading(true);
    setTimeout(()=>{
      setIsLoading(false);
      onSubmit(selectedBooster? selectedBooster.value: 0);
      bottomSheetModalRef.current?.dismiss();
    },2000)
   }

  useEffect(() => {
    if (selectedBooster) {
      bottomSheetModalRef.current?.present();
    }
  }, [selectedBooster]);


  return (
    <>
      <View className='w-full flex items-center justify-center gap-8'>
        <Text className='text-2xl font-semibold'>Data Packs</Text>
        <CardSlider onCardPress={handleCardPress} dataset={dataset} />
      </View>


      <BottomSheetModal
        handleIndicatorStyle={{ display: 'none' }}
        backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
        ref={bottomSheetModalRef}
        //onChange={handleSheetChanges}
        onDismiss={handleSheetDismiss}

      >
        <GlassSurface mode="dark">
          <BottomSheetView style={{}} className='p-8 gap-8'>

            <View>
              <Text className='text-light font-semibold text-lg'>Data Pack</Text>
            </View>

            <View>
              <Text className='text-light font-bold text-4xl'>{selectedBooster?.value}{selectedBooster?.valueUnit}</Text>
            </View>
            <View>
              <View className='flex-row items-start justify-start flex-row gap-8 '>
                <View className='flex gap-2 border-r border-light pr-12'>
                  <Text className='text-light text-lg'>Cost</Text>
                  <Text className='text-light text-lg font-semibold'>{selectedBooster?.price} {selectedBooster?.priceUnit}</Text>
                </View>

                <View className='flex gap-2  pr-12'>
                  <Text className='text-light text-lg'>Valid for</Text>
                  <Text className='text-light text-lg font-semibold'>{selectedBooster?.validity} {selectedBooster?.validityUnit}</Text>
                </View>
              </View>
            </View>
          
            <View><Text className='text-light'>This pack’s cost and data will be applied on a pro-rata basis.</Text></View>
            <View className='flex-row gap-4'>
              <View className='flex-1 rounded-full'>    
                <Button
                  title='Cancel'
                  onPress={() => { bottomSheetModalRef.current?.dismiss() }}
                  className='bg-transparent'
                  textClassName='text-light'
                />
              </View>

              <View className='flex-1 bg-light rounded-full overflow-hidden'>
                <Button
                  loading={isLoading}
                  title={`Pay ${selectedBooster?.price} ${selectedBooster?.priceUnit}`}
                  onPress={handleSimulatePurchase}
                  className='bg-transparent'
                  textClassName='text-dark'
                />
              </View>
            </View>
          </BottomSheetView>
        </GlassSurface>
      </BottomSheetModal>


    </>
  )
}
