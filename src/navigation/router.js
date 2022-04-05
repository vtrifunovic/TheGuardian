//import statements
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from '../screens/mainmenu';
import TrainingMenu from '../screens/trainingmenu';
import Practice from '../screens/practice';
import PracticeStart from '../screens/practicestart';
import TrainingStart from '../screens/trainingstart';
import CPRManual from '../screens/cprmanual';
import DataAnalysis from '../screens/dataanalysis';

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
          name={"Training Start"}
          component={TrainingStart}/>
          <Stack.Screen 
          name={"CPR Manual"}
          component={CPRManual}/>
          <Stack.Screen 
          name={"Data Analysis"}
          component={DataAnalysis}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Router;