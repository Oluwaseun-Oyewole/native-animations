import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../custom/text";

const items = [
  {
    name: "John Doe",
    username: "johndoefgvhbjnkml,;.fc gvbhjnk",
    email: "johndoe@example.com",
  },
  { name: "Jane Smith", username: "janesmith", email: "janesmith@example.com" },
  { name: "Alice Johnson", username: "alicej", email: "alicej@example.com" },
  { name: "Bob Brown", username: "bobb", email: "bobb@example.com" },
  {
    name: "Charlie Davis",
    username: "charlied",
    email: "charlied@example.com",
  },
  { name: "Daisy Miller", username: "daisym", email: "daisym@example.com" },
  { name: "Edward Wilson", username: "edwardw", email: "edwardw@example.com" },
  { name: "Fiona Clark", username: "fionac", email: "fionac@example.com" },
  { name: "George Evans", username: "georgee", email: "georgee@example.com" },
  { name: "Hannah Wright", username: "hannahw", email: "hannahw@example.com" },
  { name: "Ian King", username: "ianking", email: "ianking@example.com" },
  { name: "Julia Scott", username: "julias", email: "julias@example.com" },
  { name: "Kevin Harris", username: "kevinh", email: "kevinh@example.com" },
  { name: "Laura Lee", username: "laural", email: "laural@example.com" },
  {
    name: "Michael Walker",
    username: "michaelw",
    email: "michaelw@example.com",
  },
  { name: "Nancy Hall", username: "nancyh", email: "nancyh@example.com" },
  { name: "Oscar Young", username: "oscary", email: "oscary@example.com" },
  {
    name: "Patricia Allen",
    username: "patriciaa",
    email: "patriciaa@example.com",
  },
  { name: "Quincy Turner", username: "quincyt", email: "quincyt@example.com" },
  { name: "Rachel Adams", username: "rachela", email: "rachela@example.com" },
];

const ScrollViewAnimation = () => {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    ref.current?.scrollToIndex({
      animated: true,
      index,
      viewPosition: position,
      viewOffset: 10,
    });
  }, [index, position]);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        ref={ref}
        initialScrollIndex={index}
        // onScrollToIndexFailed={() => setIndex(20)}
        data={items}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{
          paddingLeft: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity onPress={() => setIndex(fIndex)}>
              <View
                style={[
                  styles.scroll_view,
                  { backgroundColor: fIndex === index ? "red" : "white" },
                ]}
              >
                <CustomText>{item.username}</CustomText>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
          alignItems: "center",
          padding: 50,
        }}
      >
        <View>
          <CustomText>Scroll index</CustomText>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <TouchableOpacity onPress={() => setPosition(0)}>
              <CustomText>backward</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPosition(0.5)}>
              <CustomText>middle</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPosition(1)}>
              <CustomText>front</CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <CustomText>Navigation</CustomText>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <TouchableOpacity
              onPress={() => {
                if (index) return setIndex((prev) => prev - 1);
              }}
            >
              <CustomText>backward</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (index > items.length) return;
                setIndex((prev) => prev + 5);
              }}
            >
              <CustomText>Forward</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ScrollViewAnimation;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  scroll_view: {
    marginRight: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "yellow",
    borderRadius: 12,
    backgroundColor: "white",
  },
});
