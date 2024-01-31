/* eslint-disable eqeqeq */
import FeatherIcons from "@expo/vector-icons/Feather";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar.",
    "Abr.",
    "Mai.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

export default function Home() {
  const [dateFormatView, changeDateFormat] = React.useState("week");
  const [selected, setSelected] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ gap: 12 }}>
                <View>
                  <Pressable style={{ flexDirection: "row" }}>
                    <FeatherIcons name="book" size={28} />
                    <Text>Nova Materia</Text>
                  </Pressable>
                </View>

                <View>
                  <Pressable style={{ flexDirection: "row" }}>
                    <FeatherIcons name="edit" size={28} />
                    <Text>Anotação Pessoal</Text>
                  </Pressable>
                </View>
              </View>
              <Pressable
                style={{
                  backgroundColor: "grey",
                  borderRadius: 4,
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.gapContainer}>
        <View
          style={{
            paddingVertical: 18,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={
              dateFormatView == "week"
                ? [styles.weekButtom, styles.buttonON]
                : styles.weekButtom
            }
            onPress={() => changeDateFormat("week")}
          >
            <Text styles={styles.baseText}>Semana</Text>
          </Pressable>
          <Pressable
            style={
              dateFormatView == "month"
                ? [styles.monthButtom, styles.buttonON]
                : styles.monthButtom
            }
            onPress={() => changeDateFormat("month")}
          >
            <Text styles={styles.baseText}>Mês</Text>
          </Pressable>
        </View>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "black",
            },
          }}
        />

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 30,
            right: 10,
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 18,
    fontFamily: "sans-serif",
    color: "#1f2937",
  },

  weekButtom: {
    paddingVertical: 10,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: "#f2f2f2",
    width: 76,
    alignItems: "center",
  },

  monthButtom: {
    paddingVertical: 10,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: "#f2f2f2",
    width: 76,
    alignItems: "center",
  },

  buttonON: { backgroundColor: "#d9d9d9" },

  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 95,
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

  headerStyle: {
    gap: 12,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },

  gapContainer: {
    gap: 12,
    maxWidth: "90%",
    marginLeft: "5%",
    height: "100%",
  },
});
