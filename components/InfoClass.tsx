import FeatherIcons from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Modal from "react-native-modal";

import { AppButton } from "./ui/AppButton";
import { api } from "../config/api";
import { useRooms } from "../hooks/classrooms";
import { CourseType } from "../utils/types";

type InfoClassProps = {
  classInfo: CourseType | undefined;
  closeModal: () => void;
  onUpdated: (id: number, local: string) => void;
};

export default function InfoClass({
  closeModal,
  classInfo,
  onUpdated,
}: InfoClassProps) {
  const [selectedLocal, setSelectedLocal] = useState<number>();
  const { data: rooms, isLoading } = useRooms();
  const [loading, setLoading] = useState(false);

  const updateClassLocal = async () => {
    if (!classInfo) return;

    setLoading(true);

    try {
      await api.patch(`/classroom/classrooms/${classInfo?.id}/`, {
        room: selectedLocal,
      });
    } catch (error) {
      console.log(error);
    }

    const selectedRoom = rooms?.find((r) => r.id === selectedLocal);

    onUpdated(classInfo.id, selectedRoom?.name || "");
    setLoading(false);
    closeModal();
  };

  if (!classInfo) return null;

  return (
    <Modal onBackdropPress={closeModal} isVisible={!!classInfo}>
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
            {classInfo.title}
          </Text>
          <Pressable onPress={closeModal}>
            <FeatherIcons name="x" size={24} />
          </Pressable>
        </View>
        <Text>{classInfo.description}</Text>
        <View style={{ gap: 12 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <Text>{classInfo.status}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Horário</Text>
            <Text>Qui, 15:20, 17:00</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Local</Text>
            <View>
              <Picker
                selectedValue={selectedLocal}
                onValueChange={setSelectedLocal}
                mode="dropdown"
                numberOfLines={2}
                style={{
                  backgroundColor: "#e5e7eb",
                  flexDirection: "row",
                  paddingHorizontal: 100,
                  height: 20,
                  width: "60%",
                  fontSize: 12,
                }}
              >
                {!isLoading &&
                  rooms?.map((c) => (
                    <Picker.Item key={c.id} label={c.name} value={c.id} />
                  ))}
              </Picker>
            </View>
          </View>
        </View>
        <AppButton
          style={{
            marginTop: 20,
          }}
          onPress={updateClassLocal}
          loading={loading}
        >
          Salvar alterações
        </AppButton>
      </View>
    </Modal>
  );
}
