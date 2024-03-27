import { useNavigation, NavigationProp } from "@react-navigation/native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";

import { RootStackParamList } from "..";
import CardAluno from "../../components/CardAluno";
import { Materia } from "../../components/Materia";
import ModalClass from "../../components/ModalClass";
import PlusButton from "../../components/PlusButton";
import { useUserSubjectPeriod } from "../../hooks/classrooms";
import { CourseType } from "../../utils/types";

export default function ListMateria() {
  const [showClass, setShowClass] = React.useState(false);

  const [classModal, setClassModal] = React.useState<CourseType>();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCardPress = () => {
    setShowClass(true);
  };

  const { data: classrooms, isLoading } = useUserSubjectPeriod();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginHorizontal: 20, marginTop: 20 }}>
        {!isLoading &&
          classrooms?.map((c) => (
            <Materia
              key={c.id}
              title={c.subject.name}
              teacherName={c.teacher.name}
              code={c.subject.code}
              handleCardPress={handleCardPress}
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
            <Skeleton colorMode="light" height={80} width="100%" />

            <Skeleton colorMode="light" height={80} width="100%" />

            <Skeleton colorMode="light" height={80} width="100%" />
          </MotiView>
        )}
      </ScrollView>
      {/* <ModalClass classInfo={}} /> */}
      <PlusButton navigation={navigation} />
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
