import FeatherIcons from "@expo/vector-icons/Feather";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { View, Text, Pressable, Touchable, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

import { aulasAtom } from "../utils/aulas";
import { set } from "react-hook-form";

type InfoClassProps = {
  open: boolean;
  closeModal: () => void;
  classId: number;
};


export default function InfoClass({
  open,
  closeModal,
  classId,
}: InfoClassProps) {
  const [opens, setOpen] = useState();

  const aulas = aulasAtom;
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
            {/* <View> */}
              <Picker 
              selectedValue={opens}
              onValueChange={(itemValue, itemIndex) =>
                setOpen(itemValue)
                }
              mode = "dropdown"
              numberOfLines={2}
              style={{backgroundColor: "grey", flexDirection: "row", paddingHorizontal: 10, width: "60%"}}>
                  <Picker.Item label="Lab 1, IC" value="lab1"/>
                  <Picker.Item label="Lab 2, IC" value="lab2"/>
                  <Picker.Item label="Lab 3, IC" value="lab3"/>
                  <Picker.Item label="Miniauditorio, IC" value="miniaudi"/>
                  <Picker.Item label="Sala 1, IC" value="sala1"/>
                  <Picker.Item label="Sala 2, IC" value="sala2"/>
                  <Picker.Item label="Sala 3, IC" value="sala3"/>
                  <Picker.Item label="Sala 4, IC" value="sala4"/>
                  <Picker.Item label="Auditorio, CEPET" value="audicepetec"/>
              </Picker>
            {/* </View> */}
          </View>
        </View>
      </View>
    </Modal>
  );
}
