import { useQuery } from '@tanstack/react-query'
import { api } from '../config/api'
import { UserClassroomResponse } from '../utils/types'
import { groupByDate } from '../utils/aulas'


type UseClassroomParams = {
  teacher_id: number;
  period_id: number;
} 

export const useClassrooms = (params?: Partial<UseClassroomParams>) => {
  return useQuery({
    queryKey: ['classroooms', params],

    queryFn: async () => {
      const response = await api.get<UserClassroomResponse>('/classrooms/subject-periods')

      return response.data
    }



  })
}


export const useClassroomsFromUser = (selected: string) => {
  return useQuery({
    queryKey: ['classrooms', 'joined', selected],
    enabled: !!selected,
    queryFn: async () => {

      const date = new Date(selected);

      const listSubjects = await api.get<UserClassroomResponse>(`/classroom/user-classrooms/`, {
        params: {
          start_date: selected,
          // Add 3 days to selected date
          end_date: new Date(date.setDate(date.getDate() + 3)).toISOString().split("T")[0],
        }
      });
    // Group aulasAtom grouping by date
      const data = groupByDate(listSubjects.data.results);
      
      return data;
    }
  })
}