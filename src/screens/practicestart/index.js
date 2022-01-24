import React, { useState, useEffect } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

var clicks = 1;
var playing_metronome = false;
var playing_song = false;

const source1 = require('./2077.mp3');
const source2 = require('./metronome.mp3');
var xsound = undefined;
var ysound = undefined;

const TrainingMenu = ({route, navigation}) => {  
  
  var {tgl1, tgl2} = route.params;
  const [sound, setSound] = React.useState();

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

    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [subscription, setSubscription] = useState(null);

    const speedtoggle = () => {
      clicks = isNaN(clicks) ? 0 : clicks;
      clicks++;
      if (clicks%2 == 0) {
        Accelerometer.setUpdateInterval(16);
      }
      else{
        Accelerometer.setUpdateInterval(1000);
      }
    };

    const _subscribe = () => {
        setSubscription(
        Accelerometer.addListener(accelerometerData => {
            setData(accelerometerData);
        })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const { x, y, z } = data;
  
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
          <Text style={styles.text}>
            Accelerometer Values:
          </Text>
          <Text style={styles.text}>
            {setValues(x, y, z, subscription)}

          </Text>
          <View style={styles.buttonContainer}>
            <Pressable 
            onPress={subscription ? _unsubscribe : _subscribe}
            style={styles.buttons}>
              <Text style={styles.buttontext}>
                Enable/Disable Accelerometer
              </Text>
            </Pressable>
            <Pressable
            onPress={speedtoggle}
            style={styles.buttons}>
              <Text>
                Toggle Speed
              </Text>
            </Pressable>
          </View>
          <Pressable style={styles.back}
                onPress={() => back_press()}>
                    <Text style={styles.buttontext}>
                        Back
                    </Text>
                </Pressable>
          <Text style={styles.text}>
            {JSON.stringify(tgl1)} , {JSON.stringify(tgl2)}
          </Text>
        </ImageBackground>
        </View>
);}
export default TrainingMenu;

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 10;
}

function setValues(x, y, z, subscription) {
  if (subscription) {
    var full =  "x: " + round(x) + " y: " + round(y)+" z: " + round(z);
    console.log(full)
    return full;
  }
  return "Accelerometer Off";
}