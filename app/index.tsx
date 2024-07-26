import CardAnimation from "@/components/card";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const NativeAnimation = () => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(2);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: progress.value * 50,
      transform: [
        { scale: scale.value },
        { rotate: `${progress.value * 2 * Math.PI}rad` },
      ],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(1), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <CardAnimation />
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  styles__text: { fontFamily: "PoppinsMedium" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
  },
});

export default NativeAnimation;
