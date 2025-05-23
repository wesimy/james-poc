import { Image, useWindowDimensions, View, } from 'react-native';


const Backdrop = () => {
    const { width, height } = useWindowDimensions();

    return (
        <View >
           <Image source={require('@assets/PNG/backdrop.png')} 
           style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
        />
        </View>
    );
};

export default Backdrop;
