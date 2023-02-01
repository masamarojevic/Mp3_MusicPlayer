import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import Songs from "./components/Songs.js";
import Music from "./components/Music";
import Playlist from "./components/Playlist";
import { useState } from "react";
import { SongContextProvider } from "./components/context.js";

const Stack = createStackNavigator();

export default function App() {
  const [songs, setSongs] = useState([]);

  return (
    <SongContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Songs" component={Songs} />
          <Stack.Screen name="Music">
            {() => <Music songs={songs} setSongs={setSongs} />}
          </Stack.Screen>
          <Stack.Screen name="Playlist">
            {() => <Playlist songs={songs} setSongs={setSongs} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SongContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
