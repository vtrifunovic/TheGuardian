//import statements
import React, { useState, useEffect } from 'react';
import { ImageBackground, Pressable, Text, View, ActivityIndicator } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import styles from './styles';

var zvalues = [];
var tstamps = [];
var idx = 0;
const TrainingStart = ({route, navigation}) => {  
  
  //copying the params over from the previous page
  const {tgl1, tgl2, start} = route.params;
 
  //const navigation = useNavigation();
    // initializes our accelerometer array
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    // creating state pair for our accelerometer on and off
    const [subscription, setSubscription] = useState(null);

    // lets us record and save accelerometer data to our previous array
    const _subscribe = () => {
        setSubscription(
        Accelerometer.addListener(accelerometerData => {
            setData(accelerometerData);
        }),
        //try setting to 5,4, or 3 since it gives same amount of values
        Accelerometer.setUpdateInterval(2)
        );
        zvalues = [];
        tstamps = [];
        idx = 0;
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

    if (zvalues.length == 0)
    {
      zvalues.push(round(z))
      tstamps[0] = Date.now();
    }
    else{
      zvalues.push(round(z)-9.8);
      tstamps.push(Date.now())
    }

    // 60000 == 60 sec
    if (60000 < Date.now()-start && idx == 0)
    {
        _unsubscribe();
        navigation.navigate('Data Analysis', {zval: zvalues, tstamp : tstamps})
        idx++;
    }
    // with the previous checks this kills our audio and navigates us back to the practice screen
    function back_press(){
      _unsubscribe();
      navigation.navigate('Practice');
    }

  return (
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../mainmenu/Logo2.png')}>
          {/*displays accelerometer values*/}
            {/*changes speed of acc*/}
          <ActivityIndicator size="large" color="#fcb603" />
          {/*back btn to return us to practice start screen*/}
          <Pressable style={styles.back}
            onPress={() => back_press()}>
                <Text style={styles.buttontext}>
                    Back
                </Text>
          </Pressable>
          {/*displays values of toggle buttons from previous screen*/}
          <Text style={styles.text}>
            Collecting Data...
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