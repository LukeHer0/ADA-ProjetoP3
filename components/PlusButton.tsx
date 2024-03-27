import FeatherIcons from "@expo/vector-icons/Feather";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function PlusButton({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToMateria = () => {
    setModalVisible(false);
    navigation.navigate("addMateria");
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 30,
        right: 10,
      }}
    >
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => setModalVisible(!modalVisible)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalView}>
          <View style={styles.optionsList}>
            <View style={{ gap: 24 }}>
              <Pressable
                style={{ flexDirection: "row", gap: 4 }}
                onPress={navigateToMateria}
              >
                <FeatherIcons name="book" size={18} />
                <Text>Nova Materia</Text>
              </Pressable>

              <Pressable
                style={{ flexDirection: "row", gap: 4 }}
              >
                <FeatherIcons name="edit" size={18} />
                <Text>Anotação Pessoal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={{
          backgroundColor: "black",
          borderRadius: 30,
          height: 60,
          width: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => setModalVisible(true)}
      >
        <FeatherIcons name="plus" size={45} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.5)",
    bottom: 0,
    right: 0,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    position: "absolute",
    bottom: 75,
    right: 10,
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  optionsList: {
    flexDirection: "row",
    gap: 12,
  },
});
