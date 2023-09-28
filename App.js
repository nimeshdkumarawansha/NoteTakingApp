import {RegisterUi} from './Register';
import {LoginUi} from './Login';
import {HomeUi} from './Home';
import {NewNoteUi} from './Newnote';
import {ViewNoteUi} from './ViewNote';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App(){
  async function checkUser() {
    const user = await AsyncStorage.getItem('user');
    return user;
  }
  const ui = (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={checkUser !=null?"Login":"Home"}>
      <Stack.Screen name='Login' component={LoginUi}/>
          <Stack.Screen name='Register' component={RegisterUi}/>          
          <Stack.Screen name='Home' component={HomeUi}/>
          <Stack.Screen name='Newnote' component={NewNoteUi}/>
          <Stack.Screen name='ViewNote' component={ViewNoteUi}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;

}

export default App;