import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import {
  ExpandableCalendar,
  LocaleConfig,
  CalendarProvider,
  AgendaList,
} from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

import { EventsType, CourseType } from "../utils/types";

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

type AppExpandableCalendarProps = {
  selected: string;
  renderItem: ({ item }: { item: CourseType }) => ReactElement;
  onDateChanged: (date: string) => void;
  data: EventsType[];
  loading?: boolean;
};

export default function AppExpandableCalendar({
  selected,
  renderItem,
  onDateChanged,
  data,
  loading,
}: AppExpandableCalendarProps) {
  const colorMode = "light";

  const markedDates: MarkedDates = data.reduce((acc, day) => {
    acc[day.title] = {
      color: "orange",
      marked: true,
      dots: [
        {
          color: "orange",
          selectedDotColor: "orange",
        },
      ],
    };
    return acc;
  }, {} as MarkedDates);

  return (
    <>
      <CalendarProvider
        showTodayButton
        date={selected}
        onDateChanged={onDateChanged}
      >
        <ExpandableCalendar markedDates={markedDates} />
        {!loading && (!data || data.length === 0) && (
          <Text>Sem aulas nesse período</Text>
        )}

        {!loading ? (
          <AgendaList
            sections={data}
            style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 10 }}
            renderItem={renderItem}
          />
        ) : (
          <MotiView
            transition={{
              type: "timing",
            }}
            style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 10 }}
          >
            <Skeleton colorMode={colorMode} height={20} width={120} />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} height={80} width="100%" />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} height={80} width="100%" />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} height={80} width="100%" />
          </MotiView>
        )}
      </CalendarProvider>

      {/* <PlaceholderLoading shape="rect" width={60} height={60}/> */}
    </>
  );
}

const Spacer = ({ height = 16 }) => <View style={{ height }} />;
