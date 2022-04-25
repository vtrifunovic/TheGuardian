//import statements
import React, { useState, useEffect } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

//sets two variables, one to check if metronome is turned on and one to see if song is playing
var clicks = 1;
var playing_metronome = false;
var playing_song = false;

// creating consts for our sources, this is passed later to determine what sounds to play
const source1 = require('./2077.mp3');
const source2 = require('./metronome.mp3');
// vars to assign to sounds later, this is how we effectively cut off the sounds
var xsound = undefined;
var ysound = undefined;

const TrainingMenu = ({route, navigation}) => {  
  
  //copying the params over from the previous page
  var {tgl1, tgl2} = route.params;
  // state pair for setting the sound
  const [sound, setSound] = React.useState();

  //this chooses which audio to play and how to kill the audio
  async function playSound(state, file) {
    if (state) {
      try {
        if (file == source1){
          await ysound.stopAsync();
          await ysound.unloadAsync();
          playing_song = false;
        } else {
          await xsound.stopAsync();
          await xsound.unloadAsync();
          playing_metronome = false;
        }
      } catch (e) {
        console.warn(e);
      }
    } else {
      try{
        const {sound} = await Audio.Sound.createAsync(file, {downloadFirst: true});
        setSound(sound);
        await sound.playAsync();
        if (file == source1){
          ysound = sound
        } else {
          xsound = sound;
        }
      } catch (e) {
        console.warn(e)
      }
    }
  }
  //const navigation = useNavigation();
    // initializes our accelerometer array
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    // creating state pair for our accelerometer on and off
    const [subscription, setSubscription] = useState(null);

    // lets us adjust speed of accelerometer
    // this will be later removed when the acc algorithm is written
    const speedtoggle = () => {
      clicks = isNaN(clicks) ? 0 : clicks;
      clicks++;
      if (clicks%2 == 0) {
        Accelerometer.setUpdateInterval(2);
      }
      else{
        Accelerometer.setUpdateInterval(1000);
      }
    };

    // lets us record and save accelerometer data to our previous array
    const _subscribe = () => {
        setSubscription(
        Accelerometer.addListener(accelerometerData => {
            setData(accelerometerData);
        })
        );
    };

    // disconnects accelerometer
    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    // setting xyz to variables from data
    const { x, y, z } = data;
  
    // setting booleans to determine which sounds are playing and which to stop
    if (tgl1 == true && playing_metronome == false) {
      playing_metronome = true;
      playSound(false, source2);
    }
    else if (tgl1 == false && playing_metronome == true){
      playSound(true, source2);
    }
    if (tgl2 == true && playing_song == false) {
      playing_song = true;
      playSound(false, source1);
    }
    else if (tgl2 == false && playing_song == true){
      playSound(true, source1);
    }

    // with the previous checks this kills our audio and navigates us back to the practice screen
    function back_press(){
      if (playing_metronome == true){
        playSound(true, source2);
      }
      if (playing_song == true){
        playSound(true, source1);
      }
      _unsubscribe();
      navigation.navigate('Practice');
    }

  return (
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../mainmenu/Logo2.png')}>
          {/*displays accelerometer values*/}
          <Text style={styles.text}>
            Accelerometer Values:
          </Text>
          <Text style={styles.text}>
            {setValues(x, y, z, subscription)}

          </Text>
          {/*btn for turning acc on and off*/}
          <View style={styles.buttonContainer}>
            <Pressable 
            onPress={subscription ? _unsubscribe : _subscribe}
            style={styles.buttons}>
              <Text style={styles.buttontext}>
                Enable/Disable Accelerometer
              </Text>
            </Pressable>
            {/*changes speed of acc*/}
            <Pressable
            onPress={speedtoggle}
            style={styles.buttons}>
              <Text>
                Toggle Speed
              </Text>
            </Pressable>
          </View>
          {/*back btn to return us to practice start screen*/}
          <Pressable style={styles.back}
                onPress={() => back_press()}>
                    <Text style={styles.buttontext}>
                        Back
                    </Text>
                </Pressable>
          {/*displays values of toggle buttons from previous screen*/}
          <Text style={styles.text}>
            {JSON.stringify(tgl1)} , {JSON.stringify(tgl2)}
          </Text>
        </ImageBackground>
        </View>
);}
export default TrainingMenu;

//rounding the values only for display
function round(n) {
  if (!n) {
    return 0;
  }
  //return Math.floor(n*100)/10;
  return Math.floor(n * 1000000) / 100000;
}

//displaying rounded values
function setValues(x, y, z, subscription) {
  if (subscription) {
    let full =  "x: " + round(x) + " y: " + round(y)+" z: " + round(z);
    console.log(round(z) + " " + Date.now())
    return full;
  }
  return "Accelerometer Off";
}