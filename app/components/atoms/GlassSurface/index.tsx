import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { View, ViewProps } from 'react-native'

type GlassSurfaceProps = ViewProps & {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
};


const GlassSurface: React.FC<GlassSurfaceProps> = ({ children, className, mode='light', style, ...rest }) => {
  return (
    <View className={`${className}  rounded-2xl overflow-hidden relative`} style={[style]} {...rest}>
      <BlurView
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,  }}
        blurType={mode}
        blurAmount={20}
        //reducedTransparencyFallbackColor="white"
      />
      {children}
    </View>
  )
}

export default GlassSurface;