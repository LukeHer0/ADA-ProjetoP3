import {
  UserClassroom,
  CourseType,
  EventsType,
  SubjectPeriod,
  CourseAddType,
} from "./types";

export const aulasAtom = [
  {
    id: 1,
    title: "Programação 3",
    description:
      "Introdução ao React/Next.js: Conceitos iniciais e fundamentais.",
    teacherName: "João",
    time: "19:00",
    duration: "1h",
    date: "2024-03-24",
    status: "confirmed",
    local: "Laboratorio 3, IC",
  },
  {
    id: 1,
    title: "Programação 2",
    description: "java",
    teacherName: "javador",
    time: "14:00",
    duration: "1h",
    date: "2024-03-24",
    status: "confirmed",
    local: "Laboratorio 3, IC",
  },
  {
    id: 2,
    title: "Projeto e Análise de Algoritmos",
    description: "Apresentação da disciplina",
    teacherName: "Afonso",
    time: "19:00",
    duration: "1h",
    date: "2024-03-25",
    status: "confirmed",
    local: "Mini Auditório, IC",
  },
  {
    id: 3,
    title: "Circuitos Digitais",
    description: "Portas lógicas",
    teacherName: "Glauber",
    time: "19:00",
    duration: "1h",
    date: "2024-03-26",
    status: "canceled",
    local: "Laboratorio 2, IC",
  },
  {
    id: 4,
    title: "Teoria da Computação",
    description: "Apresentação de podcasts",
    teacherName: "Cuarón",
    time: "19:00",
    duration: "1h",
    date: "2024-03-29",
    status: "confirmed",
    local: "Sala 2, IC",
  },
];

export function convertToCourseType(userClassroom: UserClassroom): CourseType {
  return {
    id: userClassroom.id,
    title: userClassroom.subject_period_weekday.subject_period.subject.name,
    description:
      userClassroom.subject_period_weekday.subject_period.subject.description,
    teacherName:
      userClassroom.subject_period_weekday.subject_period.teacher.name, // Insira o nome do professor conforme necessário
    time: `${userClassroom.start_time} - ${userClassroom.end_time}`,
    duration: "", // Insira a duração conforme necessário
    date: userClassroom.date,
    status: userClassroom.status.label,
    local: userClassroom.room ? userClassroom.room.name : "", // Insira o local conforme necessário
    code: userClassroom.subject_period_weekday.subject_period.subject.code,
  };
}

export function convertSubjectPeriodTypeToCourseType(
  subjectPeriod: SubjectPeriod,
): CourseAddType {
  return {
    id: subjectPeriod.id,
    title: subjectPeriod.subject.name,
    description: subjectPeriod.subject.description,
    teacherName: subjectPeriod.teacher.name, // Insira o nome do professor conforme necessário
    code: subjectPeriod.subject.code,
  };
}

export function groupByDate(userClassrooms: UserClassroom[]): EventsType[] {
  const groupedEvents: { [date: string]: CourseType[] } = {};

  userClassrooms.forEach((userClassroom) => {
    const courseType = convertToCourseType(userClassroom);
    if (!groupedEvents[userClassroom.date]) {
      groupedEvents[userClassroom.date] = [];
    }
    groupedEvents[userClassroom.date].push(courseType);
  });

  return Object.keys(groupedEvents).map((date) => ({
    title: date,
    data: groupedEvents[date],
  }));
}
