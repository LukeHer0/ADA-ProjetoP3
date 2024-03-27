import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import { api } from "../config/api";
import { groupByDate } from "../utils/aulas";
import {
  PaginatedResponse,
  Room,
  SubjectPeriod,
  UserClassroomResponse,
  UserSubjectPeriodResponse,
  SubjectPeriodStudentsResponse,
  SubjectPeriodStudents,
} from "../utils/types";

type UseClassroomParams = {
  teacher_id: number;
  period_id: number;
};

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],

    queryFn: async () => {
      try {
        const response =
          await api.get<PaginatedResponse<Room>>("/classroom/rooms/");

        return response.data.results;
      } catch (error) {
        console.log("Error", error);

        return [];
      }
    },
  });
};
export const useClassrooms = (params?: Partial<UseClassroomParams>) => {
  return useQuery({
    queryKey: ["classroooms"],

    queryFn: async () => {
      try {
        const response = await api.get<PaginatedResponse<SubjectPeriod>>(
          "/classroom/subject-periods/",
        );

        return response.data.results;
      } catch (error) {
        console.log("Error", error);

        return [];
      }
    },
  });
};

export const useSubjectPeriodsStudent = () => {
  return useQuery({
    queryKey: ["subjectPeriodsStudent"],

    queryFn: async () => {
      try {
        const response = await api.get<
          PaginatedResponse<SubjectPeriodStudents>
        >("/classroom/subject-period-students/?student_id=&subject_period_id=");

        return response.data.results;
      } catch (error) {
        console.log("Error", error);

        return [];
      }
    },
  });
};

export const useUserSubjectPeriod = () => {
  return useQuery({
    queryKey: ["userSubjectPeriod"],

    queryFn: async () => {
      try {
        const response = await api.get<UserSubjectPeriodResponse>(
          "/classroom/user-subject-periods/",
        );

        return response.data.results;
      } catch (error) {
        console.log("Error", error);

        return [];
      }
    },
  });
};

export const useClassroomsFromUser = (selected: string) => {
  // selected is a date string with format "YYYY-MM-DD"
  // startDate is a date string with format "YYYY-MM-DD" and is the initial date of the week of selected

  const selectedDate = DateTime.fromISO(selected);
  const startDate =
    selectedDate.weekday === 7
      ? selectedDate.plus({ days: 1 }).toISODate()
      : selectedDate.startOf("week").toISODate();

  const endDate =
    selectedDate.weekday === 7
      ? selectedDate.plus({ days: 6 }).toISODate()
      : selectedDate.endOf("week").toISODate();

  return useQuery({
    queryKey: ["classrooms", "joined", startDate],
    enabled: !!selected,

    queryFn: async () => {
      try {
        const listSubjects = await api.get<UserClassroomResponse>(
          `/classroom/user-classrooms/`,
          {
            params: {
              start_date: startDate,
              // Add 3 days to selected date
              end_date: endDate,
            },
          },
        );

        // Group aulasAtom grouping by date
        const data = groupByDate(listSubjects.data.results);

        return data;
      } catch (err) {
        console.log("Não foi possivel carregar as aulas", err);
      }
    },
  });
};
