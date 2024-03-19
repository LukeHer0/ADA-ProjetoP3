import FeatherIcons from "@expo/vector-icons/Feather";
import { useAtom } from "jotai";
import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { aulasAtom } from "../utils/aulas";

type InfoClassProps = {
  open: boolean;
  closeModal: () => void;
};

export default function CardAluno({
  open,
  closeModal,
}: InfoClassProps) {
  return (
    <Modal onBackdropPress={closeModal} isVisible={open}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 7,
          padding: 24,
          flexDirection: "column"
        }}
      >
        <View style={{
            flexDirection: "row",
            justifyContent: "flex-end"
        }}>
        <Pressable onPress={closeModal}>
                <FeatherIcons name="x" size={24} />
        </Pressable>
        </View>
        <View
        style={{
            flexDirection: "row",
            justifyContent: "center"
        }}>
            <View
                style={{
                    width: 100,
                    height: 100,
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "#e5e7eb",
                    borderRadius: 50,
                }}>
                <FeatherIcons name="user" size={80} />
            </View>
        </View>
        <View style={{ gap: 20, marginTop: 40 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Nome</Text>
            <Text>John Doe</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Ingressou em</Text>
            <Text>21/01/2024 às 15h</Text>
          </View>
        </View>
        <View style={{marginTop: 40, flexDirection: "row", justifyContent: "center"}}>
            <TouchableOpacity>
                <View style={{justifyContent: "center", alignItems: "center", paddingHorizontal: 30, paddingVertical: 10, borderColor: "#e5e7eb", borderWidth: 2, borderRadius: 10}}>
                    <Text>Remover</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
