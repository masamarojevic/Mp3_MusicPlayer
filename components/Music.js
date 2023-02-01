import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { SongContext } from "./context";

import { StyleSheet } from "react-native";

export default function Music() {
  const { playlist, setPlaylist, playlistName, setPlaylistName } =
    useContext(SongContext);

  const navigation = useNavigation();

  const [sound, setSound] = useState();
  const [status, setStatus] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showTextInput, setShowTextInput] = useState(false);

  //function to create a playlist
  async function createPlaylist() {
    if (playlistName) {
      setPlaylist((playlist) => [
        ...playlist,
        { name: playlistName, songs: [] },
      ]);
    }
  }

  //function to delete a playlist
  function deletePlaylist(index) {
    setPlaylist((playlist) => {
      let newPlaylist = [...playlist];
      newPlaylist.splice(index, 1);
      return newPlaylist;
    });
  }

  //   tracks
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

  //function to play the track
  async function playSound() {
    if (sound) {
      await sound.stopAsync();
      if (position) {
        await sound.setPositionAsync(position);
        await sound.playAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(true);
    }
  }

  //function to pause the track
  async function pauseSound() {
    if (sound) {
      const status = await sound.getStatusAsync();
      setPosition(status.positionMillis);
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  //stop the track
  async function stopSound() {
    await sound.stopAsync();
    setIsPlaying(false);
    setPosition(0);
  }

  // function to skip next track
  async function next() {
    setIsPlaying(false);
    if (currentSongIndex === songs1.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
    setPosition(0);
  }

  //function for previous track
  async function prev() {
    setIsPlaying(false);
    if (currentSongIndex === 0) {
      setCurrentSongIndex(songs1.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
    setPosition(0);
  }
  // useEffect for loading the sound
  useEffect(() => {
    async function loadSound() {
      if (!isPlaying) {
        const { sound } = await Audio.Sound.createAsync(
          songs1[currentSongIndex].source
        );
        setSound(sound);
      }
    }
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSongIndex, isPlaying]);

  // useEffect updating the status
  useEffect(() => {
    async function getStatus() {
      try {
        const status = await sound.getStatusAsync();
        setStatus(status);
      } catch (e) {
        console.log(e);
      }
    }
    if (sound) {
      getStatus();
      const intervalId = setInterval(getStatus, 500);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [sound]);

  return (
    <View style={styles.container}>
      {/* the plus icon  */}
      <TouchableOpacity
        onPress={() => {
          setShowTextInput(true);
        }}
      >
        <View style={styles.plusSquare}>
          <Image
            style={styles.plusIcon}
            source={require("../assets/plus.png")}
          />
        </View>
      </TouchableOpacity>

      {/* conditional operator for entering textinput */}
      {showTextInput && (
        <TextInput
          style={styles.textInput}
          placeholder="    Enter playlist name"
          onChangeText={(text) => setPlaylistName(text)}
          onSubmitEditing={() => [
            createPlaylist(),
            //createPlaylist(),
            // setPlaylistName(""),
            setShowTextInput(false),
          ]}
        />
      )}

      {/* PLAYLIST */}
      <View style={styles.orangeFlatList}>
        <Text style={styles.textPlay}>Your Playlist:</Text>

        {/* flatlist for displaying the playlist */}
        <FlatList
          data={playlist}
          keyExtractor={(item) => Date.now() + "" + Math.random()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Playlist", {
                  playlist: item,
                });
              }}
            >
              <View style={{ top: 5, height: 40 }}>
                {/* purple squares  */}
                <View style={styles.purpleCont}>
                  {/* text inside purple square  */}
                  <Text style={styles.purpleText}>{item.name}</Text>
                  <TouchableOpacity onPress={() => deletePlaylist(index)}>
                    <Image
                      style={styles.minusIcon}
                      source={require("../assets/remove.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ICONS */}

      <View style={styles.fucntionalIcons}>
        <TouchableOpacity onPress={prev}>
          <Image
            style={styles.rewind}
            source={require("../assets/rewind.png")}
          />
        </TouchableOpacity>

        {/* conditional operator for showing the pause icon */}
        {status && status.isPlaying ? (
          <TouchableOpacity onPress={pauseSound}>
            <Image
              style={styles.pause}
              source={require("../assets/pause.png")}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={playSound}>
            <Image style={styles.play} source={require("../assets/play.png")} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={stopSound}>
          <Image style={styles.stop} source={require("../assets/stop.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={next}>
          <Image style={styles.next} source={require("../assets/next.png")} />
        </TouchableOpacity>
      </View>

      {/* IMAGES */}

      <Image
        style={styles.currentSong}
        source={songs1[currentSongIndex].image}
      />
      <Image
        style={styles.previousSong}
        source={
          songs1[(currentSongIndex - 1 + songs1.length) % songs1.length].image
        }
      />
      <Image
        style={styles.nextSong}
        source={songs1[(currentSongIndex + 1) % songs1.length].image}
      />

      <StatusBar style="auto" />
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
  plusSquare: {
    backgroundColor: "#c16a64",
    height: 80,
    width: 100,
    top: 430,
    left: 100,
    borderRadius: 15,
  },
  plusIcon: {
    width: 46,
    height: 46,
    tintColor: "white",
    alignSelf: "center",
    top: 15,
  },
  textInput: {
    backgroundColor: "white",
    height: 40,
    width: 150,
    top: 220,

    borderRadius: 15,
  },
  orangeFlatList: {
    height: 200,
    width: 180,
    backgroundColor: "orange",
    top: 250,
    right: 80,
    borderRadius: 30,
    flexDirection: "column",
  },
  textPlay: { fontSize: 17, fontWeight: "600", left: 18, top: 5 },
  purpleCont: {
    backgroundColor: "#ab7fb5",

    height: 30,
    width: 180,
    borderRadius: 30,
  },
  purpleText: {
    fontSize: 18,
    fontWeight: "500",
    left: 10,
    top: 3,
  },
  minusIcon: {
    width: 20,
    height: 20,
    bottom: 19,
    left: 120,
    tintColor: "white",
  },
  fucntionalIcons: {
    flexDirection: "row",
    marginTop: 50,
    position: "relative",
    justifyContent: "center",
    bottom: 120,
  },
  rewind: { width: 50, height: 50, tintColor: "#c16a64", right: 10 },
  pause: {
    width: 50,
    height: 50,
    tintColor: "#B2EBF2",
    right: 5,
  },
  play: {
    width: 50,
    height: 50,
    tintColor: "#B2EBF2",
    right: 5,
  },
  stop: {
    width: 52,
    height: 52,
    tintColor: "#80CBC4",
    fontWeight: "600",
  },
  next: { width: 50, height: 50, tintColor: "#ab7fb5", left: 10 },

  currentSong: {
    width: 200,
    height: 200,
    borderRadius: 180,
    position: "absolute",
    top: 80,
    left: "50%",
    transform: [{ translateX: -100 }],
  },
  previousSong: {
    width: 150,
    height: 150,
    position: "absolute",
    borderRadius: 180,
    zIndex: -1,
    left: 20,
    top: 140,
    opacity: 0.7,
  },
  nextSong: {
    width: 150,
    height: 150,
    position: "absolute",
    borderRadius: 180,
    zIndex: -1,
    right: 20,
    top: 140,
    opacity: 0.7,
  },
});
