/* eslint-disable eqeqeq */
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import AppExpandableCalendar from "../../components/AppExpandableCalendar";
import ClassCard from "../../components/ClassCard";
import ModalClass from "../../components/ModalClass";
import PlusButton from "../../components/PlusButton";
import { useClassroomsFromUser } from "../../hooks/classrooms";
import { CourseType } from "../../utils/types";

export default function Home({ navigation }: any) {
  const [selected, setSelected] = React.useState(
    new Date().toISOString().split("T")[0],
  );

  const [classModal, setClassModal] = React.useState<CourseType>();

  const { data: events, isLoading } = useClassroomsFromUser(selected);

  const renderItem = React.useCallback(({ item }: { item: CourseType }) => {
    const time = item.time.split(" - ");
    const start = time[0].split(":").slice(0, 2).join(":"); // 10:00:00
    return (
      <ClassCard
        title={item.title}
        time={start}
        teacher={item.teacherName}
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

      <ModalClass
        classInfo={classModal}
        closeModal={() => setClassModal(undefined)}
      />
      <PlusButton navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
});
