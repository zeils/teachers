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


const TeacherStudent = sequelize.define('teacher_student', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

})

const StudentLesson = sequelize.define('student_lesson', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

})







Teacher.hasMany(TeacherStudent);
TeacherStudent.belongsTo(Teacher);

Student.hasMany(TeacherStudent)
TeacherStudent.belongsTo(Student)

Student.hasMany(StudentLesson)
StudentLesson.belongsTo(Student)

Lesson.hasMany(StudentLesson)
StudentLesson.belongsTo(Lesson)

Teacher.hasMany(Lesson);
Lesson.belongsTo(Teacher);

Student.hasOne(Parent);
Parent.belongsTo(Student);


Timetable.hasMany(Lesson)
Lesson.belongsTo(Timetable)





module.exports = {
    Moderator,
    Parent,
    Teacher,
    Student,
    Timetable,
    Lesson
}