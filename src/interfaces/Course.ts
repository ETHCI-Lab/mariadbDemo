export interface Course {
    Course_ID: string; // char(8) translates to a string
    Title: string; // varchar(100) translates to a string
    Description?: string | null; // text translates to a string, and it's optional
    Credits?: number | null; // int(11) translates to a number, with a check that it must be > 0, so it's optional
    Level?: '大學部' | '研究所' | null; // varchar(10) with specific allowed values, making it a union type
    Hours_Per_Week?: number | null; // int(11) translates to a number, and it's optional
    Department_ID?: string | null; // char(5) translates to a string, and it's optional
}