import React, { useEffect, useState } from 'react';
import Splash from './components/splash';
import Today from './components/today';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';


const App = () => {
  const [state, setState] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setState(false)
    }, 2000)
    return () => clearTimeout(timer);
  })

  if (state) {
    return <Splash />
  }

  return (
    <>
      <StatusBar hidden={false} />
      {state ? (
        <Splash />
      ) : (
        <Today />
      )}
    </>
  )
}

export default App;
