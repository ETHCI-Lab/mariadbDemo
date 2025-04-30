import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { DB } from "../app"
import { Student } from '../interfaces/Student';
import { getEnrollmentModel } from './EnrollmentModel';
import { logger } from '../middlewares/log';


// Some fields are optional when calling UserModel.create() or UserModel.build()
interface StudentCreationAttributes extends Optional<Student, 'Student_ID'> { }

// We need to declare an interface for our model that is basically what our class would be
export interface StudentInstance extends Model<Student, StudentCreationAttributes>, Student { }

export const getStudentModel = () => {
    const instance = DB.sequelize;

    if (instance) {

        const StudentModel = instance.define<StudentInstance>('STUDENT', {
            Student_ID: {
                type: DataTypes.CHAR(9),
                allowNull: false,
                primaryKey: true,
            },
            Name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            Birth_Date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            Gender: {
                type: DataTypes.CHAR(1),
                allowNull: true,
                validate: {
                    isIn: [['M', 'F']],
                },
            },
            Email: {
                type: DataTypes.STRING(100),
                allowNull: true,
                unique: true,
            },
            Phone: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            Address: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            Admission_Year: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
            },
            Status: {
                type: DataTypes.STRING(10),
                allowNull: true,
                validate: {
                    isIn: [['在學', '休學', '畢業', '退學']],
                },
            },
            Department_ID: {
                type: DataTypes.CHAR(5),
                allowNull: true,
            },
        }, {
            modelName: "STUDENT",
            tableName: 'STUDENT',
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestamps: false
        });


        return StudentModel;

    }else{
        logger.error("not init")
    }
}
