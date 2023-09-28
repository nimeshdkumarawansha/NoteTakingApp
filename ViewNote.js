import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const notesData = [
  {
    id: "1",
    title: "Note Study",
    description: "This is the first note.",
    date: "2023-09-10 10:00 AM",
    image: require("./assets/study.png"),
  },
  {
    id: "2",
    title: "Note Personal",
    description: "This is the second note.",
    date: "2023-08-23 02:30 PM",
    image: require("./assets/personal.png"), 
  },
  {
    id: "3",
    title: "Note Travel",
    description: "This is the first note.",
    date: "2023-08-22 10:00 AM",
    image: require("./assets/travel.png"),
  },
  {
    id: "4",
    title: "Note Work",
    description: "This is the first note.",
    date: "2023-07-22 10:00 AM",
    image: require("./assets/work.png"),
  },
 
];

export function ViewNoteUi({ navigation }) {

  const renderNoteItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.noteCard}
        onPress={() => {
        
        }}
      >
         <Image source={item.image} style={styles.noteImage} />
      <View style={styles.noteTextContainer}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteDescription}>{item.description}</Text>
      </View>
      <View style={styles.dateView}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notesData}
        keyExtractor={(item) => item.id}
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


export default ViewNoteUi;
