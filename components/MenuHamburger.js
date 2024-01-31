import FeatherIcons from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

import UserInfo from "./UserInfo";

export default function MenuHamburger({ options }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const menuOptions = [
    {
      title: "Home",
      icon: "home",
      onPress: () => navigation.navigate("Home"),
    },
    {
      title: "Matérias",
      icon: "book",
      onPress: () => navigation.navigate("ListMateria"),
    },
    {
      title: "Usuário",
      icon: "user",
      onPress: () => navigation.navigate("ChangeUserInfo"),
    },
  ];

  const handleShowUser = () => {
    toggleModal();
    setShowUserInfo(true);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <FeatherIcons name="menu" size={28} />
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={toggleModal}
        style={{ margin: 0, marginLeft: 100, left: 0 }}
      >
        <View style={styles.modalView}>
          <View style={styles.optionsList}>
            <View style={{ ...styles.fundoDoModal }}>
              <Pressable style={{ flexDirection: "row" }} onPress={toggleModal}>
                <FeatherIcons name="arrow-right" size={28} />
              </Pressable>
              <TouchableOpacity onPress={handleShowUser}>
                <View
                  style={{
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 80,

                      height: 80,
                      alignItems: "center", // Eixo secundario
                      justifyContent: "center", // Eixo primario
                      backgroundColor: "white",
                      borderRadius: 50,
                    }}
                  >
                    <FeatherIcons name="user" size={50} />
                  </View>
                  <Text style={styles.baseText}>Fulano Beltrano de Tal</Text>
                  <Text style={styles.baseText}>22111555</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexGrow: 1,
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <View style={{ gap: 50 }}>
                {menuOptions.map((option) => (
                  <MenuOption key={option.title} {...option} />
                ))}
              </View>

              <MenuOption
                icon="log-out"
                title="Sair"
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          </View>
        </View>
      </Modal>

      <UserInfo
        open={showUserInfo}
        closeModal={() => setShowUserInfo(false)}
      />

      {/* <Modal
        transparent
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        coverScreen
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
      </Modal> */}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    right: 0,
  },

  fundoDoModal: {
    backgroundColor: "#E5E7EB",
    width: "100%",
    height: "30%",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },

  baseText: {
    fontSize: 18,
    color: "6B7280",
  },

  modalView: {
    backgroundColor: "white",

    height: "100%",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  optionsList: {
    gap: 12,

    flexGrow: 1,
  },
});

function MenuOption({ title, icon, onPress }) {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
      >
        <FeatherIcons name={icon} size={28} />
        <Text>{title}</Text>
      </Pressable>
    </>
  );
}
