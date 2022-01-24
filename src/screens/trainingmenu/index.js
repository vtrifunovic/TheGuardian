import React from 'react';
import { ImageBackground, Pressable, Text, View} from 'react-native';
import Styles from './styles';
import { useNavigation } from '@react-navigation/native';

const TrainingMenu = () => {

  const navigation = useNavigation();

  return (
    <View style={Styles.container}>
      <ImageBackground 
      style={Styles.image} 
      source={require('../mainmenu/Logo2.png')}>
        <Pressable style={Styles.back}
        onPress={() => navigation.navigate('Main Menu')}>
          <Text style={Styles.buttontext}>
            Back
          </Text>
        </Pressable>

        <Pressable
        style={Styles.buttons}
        onPress={() => navigation.navigate('CPR Manual')}>
          <Text style={Styles.buttontext}>
            CPR Manual
          </Text>
        </Pressable>

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