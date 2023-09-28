import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export function NewNoteUi({ navigation }) {
  const [getTitle, setTitle] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getCategory, setCategory] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Travel", value: "travel" },
    { label: "Study", value: "study" },
    { label: "Personal", value: "personal" },
    { label: "Work", value: "work" },
  ]);

  function SaveNote() {
    const noteDetails = {
      title: getTitle,
      description: getDescription,
      category: getCategory,
    };

    fetch("http://192.168.8.130/NoteTake/addnote.php", {
      method: "POST",
      body: JSON.stringify(noteDetails),
    })
      .then((response) => {
        return response.text();
      })
      .then((value) => {
        if (value == 1) {
          Alert.alert("Success", "Note Saved Successfully");
          navigation.navigate("Home");
        } else {
          Alert.alert("Note added failed", value);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Add New Note</Text>
      <View style={styles.inputContainer}>
        <Text>Title :</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newTText) => setTitle(newTText)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Description :</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newDText) => setDescription(newDText)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Select Category</Text>
        <DropDownPicker
          style={styles.drop}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(val) => {
            setCategory(val);
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={SaveNote}
      >
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    marginVertical: 10,
    width: "80%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  drop: {
    marginTop: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NewNoteUi;
