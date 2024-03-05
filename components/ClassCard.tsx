import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

export default function ClassCard({
  title,
  time,
  description,
  status,
  handleCardPress,
}) {
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
