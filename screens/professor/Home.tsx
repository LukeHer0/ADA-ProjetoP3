/* eslint-disable eqeqeq */

import { DateTime } from "luxon";
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import AppExpandableCalendar from "../../components/AppExpandableCalendar";
import ClassCardProfessor from "../../components/ClassCardProfessor";
import InfoClass from "../../components/InfoClass";
import { queryClient } from "../../config/query";
import { useClassroomsFromUser } from "../../hooks/classrooms";
import { CourseType, EventsType } from "../../utils/types";

export default function Home({ navigation }: any) {
  const [selected, setSelected] = React.useState(new Date().toISOString());

  const [classModal, setClassModal] = React.useState<CourseType>();

  const { data: events, isLoading } = useClassroomsFromUser(selected);

  const selectedDate = DateTime.fromISO(selected);

  const startDate =
    selectedDate.weekday === 7
      ? selectedDate.plus({ days: 1 }).toISODate()
      : selectedDate.startOf("week").toISODate();

  const onUpdated = (id: number, data: any) => {
    queryClient.setQueryData(
      ["classrooms", "joined", startDate],
      (old: EventsType[]) => {
        return old.map((e) => ({
          ...e,
          data: e.data.map((r) => {
            if (r.id === id) {
              return {
                ...r,
                ...data,
              };
            }
            return r;
          }),
        }));
      },
    );
  };

  const renderItem = React.useCallback(({ item }: { item: CourseType }) => {
    const time = item.time.split(" - ");
    const start = time[0].split(":").slice(0, 2).join(":"); // 10:00:00
    return (
      <ClassCardProfessor
        onUpdated={(id, status) => onUpdated(id, { status })}
        id={item.id}
        title={item.title}
        time={start}
        description={item.description}
        status={item.status}
        handleCardPress={() => {
          setClassModal(item);
        }}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppExpandableCalendar
        renderItem={renderItem}
        data={events || []}
        selected={selected}
        onDateChanged={setSelected}
        loading={isLoading}
      />

      <InfoClass
        onUpdated={(id, local) => onUpdated(id, { local })}
        classInfo={classModal}
        closeModal={() => setClassModal(undefined)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 18,
    fontFamily: "sans-serif",
    color: "#1f2937",
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
