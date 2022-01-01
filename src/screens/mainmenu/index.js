import React from 'react';
import { Text, View, FlatList, Pressable, ImageBackground} from 'react-native';
import Styles from './styles';
import { useNavigation } from '@react-navigation/native';

const MainMenu = () => {

  const navigation = useNavigation();

  return (
    <View style={Styles.container}>
      <ImageBackground style={Styles.image} source={require('./Logo2.png')}>
        <Text style={Styles.header}>The Guardian CPR</Text>
        <Text style={Styles.text}>
          Verify there's a Cardiac Emergency:
        </Text>
        <FlatList
        style={Styles.list}
        data = {[
          {key: 'Check the scene is safe'},
          {key: 'Tap the person on the shoulder'},
          {key: 'Shout are you ok to ensure they need help'},
          {key: 'Listen for breathing'},
          {key: 'Check to see if they are choking'},
        ]}
        renderItem={({item}) => <Text style={Styles.item}>{item.key}</Text>}/>
        <Pressable 
        style={[Styles.buttons, {backgroundColor: 'red'}]} 
        onPress={() => {console.warn('Emergency Call!');}}>
          <Text style={Styles.buttontext}>Emergency Call</Text>
        </Pressable>
        <Pressable 
        style={[Styles.buttons, {backgroundColor: '#BFC1C4', height: 80, width: '90%'}]} 
        onPress={() => navigation.navigate('Training Menu')}>
          <Text style={Styles.buttontext}>Training Mode</Text>
        </Pressable>
      </ImageBackground>
    </View>
  )
}
export default MainMenu;