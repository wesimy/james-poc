import Button from '@components/atoms/Button'
import DynamicRenderer from '@components/organisms/DynamicRenderer'
import { useAPI } from '@context/APIProvider'
import React from 'react'
import { View } from 'react-native'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function DynamicScreen() {
  const { uiData, storeData, submitRequest, initSession } = useAPI();
  // const insets = useSafeAreaInsets();
  // const { height } = useWindowDimensions();

  return (
    <View className='flex-1 justify-center'>
      {Boolean(uiData) &&
        
          <DynamicRenderer
            componentData={uiData}
            parentProps={{
              storeData,
              handleSubmit: submitRequest
              // Add any other functions or props you want to make available to dynamic components
            }}
          />


      }

      {
        !Boolean(uiData) &&
        <>
        <Button title='+12345678' onPress={initSession} />
        <Button title='+1234567' onPress={initSession} />
        </>
      }
    </View>
  )
}
