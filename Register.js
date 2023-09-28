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
import DropDownPicker from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native";

export function RegisterUi({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Employee", value: 2 },
    { label: "Student", value: 1 },
  ]);

  const [getMobileNo, setMobileNo] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getUserType, setUserType] = useState("");

  const ui = (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Create an Account</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="numeric"
          autoCompleteType="tel"
          onChangeText={setMobileNo}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          autoCompleteType="name"
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          autoCompleteType="name"
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCompleteType="password"
          onChangeText={setPassword}
        />
        <DropDownPicker
          style={styles.drop}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(val) => {
            setUserType(val);
          }}
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={registerUser}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.loginLink} onPress={goToLogin}>
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );

  async function registerUser() {
    const signUpDetails = {
      mobile: getMobileNo,
      fname: getFirstName,
      lname: getLastName,
      password: getPassword,
      type: getUserType,
    };
    fetch("http://192.168.8.130/NoteTake/register.php", {
      method: "POST",
      body: JSON.stringify(signUpDetails),
    })
      .then((response) => {
        return response.text();
      })
      .then((value) => {
        if (value == 1) {
          Alert.alert("Success", "Successfully Registered");
          navigation.navigate("Login");
        } else {
          Alert.alert("Warning", value);
        }
      })
      .catch((error) => {
        Alert.alert("Error: " + error);
      });
  }

  function goToLogin() {
    navigation.navigate("Login");
  }

  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
  drop: {
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: "blue",
    borderRadius: 50,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 45, 
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    textAlign: "center",
  },
  loginLink: {
    color: "#3498db",
    fontWeight: "bold",
  },
});
