export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type UserClassroomResponse = PaginatedResponse<UserClassroom>;

export type SubjectPeriodStudentsResponse =
  PaginatedResponse<SubjectPeriodStudents>;

export type UserSubjectPeriodResponse = PaginatedResponse<UserSubjectPeriod>;

export type RoomResponse = PaginatedResponse<Room>;

export type Room = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
};
export type Student = {
  id: number;
  name: string;
  registration_id: string;
};

export type SubjectPeriodStudents = {
  id: number;
  student: Student;
  subject_period: SubjectPeriod;
  created_at: Date;
  updated_at: Date;
};

export type SubjectPeriod = {
  id: number;
  subject: {
    id: number;
    name: string;
    code: string;
    description: string;
  };
  period: {
    id: number;
    year: number;
    semester: number;
  };
  teacher: {
    id: number;
    name: string;
  };
};

export type WeekDay = {
  value: number;
  label: string;
};
export type DayOfWeek = {
  weekday: WeekDay;
  start_time: string;
  end_time: string;
};

export type UserSubjectPeriod = SubjectPeriod & {
  days_of_week: DayOfWeek[];
  created_at: string;
  updated_at: string;
};

export type UserClassroom = {
  id: number;
  subject_period_weekday: {
    id: number;
    subject_period: SubjectPeriod;
    weekday: {
      value: number;
      label: string;
    };
    start_time: string;
    end_time: string;
  };
  room: {
    id: number;
    name: string;
  };
  status: {
    value: string;
    label: string;
  };
  created_at: Date;
  updated_at: Date;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
};

export type CourseType = {
  id: number;
  title: string;
  description: string;
  teacherName: string;
  time: string;
  duration: string;
  date: string;
  status: string;
  local: string;
  code: string;
};

export type CourseAddType = {
  id: number;
  title: string;
  description: string;
  teacherName: string;
  code: string;
};

export type EventsType = {
  title: string;
  data: CourseType[];
};

export type TeacherType = {
  id: number;
  name: string;
  email: string;
  role: string;
};
