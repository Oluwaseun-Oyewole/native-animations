import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CustomText from "../custom/text";

const CardComponent = ({
  index,
  progress,
}: {
  index: number;
  progress: SharedValue<number>;
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            progress.value,
            [index - 1, index, index + 1],
            [0.96, 1, 1]
          ),
        },
        {
          translateY: interpolate(
            progress.value,
            [index - 1, index, index + 1],
            [-22, 0, 300 + 22],
            { extrapolateRight: Extrapolation.CLAMP }
          ),
        },
      ],
      opacity: interpolate(
        progress.value,
        [index - 1, index, index + 1],
        [1 - 1 / 8, 1, 1]
      ),
      //   zIndex: -index,
    };
  });

  return (
    <Animated.View
      key={index}
      style={[
        styles.card,
        {
          zIndex: -index,
        },
        animatedStyles,
      ]}
    >
      <CustomText>{index}</CustomText>
    </Animated.View>
  );
};

const LearnAnimation = () => {
  const arrays = new Array(6).fill({});
  const activeIdex = useSharedValue(0);
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      if (activeIdex.value > arrays.length) {
        activeIdex.value = withTiming(activeIdex.value - 1, { duration: 500 });
      }

      //   if (activeIdex.value === arrays.length) return;
      activeIdex.value = withTiming(activeIdex.value - 1, { duration: 500 });
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      if (activeIdex.value > arrays.length) {
        activeIdex.value = withTiming(activeIdex.value - 1, { duration: 500 });
      }

      //   if (activeIdex.value === arrays.length) return;
      activeIdex.value = withTiming(activeIdex.value + 1, { duration: 500 });
    });

  return (
    <>
      <StatusBar hidden />
      <GestureDetector gesture={Gesture.Exclusive(flingUp, flingDown)}>
        <View style={styles.container}>
          {new Array(5).fill({}).map((_, index) => {
            return (
              <CardComponent key={index} index={index} progress={activeIdex} />
            );
          })}
        </View>
      </GestureDetector>
    </>
  );
};

export default LearnAnimation;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: {
    height: 300,
    backgroundColor: "#fff",
    aspectRatio: 3 / 4,
    borderRadius: 15,
    borderCurve: "continuous",
    shadowColor: "#cccccc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#b9b9b9",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
