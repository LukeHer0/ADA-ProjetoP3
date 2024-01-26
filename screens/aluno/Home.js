import FeatherIcons from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";

import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';


//import {Calendar, LocaleConfig} from 'react-native-calendars';

export default function Home() {
  const [butao, onChangeButao] = React.useState("semana");
  const [selected, setSelected] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
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
              butao == "semana"
                ? { ...styles.butaoSemana, ...styles.butaoON }
                : styles.butaoSemana
            }
            onPress={() => onChangeButao("semana")}
          >
            <Text styles={styles.baseText}>Semana</Text>
          </Pressable>
          <Pressable
            style={
              butao == "mes"
                ? { ...styles.butaoMes, ...styles.butaoON }
                : styles.butaoMes
            }
            onPress={() => onChangeButao("mes")}
          >
            <Text styles={styles.baseText}>Mês</Text>
          </Pressable>
        </View>

        <Calendar
          onDayPress={day =>{
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'black'}
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

  butaoSemana: {
    paddingVertical: 10,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: "#f2f2f2",
    width: 76,
    alignItems: "center",
  },

  butaoMes: {
    paddingVertical: 10,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: "#f2f2f2",
    width: 76,
    alignItems: "center",
  },

  butaoON: {
    backgroundColor: "#d9d9d9",
  },

  baseTextBold: {
    fontSize: 16,
    //   fontFamily: 'Inter',
    color: "#1f2937",
    fontWeight: "bold",
  },

  headerStyle: {
    gap: 12,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftbaseText: {
    fontSize: 16,
    //   fontFamily: 'Inter',
    color: "#1f2937",
    alignItems: "flex-end",
  },

  negritobaseText: {
    fontSize: 16,
    fontWeight: "bold",
    // fontFamily: 'Inter',
    color: "#1f2937",
  },

  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subTitleText: {
    fontSize: 24,
    fontWeight: "regular",
  },

  buttonStyle: {
    maxWidth: 400,
    width: "90%",
    paddingVertical: 12,
    color: "black",
    backgroundColor: "#d1d5db",
    borderWidth: 0,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
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

  inputStyle: {
    alignItems: "center",
  },

  inputTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    color: "d1d5db",
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
});
