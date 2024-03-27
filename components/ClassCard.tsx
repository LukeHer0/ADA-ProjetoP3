import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

export default function ClassCard({
  title,
  time,
  teacher,
  status,
  handleCardPress,
}: any) {
  return (
    <Pressable onPress={handleCardPress}>
      <View
        style={
          status === "Confirmada"
            ? styles.materiaStyle
            : { ...styles.materiaStyle, ...styles.canceled }
        }
      >
        <View style={{ width: "80%", justifyContent: "center" }}>
          <Text
            style={
              status === "Confirmada"
                ? styles.materiaTitle
                : { ...styles.materiaTitle, textDecorationLine: "line-through" }
            }
          >
            {title}
          </Text>
          <Text style={styles.baseText}>Prof. {teacher}</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
    height: 80,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
    gap: 20,
  },
  canceled: {
    opacity: 0.5,
  },
  baseText: {
    fontSize: 15,
    color: "#1f2937",
  },
  materiaTitle: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "bold",
  },
});
