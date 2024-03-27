import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";

import CardAluno from "../../components/CardAluno";
import { Aluno } from "../../components/alunoComponent";
import { api } from "../../config/api";
import {
  SubjectPeriodStudentsResponse,
  SubjectPeriodStudents,
} from "../../utils/types";

export default function ListStudents({ id }: any) {
  const [showClass, setShowClass] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [listStudents, setListStudents] =
    React.useState<SubjectPeriodStudentsResponse>();

  useEffect(() => {
    const getStudents = async () => {
      setLoading(true);

      try {
        setListStudents(
          (
            await api.get<SubjectPeriodStudentsResponse>(
              `/classroom/subject-period-students/${id}/students/`,
            )
          ).data,
        );
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    getStudents();
  }, []);

  const handleCardPress = () => {
    setShowClass(true);
  };

  return (
    <ScrollView>
      <View>
        <View>
          {listStudents?.results.map((StudentObject: SubjectPeriodStudents) => (
            <Aluno
              name={StudentObject.student.name}
              id={StudentObject.student.registration_id}
              handleCardPress={() => null}
            />
          ))}
        </View>
        <CardAluno open={showClass} closeModal={() => setShowClass(false)} />
      </View>
    </ScrollView>
  );
}
