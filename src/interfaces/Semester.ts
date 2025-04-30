export interface Semester {
    Semester_ID: string; // char(6) translates to a string
    Year: number; // int(11) translates to a number
    Term: '第一學期' | '第二學期' | '暑期'; // varchar(10) with specific allowed values, hence a union type
    Start_Date: Date; // date translates to a Date object
    End_Date: Date; // date translates to a Date object
    Registration_Start?: Date | null; // date translates to a Date object, with optional and nullable
    Registration_End?: Date | null; // date translates to a Date object, with optional and nullable
}