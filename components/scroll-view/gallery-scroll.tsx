import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const api_key = "vpCo8vf36jlRdCCSaL2IneEpcrGZZLaaplTFCTeO0RnFdMif1pno8fhG";
const endpoint =
  "https://api.pexels.com/v1/search/?page=1&per_page=20&query=nature";

const fetchFromPexels = async () => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: api_key,
    },
  });
  const { photos } = await response.json();
  return photos;
};

const image_size = 80;
const GalleryScrollAnimation = () => {
  const [images, setImages] = useState([]);
  const { width, height } = Dimensions.get("window");
  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchFromPexels();
      setImages(images);
    };
    fetchImages();
  }, []);

  const topRef = useRef<FlatList>(null);
  const bottomRef = useRef<FlatList>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = (index: number) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({ animated: true, offset: index * width });

    if (index * (image_size + 10) - image_size / 2 > width / 2) {
      bottomRef?.current?.scrollToOffset({
        animated: true,
        offset: index * (image_size + 10) - width / 2 + image_size / 2,
      });
    } else {
      bottomRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <FlatList
          ref={topRef}
          pagingEnabled
          data={images}
          onMomentumScrollEnd={(ev) => {
            console.log(
              "scroll index -- ",
              Math.floor(ev.nativeEvent.contentOffset.x / width)
            );
            updateActiveIndex(
              Math.floor(ev.nativeEvent.contentOffset.x / width)
            );
          }}
          keyExtractor={(item: any) => item.id.toString()}
          contentContainerStyle={{
            paddingLeft: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => {
            return (
              <View style={{ width, height }}>
                <Image
                  source={{ uri: item.src.portrait }}
                  style={StyleSheet.absoluteFillObject}
                />
              </View>
            );
          }}
        />

        <FlatList
          ref={bottomRef}
          data={images}
          keyExtractor={(item: any) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 10 }}
          style={{
            position: "absolute",
            bottom: image_size,
          }}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => updateActiveIndex(index)}>
                <Image
                  source={{ uri: item.src.portrait }}
                  style={{
                    width: image_size,
                    height: image_size,
                    borderRadius: 12,
                    marginRight: 10,
                    borderWidth: 2,
                    // transform: [{ scale: fIndex == = activeIndex ? 1.3 : 1 }],
                    borderColor:
                      index === activeIndex ? "white" : "transparent",
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

export default GalleryScrollAnimation;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
