import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from '../screens/mainmenu';
import TrainingMenu from '../screens/trainingmenu';
import Practice from '../screens/practice';
import PracticeStart from '../screens/practicestart';


const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen 
          name={"Main Menu"} 
          component={MainMenu}/>
          <Stack.Screen 
          name={"Training Menu"}
          component={TrainingMenu}/>
          <Stack.Screen 
          name={"Practice"}
          component={Practice}/>
          <Stack.Screen 
          name={"Practice Start"}
          component={PracticeStart}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Router;