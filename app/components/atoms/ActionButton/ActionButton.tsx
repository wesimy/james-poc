import React from 'react';
import {
    View,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
} from 'react-native';

interface ActionButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    className?: string;
    textClassName?: string;
    children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
    onPress,
    style,
    textStyle,
    className = 'bg-dark',
    children,
}) => {
    const classNames = `px-8 py-4 items-center justify-center ${className}`;
    const content = (
        <View className={classNames} style={[style]}>
            
                {children}
            
        </View>
    );

    return (
        <View className="overflow-hidden rounded-full relative" style={{ elevation: className.includes('bg-transparent') ? 0 : 4 }}>
            {Platform.OS === 'android' ? (
                <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple('#ccc', true)}>
                    {content}
                </TouchableNativeFeedback>
            ) : (
                <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                    {content}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ActionButton;
