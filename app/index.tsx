import CustomText from "@/components/custom/text";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const handleRotation = (progress: SharedValue<number>) => {
  "worklet";
  return `${progress.value * 2 * Math.PI}rad`;
};
const NativeAnimation = () => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(2);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: progress.value * 50,
      transform: [
        { scale: scale.value },
        { rotate: handleRotation(progress.value) },
      ],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(1), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomText>NativeAnimation</CustomText>
      <Animated.View
        style={[
          { height: 50, width: 50, backgroundColor: "red" },
          animatedStyles,
        ]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  styles__text: { fontFamily: "PoppinsMedium" },
});

export default NativeAnimation;
