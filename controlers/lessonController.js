const { Lesson, StudentLesson, TeacherLesson } = require("../models/models")

class LessonController{



    async create(req,res,next){
        try {
            let {name, teacherId, studentsId} = req.body
            


            const lesson = await Lesson.create({name})
            console.log(lesson.id)
            const lessonId = lesson.id

            const teacherLesson = await TeacherLesson.create({teacherId, lessonId})


            for (var id in studentsId) {
                const studentLesson = await StudentLesson.create({id, lessonId})
            }

            
            return res.json(lesson)
        } catch(e){
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req,res){
        try {
            
        let lessons;
       

        lessons = await Lesson.findAll({
            include: [{
                model: TeacherLesson, as: 'teacherId', 
                model: StudentLesson, as:'studentId'
            }]
        },)


        return res.json(lessons)
        } catch (e) {
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }
 
    }

    async getOne(req,res){
        try {
            
        

        const {id} = req.params
        const dbLesson = await Lesson.findOne(
            {
                where: {id},
                include: [{
                    model: TeacherLesson, as: 'teacherId', 
                    model: StudentLesson, as:'studentId'
                }]
            },
        )

        return res.json({dbLesson})
        }
            catch (e) {
                console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }
        
    }

    async delete(req,res){
        try {
            
        const lessonId= parseInt(Object.values(req.body)[0]) 
        await Lesson.destroy({
            where: {
                id: lessonId
            }
        })

        return res.json(lessonId)
        } catch (e) {
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }

    }


    
}
module.exports = new LessonController()