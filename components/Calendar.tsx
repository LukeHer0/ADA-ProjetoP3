import React, { useRef } from "react";
import {
  ExpandableCalendar,
  LocaleConfig,
  CalendarProvider,
} from "react-native-calendars";

import { getMarkedDates } from "./utils";

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

export default function Calendar({ open }) {
  const marked = useRef(getMarkedDates());

  return (
    <CalendarProvider date={String(Date.now())}>
      <ExpandableCalendar
        style={{ position: "relative", elevation: 1, zIndex: 2000 }}
        markedDates={marked.current}
      />
    </CalendarProvider>
  );
}
