const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Teacher = sequelize.define('teacher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: "USER"},
    file: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Student = sequelize.define('student', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, },
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: "USER"},
    class: {type: DataTypes.STRING, defaultValue: "USER"},
    age: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Moderator = sequelize.define('moderator', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING,},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Parent = sequelize.define('parent', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: "USER"},

})

const Lesson = sequelize.define('lesson', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE,  allowNull: false},
})

const Timetable = sequelize.define('timetable', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},

})

Teacher.hasMany(Student);
Student.belongsTo(Teacher);

Teacher.hasMany(Lesson);
Lesson.belongsTo(Teacher);


Lesson.hasMany(Student);
Student.belongsTo(Timetable);

Lesson.hasOne(Teacher);
Teacher.belongsTo(Timetable);

Student.hasMany(Lesson);
Lesson.belongsTo(Student);

Student.hasOne(Parent);
Parent.belongsTo(Student);


Timetable.hasMany(Lesson);
Lesson.belongsTo(Timetable);

Timetable.hasMany(Lesson);
Lesson.belongsTo(Timetable);

Moderator.hasMany(Student);
Student.belongsTo(Moderator);

Moderator.hasMany(Parent);
Parent.belongsTo(Moderator);

Moderator.hasMany(Teacher);
Teacher.belongsTo(Moderator);


module.exports = {
    Moderator,
    Parent,
    Teacher,
    Student,
    Timetable,
    Lesson
}