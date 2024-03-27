import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { View, Pressable, Text, StyleSheet, Switch, Alert } from "react-native";

import { api } from "../config/api";

type ClassCardProfessorProps = {
  title: string;
  time: string;
  description: string;
  status: string;
  handleCardPress: () => void;
  onUpdated: (id: number, status: "Confirmada" | "Cancelada") => void;
  id: number;
};

export default function ClassCardProfessor({
  title,
  time,
  description,
  status,
  handleCardPress,
  onUpdated,
  id,
}: ClassCardProfessorProps) {
  const [loading, setLoading] = React.useState(false);

  const createConfirmAlert = () =>
    Alert.alert(
      "Você realmente deseja mudar o status da aula?",
      "Caso aperte o botão de confirmar, o status da aula será alterado.",
      [
        {
          text: "Cancelar",

          style: "cancel",
        },
        { text: "Confirmar", onPress: () => updateClassStatus() },
      ],
    );

  const updateClassStatus = async () => {
    setLoading(true);
    const newStatus = status === "Confirmada" ? "canceled" : "confirmed";

    try {
      await api.patch(`/classroom/classrooms/${id}/`, {
        status: newStatus,
      });
    } catch (error) {
      console.log(error);
    }

    onUpdated(id, newStatus === "confirmed" ? "Confirmada" : "Cancelada");
    setLoading(false);
  };

  const toggleSwitch = () => {
    createConfirmAlert();
  };

  console.log("status", status);
  const isEnabled = status !== "Cancelada";

  const containerStyle = {
    ...styles.materiaStyle,
    ...(status === "Cancelada" ? styles.canceled : {}),
  };

  if (loading)
    return (
      <MotiView
        transition={{
          type: "timing",
        }}
        style={{
          marginBottom: 10,
        }}
      >
        <Skeleton colorMode="light" height={90} width="100%" />
      </MotiView>
    );

  return (
    <Pressable onPress={handleCardPress}>
      <View style={containerStyle}>
        <View style={{ width: "80%" }}>
          <Text
            style={
              isEnabled
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
            thumbColor={isEnabled ? "#1e3a8a" : "#f4f3f4"}
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
    backgroundColor: "#bfdbfe",
    alignItems: "center",
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
