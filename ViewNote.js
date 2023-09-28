import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ViewNoteUi({ navigation }) {
  const [notesData, setNotesData] = useState([]);
  useEffect(async () => {
    const user = await AsyncStorage.getItem('user');
    var userJsonObject = JSON.parse(user);
    const userDetails = {
      user_id: userJsonObject.id,
    };
    fetch("http://192.168.8.130/NoteTake/viewNote.php", {
      method: "POST",
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        // Alert.alert('Message', 'Hello ' + data);
        // Set the fetched data in your component's state
        setNotesData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once

    const renderNoteItem = ({ item }) => {
    let noteImageSource = null;

    // Determine the image source based on the noteType
    if (item.category_id == "study") {
      noteImageSource = require("./assets/study.png");
    } else if (item.category_id == "personal") {
      noteImageSource = require("./assets/personal.png");
    } else if (item.category_id == "travel") {
      noteImageSource = require("./assets/travel.png");
    } else if (item.category_id == "work") {
      noteImageSource = require("./assets/work.png");
    }
    return (
      <TouchableOpacity
        style={styles.noteCard}
        onPress={() => {
          // Handle the onPress action here
        }}
      >
        <Image source={noteImageSource} style={styles.noteImage} />
        <View style={styles.noteTextContainer}>
          <Text style={styles.noteTitle}>{item.title}</Text>
          <Text style={styles.noteDescription}>{item.description}</Text>
        </View>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{item.created_at}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notesData}
        keyExtractor={(item) => item.id.toString()} // Ensure id is a string or unique identifier
        renderItem={renderNoteItem}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  noteCard: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 10,
    borderRadius: 10, 
    marginBottom: 10, 
  },
  noteImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 50, 
    borderWidth: 2, 
    borderColor: "#000",
  },
  noteTextContainer: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: 'blue',
  },
  noteDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  noteDate: {
    fontSize: 14,
    color: "#999",
  },
  dateView: {
    position: "absolute",
    top: 10, 
    right: 10, 
    backgroundColor: "white", 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  dateText: {
    color: "red", 
    fontSize: 12,
    fontWeight: "bold",
  },
});
