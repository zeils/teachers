const { Lesson, StudentLesson, TeacherLesson, Timetable } = require("../models/models")

class TimeTableController{



    async addLesson(req,res,next){
        try {
 
            let {date} = req.body
            

            const timeTable = await Timetable.create({date})

            
            return res.json(timeTable)
        } catch(e){
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
        }

    }


    async removeLesson(req,res){
        try {
            
            let {id} = req.body
        const lessonId = await Lesson.destroy({
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

       

        timeTable = await Timetable.findAll({
        
        },)


        return res.json(timeTable)
        } catch (e) {
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }
 
    }


    
}
module.exports = new TimeTableController()