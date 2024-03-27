import React, { useCallback } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

type courseType = {
  id: number;
  title: string;
  description: string;
  teacherName: string;
  time: string;
  duration: string;
  date: string;
  status: string;
  local: string;
};

const AgendaItem = (props: any) => {
  const { item } = props;

  const buttonPressed = useCallback(() => {
    Alert.alert("Aula Info", "Cancelada", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK" },
    ]);
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(
      item.title,
      "Professor: " + item.teacherName + "\nLocal: " + item.local,
    );
  }, []);

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
     teste
    </TouchableOpacity>
  );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});
