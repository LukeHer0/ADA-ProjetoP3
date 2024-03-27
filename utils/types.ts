type PaginatedResponse<T> = {
    count: number,
    next: string | null,
    previous: string | null,
    results: T[]
}


export type UserClassroomResponse = PaginatedResponse<UserClassroom>

export type SubjectPeriodStudentsResponse = PaginatedResponse<SubjectPeriodStudents>

export type SubjectPeriodStudents = {
    id: number,
    student: {
        id: number,
        name: string,
        registration_id: string
    },
    subject_period: {
        id: number,
        subject: {
            id: number,
            name: string,
            code: string
        },
        period: {
            id: number,
            year: number,
            semester: number
        }
    },
    created_at: Date,
    updated_at: Date
};

export type UserClassroom = {
    id: number,
    subject_period_weekday: {
        id: number,
        subject_period: {
            id: number,
            subject: {
                id: number,
                name: string,
                code: string,
                description: string
            },
            period: {
                id: number,
                year: number,
                semester: number
            },
            teacher: {
                id: number,
                name: string
            }
        },
        weekday: {
            value: number,
            label: string
        },
        start_time: string,
        end_time: string
    },
    room: {
        id: number,
        name: string
    },
    status: {
        value: string,
        label: string
    },
    created_at: Date,
    updated_at: Date,
    date: string,
    start_time: string,
    end_time: string,
    description: string
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
};
  
export type EventsType = {
    title: string;
    data: CourseType[];
};