/* eslint-disable eqeqeq */

import { useAtom } from "jotai";
import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, SectionList, View } from "react-native";
import { TouchableOpacity } from 'react-native';
import FeatherIcons from "@expo/vector-icons/Feather";
import ClassCard from "../../components/ClassCard";
import InfoClass from "../../components/InfoClass";
import PlusButton from "../../components/PlusButton";
import { aulasAtom } from "../../utils/aulas";
import { Calendar, LocaleConfig, ExpandableCalendar, CalendarProvider, AgendaList, Agenda } from 'react-native-calendars';
import AgendaItem from "../../components/AgendaItems";

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

type courseType = {
  hour: string,
  duration: string,
  title: string,
};

type eventsType = {
  title: string,
  data: courseType[],
};

const events : eventsType[] = [];

aulasAtom.forEach((aula) => events.push(
  {
    title: aula.date,
    data: [
      {
        hour: aula.time, duration: aula.duration, title: aula.title
      }
    ]
  }
));

export default function Home({ navigation }: any) {
  const [selected, setSelected] = React.useState("");

  //const [aulas] = useAtom(aulasAtom);

  
    
  const [dateFormatView] = React.useState("week");

  const [showClass, setShowClass] = React.useState(false);
  const [selectedClassId, setSelectedClassId] = React.useState(null);

  const renderItem = React.useCallback(({item}: any) => {
    return <AgendaItem item={item}/>;
  }, []);

  const handleCardPress = (id: any) => {
    setSelectedClassId(id);
    setShowClass(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Calendar open={dateFormatView !== "week"} /> */}

      <CalendarProvider
        date={"2024-03-24"}
      >
        <ExpandableCalendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          // current = {new Date().toISOString()}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'}
          }}
        />
        <AgendaList
          sections={events}
          renderItem={renderItem}
        />
      </CalendarProvider>
      
      <PlusButton navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 18,
    fontFamily: "sans-serif",
    color: "#1f2937",
  },

  weekButton: {
    paddingVertical: 10,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: "#f2f2f2",
    width: 76,
    alignItems: "center",
  },

  monthButton: {
    paddingVertical: 10,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: "#f2f2f2",
    width: 76,
    alignItems: "center",
  },

  buttonON: { backgroundColor: "#d9d9d9" },

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
