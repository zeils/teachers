const { Lesson, StudentLesson, TeacherLesson, Timetable } = require("../models/models")

class TimeTableController{



    async addLesson(req,res,next){
        try {
 
            let {lessonId, year, month, day, hour, minute} = req.body

            const lessonTime = new Date(year,month,day,hour, minute)
            


            const lesson = await Timetable.create({lessonId, lessonTime})

            
            return res.json(lesson)
        } catch(e){
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
        }

    }


    async removeLesson(req,res){
        try {
            
            let {id} = req.body
        await Lesson.destroy({
            where: {
                id: id
            }
        })

        return res.json(lessonId)
        } catch (e) {
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }

    }

    
    async getTimeTable(req,res){
        try {
            
        let timeTable

       

        timeTable = await Lesson.findAll({
            include: [{
                model: Timetable, as: 'time', 
            }]
        },)


        return res.json(lessons)
        } catch (e) {
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }
 
    }


    
}
module.exports = new TimeTableController()