import React, { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoginUi({ navigation }) {
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  // Redirect to Home Screen...

  async function redirect() {
    const redirect = await AsyncStorage.getItem('user');
    if (redirect != null) {
      navigation.navigate("Home");
    }
  }
  redirect();

  function Login() {
    const loginDetails = {
      mobile: getMobile,
      password: getPassword,
    };
    
    fetch("http://192.168.8.130/NoteTake/login.php", {
        method: "POST",
        body: JSON.stringify(loginDetails),
      })
    .then(response => response.json())
    .then(jsResponseObject => {
      // If the message is invalid, alert the user.
      if (jsResponseObject.msg === 'Invalid') {
        alert('Invalid Details');
        return;
      }
  
      const userObject = jsResponseObject.user;
      alert('Hello ' + userObject.fname);
  
      AsyncStorage.setItem('user', JSON.stringify(userObject));
  
      navigation.navigate('Home');
    })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Welcome to My Notes App</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="numeric"
          autoComplete="cc-number"
          autoCorrect={false}
          onChangeText={(newUText) => setMobile(newUText)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCorrect={false}
          onChangeText={(newPText) => setPassword(newPText)}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={Login}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={goToRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  function goToRegister() {
    navigation.navigate("Register");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  form: {
    width: "80%",
    maxWidth: 400,
  },
  input: {
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 8,
  },
  loginButton: {
    marginTop: 45,
    backgroundColor: "blue",
    borderRadius: 50,
    paddingVertical: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 10,
    textAlign: "center",
  },
  registerButton: {
    backgroundColor: "green",
    borderRadius: 50,
    paddingVertical: 10,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff", 
    fontSize: 18,
    fontWeight: "bold",
  },
});
