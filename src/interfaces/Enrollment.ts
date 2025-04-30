export interface Enrollment {
    Student_ID: string; // char(9) translates to string
    Course_ID: string; // char(8) translates to string
    Semester_ID: string; // char(6) translates to string
    Enrollment_Date: Date; // date translates to Date object
    Grade?: number | null; // decimal(4,1) translates to number, with optional and null
    Status: '修課中' | '通過' | '不通過' | '退選'; // varchar(10) with specific values
}