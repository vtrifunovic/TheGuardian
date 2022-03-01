//import statements
import React from 'react';
import { ImageBackground, Pressable, Text, View} from 'react-native';
import Styles from './styles';
import { useNavigation } from '@react-navigation/native';

const TrainingMenu = () => {
  //creating const for nav stack
  const navigation = useNavigation();

  return (
    <View style={Styles.container}>
      <ImageBackground 
      style={Styles.image} 
      source={require('../mainmenu/Logo2.png')}>
        {/*creating pressable to go back to main menu*/}
        <Pressable style={Styles.back}
        onPress={() => navigation.navigate('Main Menu')}>
          <Text style={Styles.buttontext}>
            Back
          </Text>
        </Pressable>
        {/*creating btn to take us to the cpr manual*/}
        <Pressable
        style={Styles.buttons}
        onPress={() => navigation.navigate('CPR Manual')}>
          <Text style={Styles.buttontext}>
            CPR Manual
          </Text>
        </Pressable>
        {/*creating btn to take us to the practice screen*/}
        <Pressable
        style={Styles.buttons}
        onPress={() => navigation.navigate('Practice')}>
          <Text style={Styles.buttontext}>
            Practice
          </Text>

        </Pressable>
      </ImageBackground>
    </View>
  )
}
export default TrainingMenu;