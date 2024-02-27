import FeatherIcons from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

export function Notificacao({ title, desc}) {

  const [showNotif, setShowNotif] = React.useState(true);
  return (
    showNotif? 
    <View style={styles.notificStyle}>
      <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={styles.materiaTitle}>{title}</Text>
          <FeatherIcons name = "x" size = {32} style={{color: "#d5d7db"}} onPress={() => {setShowNotif(false)}}/>
      </View>
        <Text style={styles.baseText}>{desc}</Text>
    </View>
    :
    null
  );
}

const styles = StyleSheet.create({
  notificStyle: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderColor : "#e5e7eb",
    borderWidth : 1,
    width: "100%",
    marginBottom: -0.5,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  baseText: {
    fontSize: 16,
    color: "#1f2937",
  },
  materiaTitle: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "bold",
  },

  rightbaseText: {
    fontSize: 26,
    color: "#1f2937",
    alignItems: "flex-start",
  },

  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },

  subTitleText: {
    fontSize: 24,
    fontWeight: "regular",
  },

  searchSection: {
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    width: "70%",
  },

  buttonStyle: {
    maxWidth: 400,
    width: "90%",
    paddingVertical: 12,
    color: "black",
    backgroundColor: "#d1d5db",
    borderWidth: 0,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  titleStyle: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 60,
    marginBottom: 30,
  },

  inputStyle: {
    marginLeft: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  inputTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    color: "d1d5db",
  },

  input: {
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 4,
    paddingVertical: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
