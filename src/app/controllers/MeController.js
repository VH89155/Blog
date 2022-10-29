const Course = require("../models/Course.model");
const { mongooseToObject, mutipleMongooseToObject } = require("../../util/mogoose");
class MeController {
  //[GET] /me/stored/courses
  storedCourses(req, res,next) {
    

    Promise.all([ Course.find({ }),Course.countDocumentsDeleted() ])
      .then(([courses, deleteCount]) =>{
        res.render("me/stored-courses",{
          deleteCount,
          courses: mutipleMongooseToObject(courses)
        })
      })
      .catch(next)
    // Course.countDocumentsDeleted()
    //   .then((deletedCount)=>{
        
    //   })
    //   .catch((() =>{}))
    // Course.find({ })
    //   .then((course) => res.render("me/stored-courses",{
    //     courses: mutipleMongooseToObject(course)
    //   }))
    //   .catch(next)
  }
  //[GET] /me/trash/courses
  trashCourses(req,res,next){
    Course.findDeleted({ })
      .then((course) => res.render("me/trash-courses",{
        courses: mutipleMongooseToObject(course)
      }))
      .catch(next)
  }
}

module.exports = new MeController();
