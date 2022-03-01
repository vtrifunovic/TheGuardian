//import statements
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from '../screens/mainmenu';
import TrainingMenu from '../screens/trainingmenu';
import Practice from '../screens/practice';
import PracticeStart from '../screens/practicestart';
import CPRManual from '../screens/cprmanual';

//creating const from the stacknavigator
const Stack = createNativeStackNavigator();

const Router = () => {
  const config = { Animation: 'spring'}
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* Initialization of our screens, app starts with mainmenu*/}
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
          <Stack.Screen 
          name={"CPR Manual"}
          component={CPRManual}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Router;