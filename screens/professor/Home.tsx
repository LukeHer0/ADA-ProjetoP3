/* eslint-disable eqeqeq */

import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";


import AgendaItemStudent from "../../components/AgendaItemStudent";
import PlusButton from "../../components/PlusButton";
import { api } from "../../config/api";
import { aulasAtom } from "../../utils/aulas";
import ClassCard from "../../components/ClassCard";
import { UserClassroomResponse, UserClassroom, EventsType, CourseType } from "../../utils/types"; 
import ModalClass from "../../components/ModalClass";



import AppExpandableCalendar from "../../components/AppExpandableCalendar";


function convertToCourseType(userClassroom: UserClassroom): CourseType {
  return {
      id: userClassroom.id,
      title: userClassroom.subject_period_weekday.subject_period.subject.name,
      description: userClassroom.description,
      teacherName: '', // Insira o nome do professor conforme necessário
      time: `${userClassroom.start_time} - ${userClassroom.end_time}`,
      duration: '', // Insira a duração conforme necessário
      date: userClassroom.date,
      status: userClassroom.status.label,
      local: '' // Insira o local conforme necessário
  };
}

// Função para agrupar por data
function groupByDate(userClassrooms: (UserClassroom)[]): EventsType[] {
  const groupedEvents: { [date: string]: CourseType[] } = {};

  userClassrooms.forEach(userClassroom => {
      const courseType = convertToCourseType(userClassroom);
      if (!groupedEvents[userClassroom.date]) {
          groupedEvents[userClassroom.date] = [];
      }
      groupedEvents[userClassroom.date].push(courseType);
  });

  return Object.keys(groupedEvents).map(date => ({
      title: date,
      data: groupedEvents[date]
  }));
}


export default function Home({ navigation }: any) {
  const [selected, setSelected] = React.useState(new Date().toISOString());
  const [loading, setLoading] = React.useState(true);
 
  const [events, setEvents] = React.useState<EventsType[]>([]);
  
  const [classModal, setClassModal] = React.useState<CourseType>();

  const renderItem = React.useCallback(({ item }: {item: CourseType}) => {
    const time = item.time.split(' - ');
    const start = time[0].split(':').slice(0, 2).join(':'); // 10:00:00
    return <ClassCard title={item.title} time={start} description={item.description} status={item.status} handleCardPress={() => {
      setClassModal(item);
      console.log(item)}}/>
  }, []);

  
  useEffect(() => {
    const date = new Date(selected);


    const getAulas = async () => {

      setLoading(true);
      
      try {
        const listSubjects = await api.get<UserClassroomResponse>(`/classroom/user-classrooms/`, {
          params: {
            start_date: selected,
            // Add 3 days to selected date
            end_date: new Date(date.setDate(date.getDate() + 3)).toISOString().split("T")[0],
          }
        });
      // Group aulasAtom grouping by date
        const data = groupByDate(listSubjects.data.results);
        setEvents(data);
      } catch(err) {
        console.log(err)
      }

      setLoading(false);
    }

    getAulas();
    
  }, [selected])


  
   
  return (
    <SafeAreaView style={styles.container}>
     <AppExpandableCalendar renderItem={renderItem} data={events} selected={selected} onDateChanged={setSelected} loading={loading} />
      
      {/* gera varios placeholder de loading */}
      <Text>teste {classModal?.title}</Text>
     
      <ModalClass classInfo={classModal} closeModal={() => setClassModal(undefined)}/>

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
