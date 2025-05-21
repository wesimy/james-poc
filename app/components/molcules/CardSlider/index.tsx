

import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
//import { FlatList } from "react-native-gesture-handler";
import Slide from "./Slide";
import { View } from "moti";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { DataBooster } from "@types";



type SliderProps = {
  dataset: Array<any>;
  onCardPress: (item: DataBooster) => void;
}


export default function CardSlider({ dataset, onCardPress = () => { } }: SliderProps) {

  const { width } = useWindowDimensions();
  const _imageWidth = width * .4;
  const _imageHeight = width * .4;
  const _spacing = 24

  const _scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    _scrollX.value = e.contentOffset.x / (_imageWidth + _spacing)
  })

  return (

    <View className="flex items-center justify-center">

      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        horizontal
        data={dataset}
        decelerationRate="fast"
        snapToInterval={_imageWidth + _spacing}
        keyExtractor={i => i.id}
        renderItem={({ item, index }) => <TouchableOpacity activeOpacity={.7} onPress={() => { onCardPress(item) }}><Slide scrollX={_scrollX} width={_imageWidth} height={_imageHeight} item={item} index={index} /></TouchableOpacity>}
        contentContainerStyle={{ paddingHorizontal: (width - _imageWidth) / 2, gap: _spacing }}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
      />

    </View>

  );
}


