import React from 'react';
import {
    Text,
    View,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    className?: string;
    textClassName?: string;
    loading?: boolean
}

const Button: React.FC<CustomButtonProps> = ({ loading = false, title, onPress, style, textStyle, textClassName = 'text-light', className = 'bg-dark' }) => {
    const classNames = `px-8 py-4 items-center justify-center ${className && className}`
    const textClassNames = `text-lg font-medium ${textClassName && textClassName}`
    const content = (
        <View className={classNames} style={[style]}>
            {loading ? <View className='h-6 flex items-center justify-center'><Flow color='#322E2B' size={24} /></View> : <Text className={textClassNames} style={[textStyle]}>{title}</Text>}
        </View>
    );

    return (
        <View className='overflow-hidden rounded-full relative' style={{ elevation: className.includes('bg-transparent') ? 0 : 4 }}>
            {
                Platform.OS === 'android' ?
                    <TouchableNativeFeedback onPress={onPress} style={{ borderRadius: '100%' }}>
                        {content}
                    </TouchableNativeFeedback>
                    :
                    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                        {content}
                    </TouchableOpacity>
            }
        </View>
    )
};



export default Button;
