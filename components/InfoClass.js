import FeatherIcons from "@expo/vector-icons/Feather";
import { useAtom } from "jotai";
import React from "react";
import { View, Text, Pressable } from "react-native";
import Modal from "react-native-modal";

import { aulasAtom } from "../utils/aulas";

export default function InfoClass({ name, open, closeModal, classId }) {
  const [aulas] = useAtom(aulasAtom);
  const selectedClass = aulas.find((aula) => aula.id === classId);

  if (!selectedClass) return null;

  return (
    <Modal onBackdropPress={closeModal} isVisible={open}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 7,
          padding: 24,
          gap: 16,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 7,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {selectedClass.title}
          </Text>
          <Pressable onPress={closeModal}>
            <FeatherIcons name="x" size={24} />
          </Pressable>
        </View>
        <Text>{selectedClass.description}</Text>
        <View style={{ gap: 12 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <Text>
              {selectedClass.status === "confirmed"
                ? "Confirmada"
                : "Cancelada"}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Horário</Text>
            <Text>Qui, 15:20, 17:00</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Local</Text>
            <Text>{selectedClass.local}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
