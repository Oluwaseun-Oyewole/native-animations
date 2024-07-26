import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const size = 100;
const COLORS = ["#000", "#333", "#FF0000", "#00FF00"];

const GestureAnimation = () => {
  const colorIndex = useSharedValue(0);
  const tapping = Gesture.Tap().onEnd(() => {
    if (colorIndex.value > COLORS.length) {
      colorIndex.value = colorIndex.value % 1 === 0 ? 1 : colorIndex.value % 1;
    }
    colorIndex.value = withTiming(Math.ceil(colorIndex.value + 1), {
      duration: 200,
    });
  });

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      colorIndex.value,
      [0, ...COLORS?.map((_, index) => index + 1), COLORS.length + 1],
      [COLORS[COLORS.length - 1], ...COLORS, COLORS[0]]
    ),
  }));

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GestureDetector gesture={tapping}>
          <Animated.View style={[styles.square, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default GestureAnimation;

const styles = StyleSheet.create({
  container: { flex: 1 },
  square: {
    width: size,
    height: size,
    backgroundColor: "green",
    borderRadius: 50,
  },
});
