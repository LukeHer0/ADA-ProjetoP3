import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";

import { api } from "../config/api";
import { RootStackParamList } from "../screens";

const AgendaItemTeacher = ({ props }: any) => {
  const { item } = props;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isEnabled] = React.useState(item.status === "confirmed");

  const toggleSwitch = () => {
    createConfirmAlert();
  };

  const createConfirmAlert = () =>
    Alert.alert(
      "Você realmente deseja mudar o status da aula?",
      "Caso aperte o botão de confirmar, o status da aula será alterado.",
      [
        {
          text: "Cancelar",

          style: "cancel",
        },
        { text: "Confirmar", onPress: changeStatus },
      ],
    );

  const changeStatus = () => {
    api.patch(`/classroom/classrooms/${item.id}/`, {
      status: item.status === "confirmed" ? "confirmed" : "canceled",
    });
  };

  const itemPressed = useCallback(() => {
    Alert.alert(
      item.title,
      "Professor: " + item.teacherName + "\nLocal: " + item.local,
      [
        {
          text: "Alunos",
          onPress: () =>
            navigation.navigate("ListaEstudantes", { id: item.id }),
        },
      ],
    );
  }, []);

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
      <View>
        <Text style={styles.itemHourText}>{item.time}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.itemButtonContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AgendaItemTeacher);

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
