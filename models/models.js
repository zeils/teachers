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
    age: {type: DataTypes.STRING, defaultValue: "USER"},
    parentId: {type: DataTypes.INTEGER}
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
    name: {type: DataTypes.STRING, defaultValue: "USER"},
    homework: {type: DataTypes.STRING, defaultValue: "HOMEWORK"}
})

const Timetable = sequelize.define('timetable', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lessonId: {type: DataTypes.INTEGER},
    date: {type: DataTypes.DATE,  allowNull: false},

})


const StudentLesson = sequelize.define('student_lesson', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    studentId: {type: DataTypes.INTEGER},
    lessonId: {type: DataTypes.INTEGER}

})

const TeacherLesson = sequelize.define('teacher_lesson', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    teacherId: {type: DataTypes.INTEGER},
    LessonId: {type: DataTypes.INTEGER}

})

const HomeWork = sequelize.define('home_work', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, defaultValue: "HOMEWORK"},
    LessonId: {type: DataTypes.INTEGER}

})
















Student.hasMany(StudentLesson)
StudentLesson.belongsTo(Student)

Lesson.hasMany(StudentLesson)
StudentLesson.belongsTo(Lesson)

Lesson.hasOne(HomeWork)
HomeWork.belongsTo(Lesson)

Lesson.hasMany(StudentLesson)
TeacherLesson.belongsTo(Lesson)


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
    Lesson,
    TeacherLesson,
    StudentLesson,
    HomeWork
}