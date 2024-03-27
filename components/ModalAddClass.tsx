import FeatherIcons from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { AppButton } from "./ui/AppButton";
import { api } from "../config/api";
import { useAuthStore } from "../stores/authStore";
import { CourseAddType } from "../utils/types";

type InfoClassProps = {
  classInfo: CourseAddType | undefined;
  closeModal: () => void;
};

export default function ModalAddClass({
  classInfo,
  closeModal,
}: InfoClassProps) {
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState("");

  const joinSubject = async () => {
    setLoading(true);
    setError("");
    try {
      await api.post("/classroom/subject-period-students/", {
        student: user?.id,
        subject_period: classInfo?.id,
      });

      closeModal();
    } catch {
      setError("Não foi possível adicionar matéria");
    }

    setLoading(false);
  };

  return (
    <Modal
      onBackdropPress={() => {
        closeModal();
        setError("");
      }}
      isVisible={!!classInfo}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 7,
          padding: 24,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {classInfo?.title}
          </Text>
          <Pressable
            onPress={() => {
              closeModal();
              setError("");
            }}
          >
            <FeatherIcons name="x" size={24} />
          </Pressable>
        </View>
        <View style={{ gap: 20, marginTop: 10 }}>
          <Text>Prof. {classInfo?.teacherName}</Text>
          <Text>{classInfo?.description}</Text>
        </View>
        <View
          style={{
            marginTop: 40,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <AppButton
            onPress={joinSubject}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 30,
              paddingVertical: 10,
              borderColor: "#e5e7eb",
              borderWidth: 2,
              borderRadius: 10,
            }}
            loading={loading}
          >
            {error !== "" ? (
              <Text style={{ fontWeight: "bold" }}>{error}</Text>
            ) : (
              "Adicionar matéria"
            )}
          </AppButton>
        </View>
      </View>
    </Modal>
  );
}
