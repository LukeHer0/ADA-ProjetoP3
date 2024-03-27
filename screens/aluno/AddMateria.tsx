import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";

import Filtro from "../../components/Filtro";
import { Materia } from "../../components/Materia";
import ModalAddClass from "../../components/ModalAddClass";
import {
  useClassrooms,
  useSubjectPeriodsStudent,
} from "../../hooks/classrooms";
import { convertSubjectPeriodTypeToCourseType } from "../../utils/aulas";
import { CourseAddType, CourseType } from "../../utils/types";

export default function AddMateria() {
  const { data: classrooms, isLoading } = useClassrooms();

  const [classModal, setClassModal] = React.useState<CourseAddType>();

  const colorMode = "light";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputStyle}>
        <View style={styles.searchSection}>
          <TextInput placeholder="Buscar matéria" />
        </View>
        <Filtro />
      </View>
      <View style={{ marginVertical: 16, marginHorizontal: 20 }}>
        <Text style={styles.titleText}>Matérias disponíveis</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {classrooms?.map((c) => (
          <Materia
            key={c.id}
            title={c.subject.name}
            teacherName={c.teacher.name}
            code={c.subject.code}
            handleCardPress={() => {
              setClassModal(convertSubjectPeriodTypeToCourseType(c));
            }}
          />
        ))}

        {isLoading && (
          <MotiView
            transition={{
              type: "timing",
            }}
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              marginBottom: 10,
              rowGap: 12,
            }}
          >
            <Skeleton colorMode={colorMode} height={80} width="100%" />

            <Skeleton colorMode={colorMode} height={80} width="100%" />

            <Skeleton colorMode={colorMode} height={80} width="100%" />
          </MotiView>
        )}
        <ModalAddClass
          classInfo={classModal}
          closeModal={() => setClassModal(undefined)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  materiaStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e5e7eb",
    width: "90%",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  baseText: {
    fontSize: 16,
    color: "#1f2937",
  },
  materiaTitle: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "bold",
  },

  leftbaseText: {
    fontSize: 16,
    color: "#1f2937",
    alignItems: "flex-end",
  },

  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },

  subTitleText: {
    fontSize: 24,
    fontWeight: "normal",
  },

  searchSection: {
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    width: "70%",
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
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  titleStyle: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 60,
    marginBottom: 30,
  },

  inputStyle: {
    marginLeft: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  inputTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    color: "d1d5db",
  },

  input: {
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 4,
    paddingVertical: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
