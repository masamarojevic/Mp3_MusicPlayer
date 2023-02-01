import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//tracks
const songs = [
  {
    name: "Umek",
    source: require("../assets/umek.mp3"),
    image: require("../assets/umek.jpg"),
  },
  {
    name: "Infinite",
    source: require("../assets/infinite.mp3"),
    image: require("../assets/infinite.jpg"),
  },
  {
    name: "Electronic Guest",
    source: require("../assets/electronicGuest.mp3"),
    image: require("../assets/electronicGuest.jpg"),
  },
];

export default function Songs() {
  const navigation = useNavigation();

  // function to navigate to Music.js and to display the chosen track in front
  function handleClick(index) {
    navigation.navigate("Music", { currentSongIndex: index });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.picture} source={require("../assets/vinyl.jpg")} />
      </View>

      <Text style={styles.text}>Your Songs:</Text>

      <View style={styles.orangeSquare}>
        <View style={{ top: 20 }}>
          {/* list displaying all the songs  */}
          <FlatList
            data={songs}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleClick(index)}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "600",
                    textDecorationLine: "underline",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
  },

  header: {
    height: 100,
    width: "80%",
    borderRadius: 50,
    left: 43,
    top: 50,
  },
  picture: { height: 100, width: 310, borderRadius: 30 },
  text: { fontSize: 20, fontWeight: "900", color: "white", top: 140, left: 50 },
  orangeSquare: {
    height: "40%",
    width: "80%",
    backgroundColor: "#c16a64",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    left: 38,
    top: 150,
  },
});
