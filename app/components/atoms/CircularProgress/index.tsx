import { AnimatedCircularProgress, AnimatedCircularProgressProps } from 'react-native-circular-progress';

import React from 'react'


export default function CircularProgress(props: AnimatedCircularProgressProps) {
    return (
        <AnimatedCircularProgress
            {...props}
            lineCap="round"
            rotation={0}
            tintColor="rgba(255,255,255,.5)"
            backgroundColor="rgba(255,255,255,.2)"
            
        />
    )
}
