import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { DB } from "../app"
import { Student } from '../interfaces/Student';
import { Course } from '../interfaces/Course';
import { Semester } from '../interfaces/SEMESTER';
import { logger } from '../middlewares/log';


// Some fields are optional when calling UserModel.create() or UserModel.build()
interface SemesterCreationAttributes extends Optional<Semester, 'Semester_ID'> { }

// We need to declare an interface for our model that is basically what our class would be
export interface SemesterInstance extends Model<Course, SemesterCreationAttributes>, Semester { }

export const getSemesterModel = () => {
    const instance = DB.sequelize;

    if (instance) {
        return instance.define('Semester', {
            Semester_ID: {
                type: DataTypes.CHAR(6),
                allowNull: false,
                primaryKey: true
            },
            Year: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            Term: {
                type: DataTypes.STRING(10),
                allowNull: false,
                validate: {
                    isIn: [['第一學期', '第二學期', '暑期']] // 校验值范围
                }
            },
            Start_Date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isBeforeOrEqualEndDate(value: Date) {
                        if (value >= (this.End_Date as Date)) {
                            throw new Error('Start_Date must be before End_Date');
                        }
                    }
                }
            },
            End_Date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            Registration_Start: {
                type: DataTypes.DATE,
                allowNull: true,
                validate: {
                    isRegistrationOrdered(value: Date) {
                        if (value && this.Registration_End && (value >= (this.End_Date as Date))) {
                            throw new Error('Registration_Start must be before Registration_End');
                        }
                    }
                }
            },
            Registration_End: {
                type: DataTypes.DATE,
                allowNull: true,
            }
        }, {
            tableName: 'SEMESTER',
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ['Year', 'Term']
                }
            ]
        });

    } else {
        logger.error("not init")
    }
}
