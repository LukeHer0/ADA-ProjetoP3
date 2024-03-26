/* eslint-disable eqeqeq */

import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import {
  LocaleConfig,
  ExpandableCalendar,
  CalendarProvider,
  AgendaList,
  Calendar,
  Agenda,
} from "react-native-calendars";

import AgendaItem from "../../components/AgendaItems";
import PlusButton from "../../components/PlusButton";
import { api } from "../../config/api";
import { aulasAtom } from "../../utils/aulas";

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

type courseType = {
  id: number;
  title: string;
  description: string;
  teacherName: string;
  time: string;
  duration: string;
  date: string;
  status: string;
  local: string;
};

type eventsType = {
  title: string;
  data: courseType[];
};

// const list_Subjects = api.get<ListSubjects>("/classroom/subjects/");

const events: eventsType[] = [];

aulasAtom.forEach((aula) => {
  if (events.map((dia) => dia.title === aula.date)) {
    events.push({
      title: aula.date,
      data: [aula],
    });
  }
});

// type ListSubjects = {
//   count: number;
//   next: null | number;
//   previous: null | number;
//   results: Subjects[];
// };

// type Subjects = {
//   name: string;
//   code: string;
//   description: string;
// };

export default function Home({ navigation }: any) {
  const [selected, setSelected] = React.useState(new Date().toISOString());

  const renderItem = React.useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Calendar open={dateFormatView !== "week"} /> */}

      <CalendarProvider date={selected}>
        <ExpandableCalendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          current={new Date().toISOString()}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "orange",
            },
          }}
        />
        <AgendaList
          sections={events.filter(
            (dia) => new Date(dia.title) >= new Date(selected),
          )}
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
