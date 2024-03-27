import FeatherIcons from "@expo/vector-icons/Feather";
import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

export default function Filtro() {
  const [enfase, onChangeEnfase] = React.useState("");
  const [periodo, onChangePeriodo] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [opens, setOpen] = useState();

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
              selectedValue={opens}
              onValueChange={(itemValue, itemIndex) =>
                setOpen(itemValue)
                }
              mode = "dropdown"
              numberOfLines={2}
              style={{backgroundColor: "grey", flexDirection: "row", paddingHorizontal: 10, width: "60%"}}>
                  <Picker.Item label="Lucas Professor" value="lucas"/>
              </Picker>
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
