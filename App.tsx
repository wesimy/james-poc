import "./global.css";

import React from 'react';
import {View} from 'react-native';
import MainScreen from "./app/screens/Main";
import AnimatedGradient from "./app/components/atoms/AnimatedGradient";

function App(): React.JSX.Element {




  return (
    
      <View className="flex flex-1" >
        <View className="flex-1 absolute z-0 w-full h-full"><AnimatedGradient /></View>
        <View className="flex-1 absolute z-10 w-full h-full"><MainScreen/></View>
      </View>  
      
  );
}

export default App;
