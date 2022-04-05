//import statements
import React, { useState, useEffect } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

var zvalues = [];
var tstamps = [];
const TrainingStart = ({route, navigation}) => {  
  
  //copying the params over from the previous page
  const {tgl1, tgl2, start} = route.params;
  tstamps[0] = start;
  zvalues[0] = 0;
 
    function setValues(z, subscription, start) {
        if (subscription) {
            zvalues.push(round(z)-9.8);
            tstamps.push(Date.now())
        }
        // 60000 for 1 min
        if (15000 < Date.now()-start)
        { 
            _unsubscribe;
            navigation.navigate('Data Analysis', {zval: zvalues, tstamp : tstamps})
        }
        return start;
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

    // lets us record and save accelerometer data to our previous array
    const _subscribe = () => {
        setSubscription(
        Accelerometer.addListener(accelerometerData => {
            setData(accelerometerData);
            Accelerometer.setUpdateInterval(10);
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
  
    // with the previous checks this kills our audio and navigates us back to the practice screen
    function back_press(){
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
            {setValues(z, subscription, start)}
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
export default TrainingStart;

//rounding the values only for display
function round(n) {
  if (!n) {
    return 0;
  }
  //return Math.floor(n*100)/10;
  return Math.floor(n * 1000000) / 100000;
}