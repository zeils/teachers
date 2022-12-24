const { Lesson, StudentLesson, TeacherLesson } = require("../models/models")

class LessonController{



    async create(req,res,next){
        try {
            let {name} = req.body
            


            const lesson = await Lesson.create({name})
            //const lessonId = lesson.id

            //const teacherLesson = await TeacherLesson.create({teacherId, lessonId})


            //for (var id in studentsId) {
            //    const studentLesson = await StudentLesson.create({id, lessonId})
            //}

            
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
        },)


        return res.json(lessons)
        } catch (e) {
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }
 
    }

    async getOne(req,res){
        try {
            
        

        const {id} = req.body
        const dbLesson = await Lesson.findOne(
            {
                where: {id}
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
            
        const {id} = req.body 
        await Lesson.destroy({
            where: {
                id: {id}
            }
        })

        return res.json({id})
        } catch (e) {
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }

    }

    async enrollTeacher(req,res){
        try {
            
        const {teacherId, lessonId} = req.body 
        const teacherLesson = await Lesson.create({teacherId, lessonId})

        return res.json({teacherLesson})
        } catch (e) {
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }

    }

    async enrollStudent(req,res){
        try {
            
        const {studentId, lessonId} = req.body 
        const studentLesson = await Lesson.create({studentId, lessonId})

        return res.json({studentLesson})
        } catch (e) {
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }

    }


    
}
module.exports = new LessonController()