import "./global.css";

import React from 'react';
import { View } from 'react-native';
import MainScreen from "./app/screens/Main";
import AnimatedGradient from "./app/components/molcules/AnimatedGradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { APIProvider } from "@context/APIProvider";
import { PortalProvider } from "@gorhom/portal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

function App(): React.JSX.Element {




  return (
    
    <SafeAreaProvider>
      <APIProvider>
      <GestureHandlerRootView className="flex flex-1" >
      <BottomSheetModalProvider>
      <PortalProvider>
        <View className="flex-1 absolute w-full h-full"><AnimatedGradient /></View>
        <View className="flex-1 absolute w-full h-full"><MainScreen /></View>
      </PortalProvider>
      </BottomSheetModalProvider>
      </GestureHandlerRootView>
      </APIProvider>
    </SafeAreaProvider>

  );
}

export default App;
