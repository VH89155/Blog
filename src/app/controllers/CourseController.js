const Course = require("../models/Course.model");
const { mongooseToObject } = require("../../util/mogoose");
class CourseController {
  //[GET] /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", {
          showTitle: true,
          course: mongooseToObject(course),
        });
      })
      .catch(next);
  }
  // [Get] /course/create
  create(req, res, next) {
    res.render("courses/create");
  }
  // [Get] /course:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }
  // [PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
  // [delete]  /course/:id
  delete(req, res, next) {
    // Course.deleteOne({ _id: req.params.id})
    //   .then(()=> res.redirect('back'))
    //   .catch(next);
    // Su dung. moonge-delete - soft delete
    
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [Post] /course/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => {});
  }
  // [patch] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [delete]/course/:id/force
  deleteForce(req, res, next){
    Course.deleteOne({ _id: req.params.id})
      .then(()=> res.redirect('back'))
      .catch(next);
  }
  // [POSt] /courses/handle-form-actions
  handleFormActions(req, res, next) 
  {
    switch(req.body.action){
      case 'delete':
        console.log(req.body);
        Course.delete({ _id: { $in: req.body.courseIds } })
        .then(() => res.redirect("back"))
        .catch(next);
        break;
      
      default:
        res.json({message:"Action is invalid"});    
    }
  }

}
module.exports = new CourseController();
