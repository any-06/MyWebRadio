import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as linking from 'expo-linking';
import { Audio } from 'expo-av';
import { useState } from 'react';
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import AppLoading from 'expo-app-loading';

// https://commealaradio.out.airtime.pro/commealaradio_a
// https://radio.dekpo.com/stream.mp3

const AUDIO_STREAM = "https://radio.dekpo.com/stream.mp3";

const callLink = () => {
  linking.openURL("tel:0606060607");
}

const mailLink = () => {
  linking.openURL("mailto:anyou.6@gmail.com");
}

const Contact = () => {
  return(
    <View>
      <Text>Page Contact</Text>
    </View>
  )
}

export default function App() {
 
  const [sound, setSound] = useState(null);
  const [page, setPage] = useState("Home");

  const [fontLoaded] = useFonts({
    Ubuntu_400Regular
  });
  if (!fontLoaded) {
    return <AppLoading />
  }

  const homeLink = () => {
    setPage("Home");
  }

  async function playSound() {

    if (sound === null) {
      const { sound } = await Audio.Sound.createAsync(
        {uri: AUDIO_STREAM}
      )
      
      setSound(sound);
      sound.playAsync();
    }
    else
    {
      setSound(null);
      sound.stopAsync();
    }

  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={ homeLink }>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
          <Text>My Web Radio</Text>
        <Ionicons name="person" size={24} color="black" />
      </View>

      {
        ( () => {
          switch (page) {
            case "Contact":
              return <Contact/>
          
            case "Home":
              console.log("Tu es dedans");
              return (
                <ImageBackground source={require("./assets/music-note.jpg")} style={styles.content}>
                  <View>
                    <TouchableOpacity onPress={ playSound }>
                      <Ionicons name={ sound === null ? "play-circle" : "pause-circle"} size={240} color="#7400b8" />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              )
          
            default:
              break;
          }
        } )()
      }

      <View style={styles.footer}>
        <TouchableOpacity onPress={ callLink }>
          <Ionicons name="call" size={24} color="black" />
        </TouchableOpacity>
        <Ionicons name="logo-instagram" size={24} color="black" />
        <TouchableOpacity onPress={ 
          () => {
            setPage("Contact");
          } 
        }>
          <Ionicons name="mail" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 100,
    backgroundColor: '#e3f2fd',
    borderBottomColor: "#000",
    borderBottomWidth: 3,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  content: {
    backgroundColor: "#90caf9",
    flex: 5,
    padding: 20,
    textAlign: "center",
    justifyContent: "center"
  },
  footer: {
    height: 100,
    backgroundColor: "#90caf9",
    borderTopColor: "#000",
    borderTopWidth: 3,
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 20
  }
});
