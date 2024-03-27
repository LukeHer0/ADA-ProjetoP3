import FeatherIcons from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";

import { AppButton } from "./ui/AppButton";
import { api } from "../config/api";
import { TeacherType } from "../utils/types";

type FiltroProps = {
  onFilter: (teacher_id: number, period_i: number) => void;
};

export default function Filtro() {
  const [teacher, setTeacher] = useState("");
  const [period, setPeriod] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { data: teachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const listTeachers = await api.get<TeacherType[]>("/teachers/");

      return listTeachers;
    },
  });

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <FeatherIcons
          name="filter"
          size={38}
          style={{
            marginRight: "5%",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={toggleModal}
        propagateSwipe
      >
        <KeyboardAvoidingView style={styles.modalView}>
          <View>
            <View>
              <View style={styles.header}>
                <Text style={styles.titleText}>Filtros</Text>
                <View>
                  <FeatherIcons
                    name="x"
                    size={28}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.baseText}>Professor</Text>
                <Picker
                  selectedValue={teacher}
                  onValueChange={(itemValue, itemIndex) =>
                    setTeacher(itemValue)
                  }
                  mode="dropdown"
                  numberOfLines={2}
                  style={{
                    backgroundColor: "#e5e7eb",
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    width: "100%",
                  }}
                >
                  {teachers?.data?.map((t) => (
                    <Picker.Item label={t.name} value={t.id} />
                  ))}
                  <Picker.Item label="Lucas Professor" value="lucas" />
                </Picker>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.baseText}>ou</Text>
              </View>
              <View>
                <Text style={styles.baseText}>Período</Text>
                <Picker
                  selectedValue={period}
                  onValueChange={(itemValue) => setPeriod(itemValue)}
                  mode="dropdown"
                  numberOfLines={2}
                  style={{
                    backgroundColor: "#e5e7eb",
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    width: "100%",
                  }}
                >
                  <Picker.Item label="1º" value="1" />
                  <Picker.Item label="2º" value="2" />
                  <Picker.Item label="3º" value="3" />
                  <Picker.Item label="4º" value="4" />
                  <Picker.Item label="5º" value="5" />
                  <Picker.Item label="6º" value="6" />
                  <Picker.Item label="7º" value="7" />
                  <Picker.Item label="8º" value="8" />
                </Picker>
              </View>
              <AppButton hitSlop={24}>
                <Text style={(styles.baseText, { fontWeight: "bold" })}>
                  Buscar
                </Text>
              </AppButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  titleText: {
    fontSize: 26,
    fontWeight: "bold",
  },

  baseText: {
    fontSize: 18,
  },

  modalView: {
    backgroundColor: "white",

    borderRadius: 8,
    padding: 16,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 4,
    paddingVertical: 6,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  header: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
