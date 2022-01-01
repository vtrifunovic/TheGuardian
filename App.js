import React from 'react';
import Router from './src/navigation/router'
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <>
      <Router/>
      <StatusBar style='light'/>
    </>
  )
}
export default App;

