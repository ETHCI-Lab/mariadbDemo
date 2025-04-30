import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { DB } from "../app"
import { Enrollment } from '../interfaces/Enrollment';
import { getStudentModel } from './StudentModel';
import { getCourseModel } from './CourseModel';
import { getSemesterModel } from './SemesterModel';
import { logger } from '../middlewares/log';

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface EnrollmentCreationAttributes extends Optional<Enrollment, 'Grade' | 'Status'> { }

// We need to declare an interface for our model that is basically what our class would be
export interface EnrollmentInstance extends Model<Enrollment, EnrollmentCreationAttributes>, Enrollment { }



export const getEnrollmentModel = () => {
    const instance = DB.sequelize;

    if (instance != null) {
        const Enrollment = instance.define<EnrollmentInstance>('ENROLLMENT', {
            Student_ID: {
                type: DataTypes.CHAR(9),
                allowNull: false,
                primaryKey: true,
            },
            Course_ID: {
                type: DataTypes.CHAR(8),
                allowNull: false,
                primaryKey: true,
            },
            Semester_ID: {
                type: DataTypes.CHAR(6),
                allowNull: false,
                primaryKey: true,
            },
            Enrollment_Date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            Grade: {
                type: DataTypes.DECIMAL(4, 1),
                allowNull: true,
                validate: {
                    min: 0,
                    max: 100
                }
            },
            Status: {
                type: 'varchar(10)',
                allowNull: true,
                defaultValue: '修課中',
                validate: {
                    isIn: [['修課中', '通過', '不通過', '退選']]
                }
            }
        }, {
            tableName: 'ENROLLMENT',
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        });

        return Enrollment;
    } else {
        logger.error("not init")
    }
}