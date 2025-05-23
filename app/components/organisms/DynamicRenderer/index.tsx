import React from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';

import Text from "@components/atoms/Text";
import Button from "@components/atoms/Button";
import DataBoosterScreen from '@screens/DataBoosterScreen';
import GlassSurface from '@components/atoms/GlassSurface';
import StatefulTextInput from '@components/molcules/StatefulTextInput';
import InvoiceCard from '@components/organisms/InvoiceCard';
import SuccessCard from '@components/organisms/SuccessCard';

// Define the component map type
type ComponentMapType = {
  [key: string]: React.ComponentType<any>;
};

// Define the structure for dynamic component data
interface ComponentData {
  type: string;
  props?: Record<string, any>;
  children?: ComponentData | ComponentData[] | string;
}

// Define props for the DynamicComponentRenderer
interface DynamicComponentRendererProps {
  componentData: ComponentData | string;
  parentProps?: Record<string, any>;
}

// Map of component types to actual React Native components
const ComponentMap: ComponentMapType = {
  InvoiceCard: InvoiceCard,
  FormCard: View,
  View: View,
  Text: Text,
  Button: Button,
  Image: Image,
  TextInput: StatefulTextInput,
  TouchableOpacity: TouchableOpacity,
  DataJourney: DataBoosterScreen,
  SuccessCard: SuccessCard

};

// Helper function to handle actions
const handleAction = (actionName: string, parentProps: Record<string, any>): (() => void) => {
  return () => {
    if (typeof parentProps[actionName] === 'function') {
      parentProps[actionName]();
    } else {
      console.warn(`Action "${actionName}" is not available in parentProps`);
    }
  };
};

const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({ componentData, parentProps = {} }) => {
  if (!componentData) return null;

  // Handle string content directly
  if (typeof componentData === 'string') {
    return <Text>{componentData}</Text>;
  }

  const { type, props = {}, children } = componentData;

  // Get the component from our map
  const Component = ComponentMap[type];

  if (!Component) {
    console.warn(`Component type "${type}" is not supported`);
    return null;
  }

  // Merge props from parent and component definition
  const mergedProps = { ...parentProps, ...props };

  // Handle special props like onPress
  if (props.onPress && typeof parentProps[props.onPress] === 'function') {
    mergedProps.onPress = handleAction(props.onPress, parentProps);
  }

  // // Add parentProps for StatefulTextInput
  if (type === 'TextInput') {
    mergedProps.parentProps = parentProps;
  }

  if (type === 'FormCard') {
    mergedProps.parentProps = parentProps;
    mergedProps.className = 'm-4 rounded-2xl bg-white/30'
  }
  
  if (type === 'Text') {
    mergedProps.parentProps = parentProps;
    mergedProps.className = 'm-4'
  }

  // if  (type === 'View') {

  // }

  // Render component with children
  return (
    <Component  {...mergedProps}>
      {Array.isArray(children)
        ?
        <View className='m-4 gap-6'>
          {children.map((child, index) => (

            <DynamicComponentRenderer
              key={index}
              componentData={child}
              parentProps={parentProps}
            />

          ))
          }
        </View>
        : children
          ?

          <DynamicComponentRenderer
            componentData={children}
            parentProps={parentProps}
          />


          : null
      }
    </Component>
  );
};

export default DynamicComponentRenderer;
