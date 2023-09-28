import React from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function HomeUi({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>MY NOTES APP</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Newnote");
          }}
        >
          <Text style={styles.buttonText}>Add New Note</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            navigation.navigate("ViewNote");
          }}
        >
          <Text style={styles.buttonText}>View Notes</Text>
              </TouchableOpacity>
              
      </View>
    </SafeAreaView>
  );
}

async function checkUser() {
    const user = await AsyncStorage.getItem('user');
    var userJsonObject = JSON.parse(user);
    Alert.alert('Message', 'Hello ' + userJsonObject.id);
    return user;
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
  heading1: {
    fontSize: 30,
    marginTop: 50,
    textAlign: "center",
    color: "purple",
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeUi;
