import { model } from "mongoose";
import { Service } from "../abstract/Service";
import { Student } from "../interfaces/Student";
import { getEnrollmentModel } from "../orm/EnrollmentModel";
import { setRef } from "../orm/reference";
import { getStudentModel, StudentInstance } from "../orm/StudentModel";
import { resp } from "../utils/resp";
import { getCourseModel } from "../orm/CourseModel";

export class StudentService extends Service {

    public async create(studentInfo: Student): Promise<resp<Student | undefined>> {
        const StudentModel = getStudentModel()

        const res: resp<Student | undefined> = {
            code: 200,
            message: "",
            body: undefined
        }

        if (StudentModel) {
            try {
                const newStudent = await StudentModel.create(studentInfo);
                res.body = newStudent
                return res;
            } catch (error) {
                res.code = 500;
                res.message = error as string;
                return res;
            }
        } else {
            res.code = 500;
            res.message = "server error";
            return res;
        }
    }

    public async read(): Promise<resp<Array<Student> | undefined>> {
        const StudentModel = getStudentModel()

        const res: resp<Array<Student> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        }

        if (StudentModel) {
            res.body = await StudentModel.findAll();
        } else {
            res.code = 500;
            res.message = "server error";
        }


        return res;
    }

    public async update(studentInfo: Student): Promise<resp<Student | undefined>> {
        const StudentModel = getStudentModel()

        const res: resp<Student | undefined> = {
            code: 200,
            message: "",
            body: undefined
        }

        if (StudentModel) {

            try {
                const student = await StudentModel.findByPk(studentInfo.Student_ID);
                if (student == null) {
                    res.code = 404;
                    res.message = "student not found"
                    return res;
                } else {

                    Object.assign(student, studentInfo);

                    await student.save();

                    res.body = student;

                    return res;
                }

            } catch (error) {
                res.code = 500;
                res.message = error as string;
                return res;
            }

        } else {
            res.code = 500;
            res.message = "server error";
        }


        return res;
    }

    public async delete(Student_ID: string): Promise<resp<Student | undefined>> {
        const StudentModel = getStudentModel()

        const res: resp<Student | undefined> = {
            code: 200,
            message: "",
            body: undefined
        }

        if (StudentModel) {
            try {
                const student = await StudentModel.findByPk(Student_ID);
                if (student == null) {
                    res.code = 404;
                    res.message = "student not found"
                    return res;
                } else {
                    await student.destroy();
                    res.body = student;
                    res.message = `${Student_ID} delete sucess`
                    return res;
                }
            } catch (error) {

            }
        } else {
            res.code = 500;
            res.message = "server error";
        }


        return res;
    }

    public async findUngraded(): Promise<resp<Array<Student> | undefined>> {
        const StudentModel = getStudentModel();
        const EnrollmentModel = getEnrollmentModel();
        const CourseModel = getCourseModel();

        const res: resp<Array<Student> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        }

        if (StudentModel && EnrollmentModel && CourseModel) {
            try {
                StudentModel.hasMany(EnrollmentModel, {
                    foreignKey: 'Student_ID',
                    as: 'ENROLLMENTS' // 通常用复数形式表示多个关联
                });

                CourseModel.hasMany(EnrollmentModel, {
                    foreignKey: 'Course_ID',
                    as: 'ENROLLMENTS' // 通常用复数形式表示多个关联
                });

                EnrollmentModel.belongsTo(StudentModel, {
                    foreignKey: 'Student_ID',
                    targetKey: 'Student_ID'
                });

                EnrollmentModel.belongsTo(CourseModel, {
                    foreignKey: 'Course_ID',
                    targetKey: 'Course_ID'
                });



                res.body = await StudentModel.findAll({
                    attributes: ['Student_ID', 'Name'],
                    include: [
                        {
                            model: EnrollmentModel,
                            as: 'ENROLLMENTS',
                            attributes: ['Course_ID', 'Semester_ID'],
                            where: {
                                Grade: null
                            },
                            include: {
                                model: CourseModel,
                                as: 'COURSE',
                                attributes: ['Title'],
                            }
                        }
                    ]
                });
                return res;
            } catch (error: any) {
                let errorMessage = `Error: ${error.name} \n`;
                if (error.message) {
                    errorMessage += `, Message: ${error.message}\n`;
                }
                if (error.stack) {
                    errorMessage += `, Stack: ${error.stack}\n`;
                }
                if (error.errors) {
                    errorMessage += `, Details: ${error.errors.map((e: any) => e.message).join(', ')}`;
                }

                res.message = errorMessage;
                return res;
            }
        } else {
            res.code = 500;
            res.message = "server error";
            return res;
        }
    }
}