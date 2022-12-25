const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Teacher = sequelize.define('teacher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Student = sequelize.define('student', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, },
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: "USER"},
    age: {type: DataTypes.STRING, defaultValue: "USER"}
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
    name: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Timetable = sequelize.define('timetable', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE,  allowNull: false},

})


const StudentLesson = sequelize.define('student_lesson', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}

})

const TeacherLesson = sequelize.define('teacher_lesson', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}

})

const HomeWork = sequelize.define('home_work', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, defaultValue: "HOMEWORK"}

})
















Student.hasMany(StudentLesson)
StudentLesson.belongsTo(Student)

Lesson.hasMany(StudentLesson)
StudentLesson.belongsTo(Lesson)

Lesson.hasOne(HomeWork)
HomeWork.belongsTo(Lesson)


Parent.hasMany(Student)
Student.belongsTo(Parent)


Timetable.hasMany(Lesson)
Lesson.belongsTo(Timetable)

Teacher.hasMany(TeacherLesson)
TeacherLesson.belongsTo(Teacher)

Lesson.hasMany(TeacherLesson)
TeacherLesson.belongsTo(Lesson)





module.exports = {
    Moderator,
    Parent,
    Teacher,
    Student,
    Timetable,
    Lesson,
    TeacherLesson,
    StudentLesson,
    HomeWork
}