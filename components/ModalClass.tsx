import FeatherIcons from "@expo/vector-icons/Feather";
import { useAtom } from "jotai";
import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { CourseType } from "../utils/types";

type InfoClassProps = {
  classInfo: CourseType | undefined;
  closeModal: () => void;
};

export default function ModalClass({
  classInfo,
  closeModal
}: InfoClassProps) {
  return (
    <Modal onBackdropPress={closeModal} isVisible={!!classInfo}>
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
            justifyContent: "space-between"
        }}>
          <Text style=
          {{
            fontSize: 22,
            fontWeight: "bold"
          }}>{classInfo?.title}</Text>
          <Pressable onPress={closeModal}>
                  <FeatherIcons name="x" size={24} />
          </Pressable>
        </View>
        <View style={{ gap: 20, marginTop: 10 }}>
          <Text>{classInfo?.description}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <Text>John Doe</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Horário</Text>
            <Text>{classInfo?.time}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Local</Text>
            <Text>{classInfo?.local}</Text>
          </View>
        </View>
        <View style={{marginTop: 40, flexDirection: "row", justifyContent: "center"}}>
            <TouchableOpacity onPress={closeModal}>
                <View style={{justifyContent: "center", alignItems: "center", paddingHorizontal: 30, paddingVertical: 10, borderColor: "#e5e7eb", borderWidth: 2, borderRadius: 10}}>
                    <Text>Fechar</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
