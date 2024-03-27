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
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';

import { useQuery } from '@tanstack/react-query';

import AppExpandableCalendar from "../../components/AppExpandableCalendar";

import { convertToCourseType } from '../../utils/aulas'

import { useClassroomsFromUser } from "../../hooks/classrooms";

export default function Home({ navigation }: any) {
  const [selected, setSelected] = React.useState(new Date().toISOString());
  
  const [classModal, setClassModal] = React.useState<CourseType>();


  const { data: events, isLoading } = useClassroomsFromUser(selected)

  const renderItem = React.useCallback(({ item }: {item: CourseType}) => {
    const time = item.time.split(' - ');
    const start = time[0].split(':').slice(0, 2).join(':'); // 10:00:00
    return <ClassCard title={item.title} time={start} teacher={item.teacherName} status={item.status} handleCardPress={() => {
      setClassModal(item);
      console.log(item)}}/>
  }, []);

  return (
    <SafeAreaView style={styles.container}>
     <AppExpandableCalendar renderItem={renderItem} data={events || []} selected={selected} onDateChanged={setSelected} loading={isLoading} />
      
      {/* gera varios placeholder de loading */}
      
     
      <ModalClass classInfo={classModal} closeModal={() => setClassModal(undefined)}/>

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
