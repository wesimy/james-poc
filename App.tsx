import "./global.css";

import React from 'react';
import {View} from 'react-native';
import MainScreen from "./app/screens/Main";
import AnimatedGradient from "./app/components/atoms/AnimatedGradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App(): React.JSX.Element {




  return (
    
      <GestureHandlerRootView className="flex flex-1" >
        <View className="flex-1 absolute w-full h-full"><AnimatedGradient /></View>
        <View className="flex-1 absolute w-full h-full"><MainScreen/></View>
      </GestureHandlerRootView>  
      
  );
}

export default App;
