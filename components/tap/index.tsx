import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const TapAnimation = () => {
  const tapGesture = Gesture.Tap();
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <GestureDetector gesture={tapGesture}>
          <Animated.View style={[styles.animated_shape]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default TapAnimation;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  animated_shape: {
    backgroundColor: "red",
    height: 100,
    width: 100,
    borderRadius: 20,
  },
});
