import React, { useState, useEffect } from 'react';
import { ImageBackground, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

var clicks = 1;

const TrainingMenu = () => {  

  const navigation = useNavigation();

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
                onPress={() => navigation.navigate('Practice')}>
                    <Text style={styles.buttontext}>
                        Back
                    </Text>
                </Pressable>
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
    return full;
  }
  return "Accelerometer Off";
}