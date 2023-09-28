import{Login} from './Login';
import{Home} from './Home';
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
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;

}

export default App;