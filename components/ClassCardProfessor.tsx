import { useAtom } from "jotai";
import React from "react";
import { View, Pressable, Text, StyleSheet, Switch, Alert } from "react-native";

import { aulasAtom } from "../utils/aulas";

export default function ClassCardProfessor({
  title,
  time,
  description,
  status,
  handleCardPress,
  id,
}) {
  const [isEnabled, setIsEnabled] = React.useState(status === "confirmed");
  const [aulas, setAulas] = useAtom(aulasAtom);

  const createConfirmAlert = () =>
    Alert.alert(
      "Você realmente deseja mudar o status da aula?",
      "Caso aperte o botão de confirmar, o status da aula será alterado.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        },
        { text: "Confirmar", onPress: changeClass },
      ],
    );

  const toggleSwitch = () => {
    createConfirmAlert();
  };

  function changeClass() {
    setIsEnabled((previousState) => {
      setAulas(
        aulas.map((aula) => {
          if (aula.id === id) {
            aula.status = !previousState ? "confirmed" : "canceled";
          }
          return aula;
        }),
      );
      return !previousState;
    });
  }

  return (
    <Pressable onPress={handleCardPress}>
      <View
        style={
          status === "confirmed"
            ? styles.materiaStyle
            : { ...styles.materiaStyle, ...styles.canceled }
        }
      >
        <View style={{ width: "80%" }}>
          <Text
            style={
              status === "confirmed"
                ? styles.materiaTitle
                : { ...styles.materiaTitle, textDecorationLine: "line-through" }
            }
          >
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.baseText}>
            {description}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.materiaTitle}>{time}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  materiaStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e5e7eb",

    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  canceled: {
    opacity: 0.5,
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
});
