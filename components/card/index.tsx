import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import CustomText from "../custom/text";

const Card = ({
  index,
  progress,
}: {
  index: number;
  progress: SharedValue<number>;
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, index * 25]);

    const translateY = interpolate(progress.value, [0, 1], [0, index * 5]);

    const rotate = interpolate(
      progress.value,
      [0, 1],
      [-index * 15, index * 5]
    );
    return {
      transform: [{ translateX }, { translateY }, { rotate: `${rotate}deg` }],
    };
  });

  return (
    <Animated.View
      key={index}
      style={[
        styles.card,
        {
          zIndex: -index,
          //   transform: [{ rotate: `${-index * 15}deg` }],
          //   transform: [
          //     { rotate: `${index * 10}deg` },
          //     { translateX: index * 25 },
          //     { translateY: -index * 5 },
          //   ],
          //   transform: [
          //     { translateX: 0 },
          //     { translateY: 0 },
          //     { rotate: `${-index * 15}deg` },
          //   ],
        },
        animatedStyles,
      ]}
    >
      <CustomText>{index}</CustomText>
    </Animated.View>
  );
};
const CardAnimation = () => {
  const pan = Gesture.Tap();
  const cards = new Array(4).fill({});
  const progress = useSharedValue(0);

  return (
    <GestureHandlerRootView>
      <StatusBar hidden />
      <View
        style={styles.container}
        onTouchStart={() => {
          progress.value = withSpring(1, { mass: 2 });
        }}
        onTouchEnd={() => {
          progress.value = withTiming(0, { duration: 500 });
        }}
      >
        {/* <GestureDetector gesture={pan}> */}
        {cards?.map((_, index) => {
          return <Card key={index} index={index} progress={progress} />;
        })}
        {/* </GestureDetector> */}
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: 200,
    backgroundColor: "#fff",
    aspectRatio: 3 / 4,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "#cccccc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#b9b9b9",
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CardAnimation;
