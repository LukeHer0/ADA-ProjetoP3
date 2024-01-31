import FeatherIcons from "@expo/vector-icons/Feather";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";

export default function Filtro({ options }) {
  const [enfase, onChangeEnfase] = React.useState("");
  const [periodo, onChangePeriodo] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);

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
                  <Text style={styles.baseText}>Ênfases</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeEnfase}
                    value={enfase}
                    placeholder="Insira uma ênfase"
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.baseText}>ou</Text>
                </View>
                <View>
                  <Text style={styles.baseText}>Período</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangePeriodo}
                    value={periodo}
                    placeholder="Insira um período"
                  />
                </View>
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
    color: "6B7280",
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
