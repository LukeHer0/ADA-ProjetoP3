import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import Modal from "react-native-modal";

export default function UserInfo({ open, closeModal }) {
  const navigation = useNavigation();
  return (
    <>
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
            shadowColor: "grey",
            shadowOpacity: 0.25,
            shadowRadius: 7,
          }}
        >
          <Image
            style={{ alignItems: "center", justifyContent: "center" }}
            source={{
              uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.linkedin.com%2Fin%2Fguy-felipe-von-oettingen-gaul&psig=AOvVaw2f6jh4EuB8PWh_FRaOlD6t&ust=1706764194603000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJi7kJ7uhoQDFQAAAAAdAAAAABAE",
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Nome</Text>
            <Text>John Doe</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Matrícula</Text>
            <Text>22111555</Text>
          </View>

          <Pressable
            style={{
              padding: 12,
              gap: 28,
              borderWidth: 2,
              borderColor: "gray",
              borderRadius: 7,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("ChangeUserInfo")}
          >
            <Text>Editar</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}
