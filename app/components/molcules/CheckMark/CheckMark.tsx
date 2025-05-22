import Icon from '@react-native-vector-icons/lucide'
import { View } from 'moti'
import React from 'react'

export default function CheckMark() {
  return (
   <View className="items-center justify-center">
      
      {/* Popping pulse background */}
      <View
        from={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{
          type: 'timing',
          duration: 500,
        }}
        className="absolute bg-white w-28 h-28 rounded-full"
      />

      {/* Main circle pop-in */}
      <View
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          damping: 10,
          stiffness: 100,
        }}
        className="rounded-full w-28 h-28 bg-white/60 items-center justify-center"
      >
        {/* Check icon reveal */}
        <View
          from={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 400,
            delay: 200,
          }}
        >
          <Icon name="check" size={40} color={'#322E2B'} />
        </View>
      </View>
    </View>
  )
}
