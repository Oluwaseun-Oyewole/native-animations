import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const CustomText = ({ children, ...rest }: PropsWithChildren & TextProps) => {
  return (
    <Text {...rest} style={styles.styles_text}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  styles_text: { fontFamily: "PoppinsMedium" },
});
export default CustomText;
