import { logger } from "../middlewares/log";
import { getCourseModel } from "./CourseModel";
import { getEnrollmentModel } from "./EnrollmentModel";
import { getSemesterModel } from "./SemesterModel";
import { getStudentModel } from "./StudentModel";

export const setRef = () => {

    const StudentModel = getStudentModel()
    const CourseModel = getCourseModel()
    const SemesterModel = getSemesterModel()
    const EnrollmentModel= getEnrollmentModel();
    if (StudentModel && CourseModel && SemesterModel && EnrollmentModel)  {
        StudentModel.hasMany(EnrollmentModel, { foreignKey: 'Student_ID' });
        EnrollmentModel.belongsTo(StudentModel, { foreignKey: 'Student_ID' });
        EnrollmentModel.belongsTo(CourseModel, { foreignKey: 'Course_ID' });
        EnrollmentModel.belongsTo(SemesterModel, { foreignKey: 'Semester_ID' });
    }
}