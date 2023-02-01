import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SongContext } from "./context";

// TRACKS
const songs1 = [
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

export default function Playlist() {
  const { params } = useRoute();
  const { songs, setSongs, addSongToPlaylist } = useContext(SongContext);

  //checking is the parameter of playlist exist
  useEffect(() => {
    if (params && params.playlist) {
      setSongs(songs);
    }
  }, [setSongs]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Playlist</Text>

      {/* display song added to the playlist */}
      <FlatList
        data={songs}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.flexContainer}>
            <View style={styles.songFlatList}>
              <Text style={styles.flatText}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  setSongs(songs.filter((song) => song.name !== item.name));
                }}
              >
                <Image
                  style={styles.image}
                  source={require("../assets/remove.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.addSongContainer}>
        {/* mapping each song  */}
        {songs1.map((song) => (
          <TouchableOpacity
            key={song.name}
            onPress={() => addSongToPlaylist(song)}
          >
            <Text style={styles.addSongText}>Add {song.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: { color: "white", fontSize: 18, fontWeight: "700" },
  flatText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
  },
  addSongText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
    textDecorationLine: "underline",
  },

  addSongContainer: {
    height: 150,
    width: 200,
    backgroundColor: "#f2cd3a",
    borderRadius: 30,
    justifyContent: "space-evenly",
    bottom: 150,
  },
  songFlatList: {
    height: 30,
    width: 200,
    backgroundColor: "#de5b57",
    borderRadius: 30,
    top: 20,
    flexDirection: "column",
  },
  flexContainer: { height: 60, top: 5, padding: 5, borderRadius: 30 },
  image: { height: 25, width: 25, tintColor: "white", left: 170, bottom: 22 },
});
