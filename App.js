import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export function SignIn({ navigation }) {


  const [mobile, setMobile] = useState(null);        // To Catch Mobile ....
  const [password, setPassword] = useState(null);    // To Catch Password ....


  // Redirect to Home Screen...

  async function redirect() {
    const redirect = await AsyncStorage.getItem('user');
    if (redirect != null) {
      navigation.navigate("Home");
    }
  }
  redirect();



  //  Sign In Proccess ...

  function click_btn() {
    alert("hiii");
    var jsRequestObject = { mobile: mobile, password: password };
    var jsonRequestText = JSON.stringify(jsRequestObject);
    var formData = new FormData();
    formData.append('jsonRequestText', jsonRequestText);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var jsResponseObject = JSON.parse(responseText);
        if (jsResponseObject.msg == 'Invalid') {
          Alert.alert('Message', 'Invalid Details');
        } else {
          var userObject = jsResponseObject.user;
          Alert.alert('Message', 'Hello ' + userObject.name);
          AsyncStorage.setItem("user", JSON.stringify(userObject));
          navigation.navigate('Home');
        }
      }
    };
    request.open("POST", "http://10.0.2.2/react_chat/signIn.php", true);
    request.send(formData);
  }




  // Sign In UI ...

  const ui = (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Welcome back!</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Number"
            keyboardType={'numeric'}
            autoCorrect={false}
            maxLength={10}
            placeholderTextColor="#003f5c"
            value={mobile}
            onChangeText={(text) => setMobile(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={click_btn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => Alert.alert('Forgot password clicked')}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Sign Up')}
            style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return ui;
}



// File CSS ...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 0.6,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  subtitle: {
    fontSize: 20,
    color: '#ccc',
    marginBottom: 40,
  },
  inputText: {
    height: 50,
    color: 'black',
    fontSize: 16,
  },
  inputView: {
    width: '100%',
    backgroundColor: '#e6e6e6',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    marginTop: 70,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signupText: {
    fontSize: 16,
    marginRight: 5,
    color: '#333',
  },
  signupButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingHorizontal: 50,
    paddingVertical: 5,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});